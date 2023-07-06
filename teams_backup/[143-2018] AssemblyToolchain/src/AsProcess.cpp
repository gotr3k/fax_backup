#include "../inc/As.hpp"

bool Assembler::processSection(const std::string &sectionName){
  if(Assembler::sectionTable.sectionExists(sectionName)){
    Assembler::locationCnt=Assembler::sectionTable.getSectionData(sectionName).size;
    Assembler::writeLineToHelperOutputTxt("Section "+sectionName+" already exists, location counter set to "+std::to_string(Assembler::locationCnt));
    return true;
  }
  else{
    Assembler::writeLineToHelperOutputTxt("Creating section "+sectionName);
    if(Assembler::symbolTable.symbolExists(sectionName)){
      if(Assembler::symbolTable.getSymbolType(sectionName)==SymbolType::NONE){
        Assembler::currentSection=sectionName;
        Assembler::locationCnt=0;
        Assembler::symbolTable.setSymbolType(sectionName, SymbolType::SECTION);
        Assembler::symbolTable.setSymbolIsDefined(sectionName, true);
        Assembler::sectionTable.addSection(sectionName);
        Assembler::relocTable.changeRelocEntriesForSection(sectionName);
        Assembler::symbolTable.removeFlinks(sectionName);
        Assembler::writeLineToHelperOutputTxt("Set previously undefined symbol "+sectionName+" to be defined as a section. Location counter set to 0.");
        return true;
      }
      else{
        Assembler::addError("Symbol "+sectionName+" is already defined in the symbol table, can't redefine it as a section.");
        Assembler::writeLineToHelperOutputTxt("ERROR! Symbol "+sectionName+" is already defined in the symbol table, can't redefine it as a section.");
        return false;
      }
    }
    else{
      Assembler::currentSection=sectionName;
      Assembler::locationCnt=0;
      Assembler::symbolTable.addSymbol(sectionName,SymbolData(sectionName,0,SymbolType::SECTION, true));
      Assembler::sectionTable.addSection(sectionName);
      Assembler::writeLineToHelperOutputTxt("Created new symbol and section "+sectionName+", location counter set to 0.");
      return true;
    }
  }
}

bool Assembler::processGlobal(const std::string &globalArgument){
  if(Assembler::symbolTable.symbolExists(globalArgument)){
    switch (Assembler::symbolTable.getSymbolType(globalArgument)){
      case (SymbolType::EXTERN):{
        Assembler::addError("Can't redefine extern symbol "+globalArgument+" as global.");
        Assembler::writeLineToHelperOutputTxt("ERROR! Symbol "+globalArgument+" was already defined as an external symbol.");
        return false;
      }
      case (SymbolType::SECTION):{
        Assembler::addWarning("Tried to redefine section "+globalArgument+" as a global symbol. Redefinition was discarded.");
        Assembler::writeLineToHelperOutputTxt("WARNING! Symbol "+globalArgument+" was already defined as a section.");
        break;
      }
      case (SymbolType::GLOBAL):{
        Assembler::addWarning("Symbol "+globalArgument+" is already defined as a global symbol.");
        Assembler::writeLineToHelperOutputTxt("WARNING! Symbol "+globalArgument+" is already defined as a global symbol.");
        break;
      }
      case (SymbolType::LOCAL):{
        Assembler::addWarning("Symbol "+globalArgument+" is already defined as a local symbol.\nPlace .global directive before symbol's definition to avoid unnecessary calculations.");
        Assembler::writeLineToHelperOutputTxt("WARNING! Symbol "+globalArgument+" is already defined as a local symbol. Changing reloc entries.");
        Assembler::relocTable.changeRelocEntriesForGlobal(Assembler::symbolTable.getSymbolSection(globalArgument), Assembler::symbolTable.getSymbolValue(globalArgument),globalArgument,0);
        Assembler::symbolTable.removeFlinks(globalArgument);  //remove flinks
        break;
      }
      default:{ //undefined
        Assembler::symbolTable.setSymbolType(globalArgument, SymbolType::GLOBAL);
        Assembler::writeLineToHelperOutputTxt("Undefined symbol "+globalArgument+" already exists, setting it's type to global");
        Assembler::symbolTable.removeFlinks(globalArgument);  //remove flinks
        break;
      }
    }
  }
  else{
    Assembler::symbolTable.addSymbol(globalArgument, SymbolData(SECTION_UNDEFINED, 0, SymbolType::GLOBAL, false));
    Assembler::writeLineToHelperOutputTxt("Symbol "+globalArgument+" doesn't exists yet, adding it to the SymbolTable");
  }
  return true;
}

bool Assembler::processExtern(const std::string &externArgument){
  if(Assembler::symbolTable.symbolExists(externArgument)){
    if(Assembler::symbolTable.getSymbolIsDefined(externArgument)){
      Assembler::writeLineToHelperOutputTxt("ERROR! Symbol "+externArgument+" already exists and is defined. Can't make it external.");
      Assembler::addError("Symbol "+externArgument+" is already previously locally defined. Can't import it from other files.");
      return false;
    }

    //if it's not already defined
    switch (Assembler::symbolTable.getSymbolType(externArgument))
    {
      case (SymbolType::NONE):{
        Assembler::symbolTable.setSymbolType(externArgument, SymbolType::EXTERN);
        break;
      }
      case (SymbolType::EXTERN):{
        Assembler::addWarning("Symbol "+externArgument+" was already previously proclaimed as extern.");
        break;
      }
      default:{
        Assembler::addError("Can't change type of "+externArgument+" to extern.");
        Assembler::writeLineToHelperOutputTxt("ERROR! Can't assign extern type to symbol "+externArgument);
        return false;
      }
    }
  }
  else{
    Assembler::symbolTable.addSymbol(externArgument, SymbolData(SECTION_UNDEFINED, 0, SymbolType::EXTERN, false));
    Assembler::writeLineToHelperOutputTxt("External symbol "+externArgument+" doesn't exists, creating new entry in SymbolTable.");
  }
  return true;
}

bool Assembler::processWord(const std::string &wordArgument){
  if(Assembler::currentSection==""){
    Assembler::addError(".word "+wordArgument+"  is not inside a section.");
    return false;
  }

  if(std::regex_match(wordArgument, rgx_symbol)){  //if argument is a symbol
    if(!Assembler::symbolTable.symbolExists(wordArgument)){
      Assembler::symbolTable.addSymbol(wordArgument, SymbolData(SECTION_UNDEFINED, 0, SymbolType::NONE, false));
    }
    SymbolData symbol=Assembler::symbolTable.getSymbol(wordArgument);
    if(symbol.section!=SECTION_ABSOLUTE){ //relative symbol
      if(!symbol.isDefined){
        Assembler::symbolTable.addFlink(wordArgument, Assembler::currentSection, Assembler::locationCnt);
      }
      Assembler::sectionTable.addSectionEntry(Assembler::currentSection, SectionEntry(Assembler::locationCnt, 2, 0));
      if(symbol.type==SymbolType::LOCAL || symbol.type==SymbolType::SECTION){
        Assembler::relocTable.addRelocEntry(Assembler::currentSection, RelocEntry(Assembler::locationCnt, RelocType::R_X86_64_16, symbol.section, symbol.value));
      }
      else{ //global, extern, undefined
        Assembler::relocTable.addRelocEntry(Assembler::currentSection, RelocEntry(Assembler::locationCnt, RelocType::R_X86_64_16, wordArgument, 0));
      }
    }
    else{ //absolute symbol
      Assembler::sectionTable.addSectionEntry(Assembler::currentSection, SectionEntry(Assembler::locationCnt, 2, symbol.value));
    }
  }
  else if(std::regex_match(wordArgument, rgx_literal)){
    int literalValue=Assembler::stringToDec(wordArgument);
    Assembler::sectionTable.addSectionEntry(Assembler::currentSection, SectionEntry(Assembler::locationCnt, 2, literalValue));
  }
  else{
    Assembler::addError(".word directive argument "+wordArgument+" is not valid!");
    return false;
  }
  Assembler::locationCnt+=2;
  return true;
}

bool Assembler::processSkip(const std::string &skipArgument){
  if(Assembler::currentSection==""){
    Assembler::addError("Skip directive is defined outside of a section.");
    Assembler::writeLineToHelperOutputTxt("ERROR! Skip directive is defined outside of a section!");
    return false;
  }
  int skipAmount = Assembler::stringToDec(skipArgument);
  if(skipAmount<=0){
    Assembler::addError("Skip directive's argument must be a positive whole number.");
    Assembler::writeLineToHelperOutputTxt("ERROR! Skip directive has an invalid argument.");
    return false;
  }
  Assembler::sectionTable.addSectionEntry(Assembler::currentSection, SectionEntry(Assembler::locationCnt, skipAmount, 0));
  Assembler::locationCnt+=skipAmount;
  return true;
}

bool Assembler::processAscii(const std::string &str){
  for(int i = str.length()-1; i>=0; i--){
    Assembler::sectionTable.addSectionEntry(Assembler::currentSection, SectionEntry(Assembler::locationCnt, 1, str.at(i)));
  }
  return true;
}

bool Assembler::processEqu(const std::string &symbolName, const std::string &expr){
  //go through reloc table and delete absolute addressings, and change stuff in memory
  return true;
}

bool Assembler::processLabel(const std::string &labelName){
  if(Assembler::currentSection==""){
    Assembler::addError("Label "+labelName+" is defined outside of section!");
    return false;
  }
  if(!Assembler::symbolTable.symbolExists(labelName)){
    Assembler::symbolTable.addSymbol(labelName, SymbolData(Assembler::currentSection, Assembler::locationCnt, SymbolType::LOCAL, true));
  }
  else{
    SymbolData symbol=Assembler::symbolTable.getSymbol(labelName);
    if(symbol.type==SymbolType::EXTERN){
      Assembler::addError("Label "+labelName+" was already previously defined in another file.");
      return false;
    }
    if(symbol.type==SymbolType::SECTION){
      Assembler::addError("Label "+labelName+" was already previously defined as a section.");
      return false;
    }
    if(symbol.isDefined){
      Assembler::addError("Label "+labelName+" was already previously defined in this file.");
      return false;
    }
    //only undefined global or local (type=none) symbols reach this piece of code
    Assembler::symbolTable.setSymbolIsDefined(labelName, true);
    Assembler::symbolTable.setSymbolValue(labelName, Assembler::locationCnt);
    Assembler::symbolTable.setSymbolSection(labelName, Assembler::currentSection);
    if(symbol.type==SymbolType::NONE){
      Assembler::symbolTable.setSymbolType(labelName, SymbolType::LOCAL);
    }
    if(symbol.type==SymbolType::GLOBAL){
      Assembler::symbolTable.removeFlinks(labelName);
    }
  }
  return true;
}

bool Assembler::processZeroOpIns(const std::string &instruction){
  if(Assembler::currentSection==""){
    Assembler::writeLineToHelperOutputTxt("ERROR! Instruction is defined outside of a section!");
    Assembler::addError("Instruction "+instruction+" is defined outside of a section.");
    return false;
  }
  int instructionCode;
  if(instruction=="halt"){
    Assembler::writeLineToHelperOutputTxt("halt (0x00)");
    instructionCode=0x00;
  }
  else if(instruction=="iret"){
    Assembler::writeLineToHelperOutputTxt("iret (0x20)");
    instructionCode=0x20;
  }
  else if(instruction=="ret"){
    Assembler::writeLineToHelperOutputTxt("ret (0x40)");
    instructionCode=0x40;
  }
  else{ //none matched
    Assembler::addError("Instruction invalid.");
    Assembler::writeLineToHelperOutputTxt("Instruction didn't match any available cases.");
    return false;
  }
  Assembler::sectionTable.addSectionEntry(Assembler::currentSection, SectionEntry(Assembler::locationCnt, 1, instructionCode, false));
  Assembler::locationCnt+=1;
  return true;
}

bool Assembler::processOneRegIns(const std::string &instruction, const std::string &reg){
  //int, push, pop, not
  if(Assembler::currentSection==""){
    Assembler::writeLineToHelperOutputTxt("ERROR! Instruction is defined outside of a section!");
    Assembler::addError("Instruction "+instruction+" is defined outside of a section.");
    return false;
  }

  int regNum=Assembler::getRegNumber(reg);
  int instructionCode, lcAdder;

  if(instruction=="int"){
    Assembler::writeLineToHelperOutputTxt("0x100F + ...");
    instructionCode=0x100F + (regNum<<4);
    lcAdder = 2;
  }
  else if(instruction=="push"){
    Assembler::writeLineToHelperOutputTxt("B0 d6 12");
    Assembler::writeLineToHelperOutputTxt("d (destination) = r"+std::to_string(regNum));
    Assembler::writeLineToHelperOutputTxt("s (source) = 6(r6/sp)");
    Assembler::writeLineToHelperOutputTxt("u (update type when using reg ind addressing) = 1 (decrement by 2 before)");
    Assembler::writeLineToHelperOutputTxt("a (addressing type) = 2 (reg inderect without displacement)");
    instructionCode=0xB00612 + (regNum<<12);
    lcAdder=3;
  }
  else if(instruction=="pop"){
    Assembler::writeLineToHelperOutputTxt("0xA0(Rd)642");
    Assembler::writeLineToHelperOutputTxt("d (destination) = r"+std::to_string(regNum));
    Assembler::writeLineToHelperOutputTxt("s (source) = r6(sp)");
    Assembler::writeLineToHelperOutputTxt("u (update type when using reg ind addressing) = 4 (increment by 2 after)");
    Assembler::writeLineToHelperOutputTxt("a (addressing type) = 2 (reg inderect without displacement)");
    instructionCode=0xA00642 + (regNum<<12);
    lcAdder=3;
  }
  else if(instruction=="not"){
    Assembler::writeLineToHelperOutputTxt("0x80(Rd)F");
    Assembler::writeLineToHelperOutputTxt("m (instruction modifier) = 0 (not)");
    Assembler::writeLineToHelperOutputTxt("d (destination) = r"+std::to_string(regNum));
    Assembler::writeLineToHelperOutputTxt("s (source) = F(not used)");
    instructionCode=0x800F + (regNum<<4);
    lcAdder=2;
  }
  else{ //none matched
    Assembler::addError("Instruction invalid.");
    Assembler::writeLineToHelperOutputTxt("Instruction didn't match any available cases.");
    return false;
  }

  Assembler::sectionTable.addSectionEntry(Assembler::currentSection, SectionEntry(Assembler::locationCnt, lcAdder, instructionCode, false));
  Assembler::locationCnt+=lcAdder;
  return true;
}

bool Assembler::processTwoRegIns(const std::string &instruction, const std::string &regOne, const std::string &regTwo){
  //xchg, add, sub, mul, div, cmp, and, or, xor, test, shl, shr
  if(Assembler::currentSection==""){
    Assembler::writeLineToHelperOutputTxt("ERROR! Instruction is defined outside of a section!");
    Assembler::addError("Instruction "+instruction+" is defined outside of a section.");
    return false;
  }

  int regD=Assembler::getRegNumber(regOne);
  int regS=Assembler::getRegNumber(regTwo);

  int reg=(regD<<4)+regS; //DDDD SSSS
  int instructionCode;

  if(instruction=="xchg"){
    Assembler::writeLineToHelperOutputTxt("0x60(Rd)(Rs)");
    instructionCode = 0x6000;
  }
  else if(instruction=="add"){
    Assembler::writeLineToHelperOutputTxt("0x70(Rd)(Rs)");
    instructionCode = 0x7000;
  }
  else if(instruction=="sub"){
    Assembler::writeLineToHelperOutputTxt("0x71(Rd)(Rs)");
    instructionCode = 0x7100;
  }
  else if(instruction=="mul"){
    Assembler::writeLineToHelperOutputTxt("0x72(Rd)(Rs)");
    instructionCode = 0x7200;
  }
  else if(instruction=="div"){
    Assembler::writeLineToHelperOutputTxt("0x73(Rd)(Rs)");
    instructionCode = 0x7300;
  }
  else if(instruction=="cmp"){
    Assembler::writeLineToHelperOutputTxt("0x74(Rd)(Rs)");
    instructionCode = 0x7400;
  }
  else if(instruction=="and"){
    Assembler::writeLineToHelperOutputTxt("0x81(Rd)(Rs)");
    instructionCode = 0x8100;
  }
  else if(instruction=="or"){
    Assembler::writeLineToHelperOutputTxt("0x82(Rd)(Rs)");
    instructionCode = 0x8200;
  }
  else if(instruction=="xor"){
    Assembler::writeLineToHelperOutputTxt("0x83(Rd)(Rs)");
    instructionCode=0x8300;
  }
  else if(instruction=="test"){
    Assembler::writeLineToHelperOutputTxt("0x84(Rd)(Rs)");
    instructionCode=0x8400;
  }
  else if(instruction=="shl"){
    Assembler::writeLineToHelperOutputTxt("0x90(Rd)(Rs)");
    instructionCode=0x9000;
  }
  else if(instruction=="shr"){
    Assembler::writeLineToHelperOutputTxt("0x91(Rd)(Rs)");
    instructionCode=0x9100;
  }
  else{ //none matched
    Assembler::addError("Instruction invalid.");
    Assembler::writeLineToHelperOutputTxt("Instruction didn't match any available cases.");
    return false;
  }
  instructionCode +=reg;
  Assembler::sectionTable.addSectionEntry(Assembler::currentSection, SectionEntry(Assembler::locationCnt, 2, instructionCode, false));
  Assembler::locationCnt+=2;
  return true;
}

bool Assembler::processOneOpIns(const std::string &instruction, const std::string &operand){
  //call, jmp, jeq, jne, jgt
  std::smatch matchedRegex;
  if(Assembler::currentSection==""){
    Assembler::writeLineToHelperOutputTxt("ERROR! Instruction is defined outside of a section!");
    Assembler::addError("Instruction "+instruction+" is defined outside of a section.");
    return false;
  }

  int jmpValue,  addrMode;
  long instructionCode, instrDescr, regDescr, lcAdder;

  if(instruction=="call"){
    instrDescr=0x30;
  }
  else if(instruction=="jmp"){
    instrDescr=0x50;
  }
  else if(instruction=="jeq"){
    instrDescr=0x51;
  }
  else if(instruction=="jne"){
    instrDescr=0x52;
  }
  else if(instruction=="jgt"){
    instrDescr=0x53;
  }
  
  if(std::regex_match(operand, rgx_addr_jmp_abs)){//absolute jmp
    Assembler::writeLineToHelperOutputTxt("Absolute jump, operand = "+operand);
    regDescr=0xFF;  //no reg
    addrMode=0x00;  //immed
    if(std::regex_match(operand, rgx_symbol)){
      jmpValue = Assembler::processAbsoluteAddr(operand, 3);
      if(jmpValue==-1){
        return false;
      }
    }
    else{
      jmpValue = Assembler::stringToDec(operand);
    }
    instructionCode = (instrDescr << (8 * 4)) + (regDescr << (8 * 3)) + (addrMode <<(8 * 2)) + (jmpValue&0xFFFF);
    lcAdder=5;
  }
  else if(std::regex_match(operand, rgx_addr_jmp_pcrel)){//pc relative jmp
    std::string extractedOperand = operand.substr(1);
    Assembler::writeLineToHelperOutputTxt("PC relative jump, operand = "+extractedOperand);
    regDescr=0xF7;  //r7 - pc
    addrMode=0x05;  //reg dir (from pc[r7] register) with displacement marked by operand
    jmpValue=Assembler::processPCRelAddr(extractedOperand, 3, 2);
    if(jmpValue==-1){
      return false;
    }
    instructionCode = (instrDescr << (8 * 4)) + (regDescr << (8 * 3)) + (addrMode <<(8 * 2)) + (jmpValue&0xFFFF);
    lcAdder=5;
  }
  else if(std::regex_match(operand, rgx_addr_jmp_regdir)){  //reg dir - important to put it b4 memdir
    std::string extractedOperand = operand.substr(1);
    Assembler::writeLineToHelperOutputTxt("Reg dir jump, operand = "+extractedOperand);
    int regNum=Assembler::getRegNumber(extractedOperand);
    regDescr=0xF0+regNum; //reg num
    addrMode=0x01;  //reg dir
    instructionCode = (instrDescr << (8 * 2)) + (regDescr << (8 * 1)) + addrMode;
    lcAdder=3;
  }
  else if(std::regex_match(operand, rgx_addr_jmp_memdir)){  //mem dir
    std::string extractedOperand = operand.substr(1);
    Assembler::writeLineToHelperOutputTxt("Mem dir jump, operand = "+extractedOperand);
    regDescr=0xFF;  //no reg
    addrMode=0x04;  //mem dir from the address marked by the operand
    if(std::regex_match(extractedOperand, rgx_symbol)){
      jmpValue=Assembler::processAbsoluteAddr(extractedOperand, 3);
      if(jmpValue==-1){
        return false;
      }
    }
    else{
      jmpValue=Assembler::stringToDec(extractedOperand);
    }
    instructionCode = (instrDescr << (8 * 4)) + (regDescr << (8 * 3)) + (addrMode <<(8 * 2)) + (jmpValue&0xFFFF);
    lcAdder=5;
  }
  else if(std::regex_search(operand, matchedRegex, rgx_addr_jmp_regind)){
    std::string extractedOperand = matchedRegex.str(1);
    Assembler::writeLineToHelperOutputTxt("Reg ind jump, operand = "+extractedOperand);
    int regNum=Assembler::getRegNumber(extractedOperand);
    regDescr=0xF0+regNum; //reg num
    addrMode=0x02;  //reg ind
    instructionCode = (instrDescr << (8 * 2)) + (regDescr << (8 * 1)) + addrMode;
    lcAdder=3;
  }
  else if(std::regex_search(operand, matchedRegex, rgx_addr_jmp_regdisp)){
    std::string extractedReg = matchedRegex.str(1);
    std::string extractedDisp = matchedRegex.str(2);
    Assembler::writeLineToHelperOutputTxt("Reg disp jump, operand = "+extractedReg+", disp = "+extractedDisp);
    int regNum=Assembler::getRegNumber(extractedReg);
    regDescr=0xF0+regNum; //reg num
    addrMode=0x03;  //reg ind with displ
    if(std::regex_match(extractedDisp, rgx_symbol)){
      jmpValue = Assembler::processAbsoluteAddr(extractedDisp, 3);
      if(jmpValue==-1){
        return false;
      }
    }
    else{
      jmpValue = Assembler::stringToDec(extractedDisp);
    }
    instructionCode = (instrDescr << (8 * 4)) + (regDescr << (8 * 3)) + (addrMode <<(8 * 2)) + (jmpValue&0xFFFF);
    lcAdder=5;
  }
  else{ //none matched
    Assembler::addError("Operand invalid.");
    Assembler::writeLineToHelperOutputTxt("Operand didn't match any available cases.");
    return false;
  }
  Assembler::sectionTable.addSectionEntry(Assembler::currentSection, SectionEntry(Assembler::locationCnt, lcAdder, instructionCode, false));
  Assembler::locationCnt+=lcAdder;
  return true;
}

bool Assembler::processOneRegOneOpIns(const std::string &instruction, const std::string &reg, const std::string &operand){
  //ldr, str
  if(Assembler::currentSection==""){
    Assembler::writeLineToHelperOutputTxt("ERROR! Instruction is defined outside of a section!");
    Assembler::addError("Instruction "+instruction+" is defined outside of a section.");
    return false;
  }

  std::smatch matchedRegex;
  int opValue, addrMode;
  long instructionCode, instrDescr, regDescr, lcAdder;

  if(instruction=="ldr"){
    instrDescr=0xA0;
  }
  else if(instruction=="str"){
    instrDescr=0xB0;
  }

  regDescr=Assembler::getRegNumber(reg);
  regDescr<<=4; //dest reg

  if(std::regex_match(operand, rgx_addr_ld_str_immed)){
    std::string extractedOperand=operand.substr(1);
    Assembler::writeLineToHelperOutputTxt("Ld/St immed, operand = "+extractedOperand+", and reg = "+reg);
    regDescr+=0xF;  //no src reg
    addrMode=0x00;  //immed
    if(std::regex_match(extractedOperand, rgx_symbol)){
      opValue = Assembler::processAbsoluteAddr(extractedOperand, 3);
      if(opValue==-1){
        Assembler::addError("Error while performing absolute addressing calculation.");
        return false;
      }
    }
    else{
      opValue = Assembler::stringToDec(extractedOperand);
    }
    instructionCode = (instrDescr << (8 * 4)) + (regDescr << (8 * 3)) + (addrMode <<(8 * 2)) + (opValue&0xFFFF);
    lcAdder=5;
  }
  else if(std::regex_match(operand, rgx_addr_ld_str_regdir)){ //must be b4 memdir
    Assembler::writeLineToHelperOutputTxt("Ld/St regdir, operand = "+operand+", and reg = "+reg);
    int srcReg = Assembler::getRegNumber(operand);
    regDescr+=srcReg;
    addrMode=0x01;  //regdir
    instructionCode = (instrDescr << (8 * 2)) + (regDescr << (8 * 1)) + addrMode;
    lcAdder=3;
  }
  else if(std::regex_match(operand, rgx_addr_ld_str_memdir)){
    Assembler::writeLineToHelperOutputTxt("Ld/St memdir, operand = "+operand+", and reg = "+reg);
    regDescr+=0xF;  //no src
    addrMode=0x04;  //memdir
    if(std::regex_match(operand, rgx_symbol)){
      opValue = Assembler::processAbsoluteAddr(operand, 3);
      if(opValue==-1){
        Assembler::addError("Error while performing absolute addressing calculation.");
        return false;
      }
    }
    else{
      opValue = Assembler::stringToDec(operand);
    }
    instructionCode = (instrDescr << (8 * 4)) + (regDescr << (8 * 3)) + (addrMode <<(8 * 2)) + (opValue&0xFFFF);
    lcAdder=5;
  }
  else if(std::regex_match(operand, rgx_addr_ld_str_mempcrel)){
    std::string extractedOperand = operand.substr(1);
    Assembler::writeLineToHelperOutputTxt("Ld/St mempcrel, operand = "+extractedOperand+", and reg = "+reg);
    regDescr+=0x7;  //pc
    addrMode=0x03;  //regind with displacement
    opValue=Assembler::processPCRelAddr(extractedOperand,3,2);
    if(opValue==-1){
      Assembler::addError("Error while performing absolute PC relative addressing calculation.");
      return false;
    }
    instructionCode = (instrDescr << (8 * 4)) + (regDescr << (8 * 3)) + (addrMode <<(8 * 2)) + (opValue&0xFFFF);
    lcAdder=5;
  }
  else if(std::regex_search(operand, matchedRegex, rgx_addr_ld_str_regind)){
    std::string extractedOperand = matchedRegex.str(1);
    Assembler::writeLineToHelperOutputTxt("Ld/St regind, operand = "+extractedOperand+", and reg = "+reg);
    int srcReg=Assembler::getRegNumber(extractedOperand);
    regDescr+=srcReg;
    addrMode=0x02;  //regind
    instructionCode = (instrDescr << (8 * 2)) + (regDescr << (8 * 1)) + addrMode;
    lcAdder=3;
  }
  else if(std::regex_search(operand, matchedRegex, rgx_addr_ld_str_regdisp)){
    std::string extractedSrcReg=matchedRegex.str(1);
    std::string extractedDisp=matchedRegex.str(2);
    Assembler::writeLineToHelperOutputTxt("Ld/St regdisp, operand = "+extractedSrcReg+", disp = "+extractedDisp+" and reg = "+reg);
    int srcReg=Assembler::getRegNumber(extractedSrcReg);
    regDescr+=srcReg;
    addrMode=0x03; //regind with disp
    if(std::regex_match(extractedDisp, rgx_symbol)){
      opValue = Assembler::processAbsoluteAddr(extractedDisp, 3);
      if(opValue==-1){
        Assembler::addError("Error while performing absolute addressing calculation.");
        return false;
      }
    }
    else{
      opValue = Assembler::stringToDec(extractedDisp);
    }
    instructionCode = (instrDescr << (8 * 4)) + (regDescr << (8 * 3)) + (addrMode <<(8 * 2)) + (opValue&0xFFFF);
    lcAdder=5;
  }
  else{ //none matched
    Assembler::addError("Operand invalid.");
    Assembler::writeLineToHelperOutputTxt("Operand didn't match any available cases.");
    return false;
  }
  Assembler::sectionTable.addSectionEntry(Assembler::currentSection, SectionEntry(Assembler::locationCnt, lcAdder, instructionCode, false));
  Assembler::locationCnt+=lcAdder;
  return true;
}

int Assembler::processAbsoluteAddr(const std::string &operand, int offsetInsideInstr){
  Assembler::writeLineToHelperOutputTxt("Processing absolute addressing for symbol "+operand);
  if(!Assembler::symbolTable.symbolExists(operand)){
    Assembler::writeLineToHelperOutputTxt("Added "+operand+" to symbol table.");
    Assembler::symbolTable.addSymbol(operand, SymbolData(SECTION_UNDEFINED, 0, SymbolType::NONE, false));
  }
  SymbolData symbol = Assembler::symbolTable.getSymbol(operand);
  if(symbol.section==SECTION_ABSOLUTE){
    Assembler::writeLineToHelperOutputTxt("Absolute symbol. Returning "+symbol.value);
    return symbol.value;
  }
  if(symbol.type==SymbolType::SECTION){
    Assembler::writeLineToHelperOutputTxt("Symbol is a section. Adding reloc entry. Returning 0.");
    Assembler::relocTable.addRelocEntry(Assembler::currentSection, RelocEntry(Assembler::locationCnt + offsetInsideInstr, RelocType::R_X86_64_16, operand, 0, false, true));
  }
  else if(symbol.type==SymbolType::LOCAL){
    Assembler::writeLineToHelperOutputTxt("Symbol is a local symbol. Adding reloc entry. Returning 0.");
    Assembler::relocTable.addRelocEntry(Assembler::currentSection, RelocEntry(Assembler::locationCnt + offsetInsideInstr, RelocType::R_X86_64_16, symbol.section, symbol.value, false));
  }
  else{ //global, extern, undefined
    Assembler::writeLineToHelperOutputTxt("Symbol is global/extern/undefined symbol. Adding reloc entry. Returning 0.");
    Assembler::relocTable.addRelocEntry(Assembler::currentSection, RelocEntry(Assembler::locationCnt + offsetInsideInstr, RelocType::R_X86_64_16, operand, 0, false));
    if(!symbol.isDefined){
      Assembler::writeLineToHelperOutputTxt("Adding flink.");
      Assembler::symbolTable.addFlink(operand, Assembler::currentSection, Assembler::locationCnt + offsetInsideInstr);
    }
  }
  return 0; //fill data with zeros, will amend it later from reloc table
}

int Assembler::processPCRelAddr(const std::string &operand, int offsetInsideInstr, int diffBetweenOffsetAndNextInstr){
  Assembler::writeLineToHelperOutputTxt("Processing PC rel addressing for symbol "+operand);
  if(!Assembler::symbolTable.symbolExists(operand)){
    Assembler::symbolTable.addSymbol(operand, SymbolData(SECTION_UNDEFINED, 0, SymbolType::NONE, false));
  }
  SymbolData symbol = Assembler::symbolTable.getSymbol(operand);

  //absolute, global, extern or undefined
  if(symbol.section==SECTION_ABSOLUTE || symbol.type==SymbolType::GLOBAL || symbol.type==SymbolType::EXTERN || symbol.type==SymbolType::NONE){
    Assembler::relocTable.addRelocEntry(Assembler::currentSection, RelocEntry(Assembler::locationCnt + offsetInsideInstr, RelocType::R_X86_64_PC16, operand, -diffBetweenOffsetAndNextInstr, false));
    if(!symbol.isDefined){
      Assembler::symbolTable.addFlink(operand, Assembler::currentSection, Assembler::locationCnt + offsetInsideInstr);
    }
  }
  else if(symbol.type==SymbolType::SECTION){  //section
    Assembler::relocTable.addRelocEntry(Assembler::currentSection, RelocEntry(Assembler::locationCnt + offsetInsideInstr, RelocType::R_X86_64_PC16, operand, -diffBetweenOffsetAndNextInstr, false, true));
  }
  else if(symbol.type==SymbolType::LOCAL){  //local and defined
    if(symbol.section==Assembler::currentSection){  //always the same distance between symbol and jmp instruction, so no need to make a reloc entry
      Assembler::writeLineToHelperOutputTxt("Symbol is defined in this section, always the same distance of: "+std::to_string(symbol.value - (Assembler::locationCnt + offsetInsideInstr + diffBetweenOffsetAndNextInstr)));
      return symbol.value - (Assembler::locationCnt + offsetInsideInstr + diffBetweenOffsetAndNextInstr); //check math!
    }
    else{
      Assembler::relocTable.addRelocEntry(Assembler::currentSection, RelocEntry(Assembler::locationCnt + offsetInsideInstr, RelocType::R_X86_64_PC16, symbol.section, symbol.value-diffBetweenOffsetAndNextInstr, false));
    }
  }
  return 0;
}