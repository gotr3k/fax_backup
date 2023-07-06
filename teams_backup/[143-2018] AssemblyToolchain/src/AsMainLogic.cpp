#include "../inc/As.hpp"

Assembler::Assembler(const std::string &inputFileName, const std::string &outputFileName):
  inputFileName(inputFileName), outputFileName(outputFileName), lineCnt(0), locationCnt(0), errorOccured(false), currentSection(""){
  Assembler::formattedInputFileName=inputFileName.substr(0,inputFileName.find_last_of('.'))+"_formatted.s";
  Assembler::helperOutputFileName=outputFileName.substr(0,outputFileName.find_last_of('.'))+"_helper.txt";
  Assembler::binaryOutputFileName=outputFileName.substr(0,outputFileName.find_last_of('.'))+"_binary.o";
}

void Assembler::assemble(){
  Assembler::helperOutputFileStream.open(Assembler::helperOutputFileName);
  if(!Assembler::formatInputFile()){  //pre-processing of input file
    Assembler::printResults();
    Assembler::helperOutputFileStream.close();
    return;
  }

  if(!Assembler::goThroughFormattedInputFile()){     //main processing       
    Assembler::printResults();
    Assembler::helperOutputFileStream.close();
    return;
  }
  if(!Assembler::goThroughFlinksAndRelocs()){ //post processing of reloc table
    Assembler::printResults();
    Assembler::helperOutputFileStream.close();
    return;
  }
  
  Assembler::printResults();                //print results of assemblying (success, errors, warnings) to terminal
  Assembler::writeToOutputFiles();          //write to output files
  Assembler::helperOutputFileStream.close();
}

bool Assembler::formatInputFile(){
  Assembler::writeLineToHelperOutputTxt("FORMATTING INPUT FILE\n");
  std::ifstream inputFile;
  std::ofstream formattedInputFile; 
  inputFile.open(Assembler::inputFileName);
  formattedInputFile.open(Assembler::formattedInputFileName); //output file is intermediary in this case - not the final output file  
  if(!inputFile.is_open() || !formattedInputFile.is_open()){
    Assembler::errorOccured=true;
    Assembler::addError("Can't open input file.");
    return false;
  }
  unsigned int inputLineCnt=0;
  unsigned int outputLineCnt=1;
  std::string line;
  bool eof=false;
  while(getline(inputFile,line)){
    inputLineCnt++;
    Assembler::inputFileLines.push_back(line);
    std::string formattedLine;
    formattedLine=std::regex_replace(line, rgx_remove_comments, "");
    formattedLine=std::regex_replace(formattedLine, rgx_reduce_tabs, " ");
    formattedLine=std::regex_replace(formattedLine, rgx_reduce_multiple_spaces, " ");
    formattedLine=std::regex_replace(formattedLine, rgx_reduce_spaces_around_colons, ":");
    formattedLine=std::regex_replace(formattedLine, rgx_insert_new_line_after_colon, "$1\n$2"); //try to resolve this in some other way?
    formattedLine=std::regex_replace(formattedLine, rgx_reduce_spaces_around_commas, ",");
    formattedLine=std::regex_replace(formattedLine, rgx_reduce_spaces_around_pluses, "+");
    formattedLine=std::regex_replace(formattedLine, rgx_reduce_bracket_start_spaces, "[");
    formattedLine=std::regex_replace(formattedLine, rgx_reduce_bracket_end_spaces, "]");
    formattedLine=std::regex_replace(formattedLine, rgx_reduce_line_end_spaces, "");
    formattedLine=std::regex_replace(formattedLine, rgx_reduce_line_start_spaces, "");
    
    if(formattedLine!="" && formattedLine!=" "){
      std::vector<std::string> tokens = Assembler::splitString(formattedLine, '\n');  //have to do this because of labels
      for(auto const &token:tokens){
        Assembler::writeLineToHelperOutputTxt("Mapping "+std::to_string(outputLineCnt)+" to "+std::to_string(inputLineCnt));
        Assembler::lineMap[outputLineCnt++]=inputLineCnt;   //map input file lines to formatted input file lanes (for error handling)
        Assembler::formattedInputFileLines.push_back(token);
        formattedInputFile<<token;
        if(token==".end"){  //we don't assemble past this line
          eof=true;
          break;
        }
        else{
          formattedInputFile<<std::endl;
        }
      }
      if(eof){
        break;
      }
    }
  }
  inputFile.close();
  formattedInputFile.close();
  return true;
}

bool Assembler::goThroughFormattedInputFile(){ //goes through formatted input file and categorizes data
  Assembler::writeLineToHelperOutputTxt("GOING THROUGH THE FORMATTED INPUT FILE:");
  Assembler::lineCnt=1;
  Assembler::locationCnt=0;
  bool eof=false;
  for(std::string line: Assembler::formattedInputFileLines){
    std::smatch matchedRgxs;
    Assembler::writeLineToHelperOutputTxt("\nLine "+std::to_string(Assembler::lineCnt)+": "+line);
    Assembler::writeLineToHelperOutputTxt("Curr section: "+Assembler::currentSection+" (offset: "+std::to_string(Assembler::locationCnt)+")");
    if(std::regex_search(line, matchedRgxs, rgx_section_dir)){ //section directive
      std::string sectionName=matchedRgxs.str(1);
      Assembler::writeLineToHelperOutputTxt("Found > RGX_SECTION_DIR: "+sectionName);
      if(!Assembler::processSection(sectionName)){
        return false;
      }
    }
    else if(std::regex_search(line, matchedRgxs, rgx_global_dir)){ //global directive
      std::string globalSymbols=matchedRgxs.str(1);
      std::vector<std::string> tokens = Assembler::splitString(globalSymbols,',');
      for(auto const &token:tokens){
        Assembler::writeLineToHelperOutputTxt("Found > RGX_GLOBAL_DIR: "+token);
        if(!Assembler::processGlobal(token)){
          return false;
        }
      }
    }
    else if(std::regex_search(line, matchedRgxs, rgx_extern_dir)){  //extern directive
      std::string externSymbols=matchedRgxs.str(1);
      std::vector<std::string> tokens = Assembler::splitString(externSymbols,',');
      for(auto const &token:tokens){
        Assembler::writeLineToHelperOutputTxt("Found > RGX_EXTERN_DIR: "+token);
        if(!Assembler::processExtern(token)){
          return false;
        }
      }
    }
    else if(std::regex_search(line, matchedRgxs, rgx_word_dir)){  //word directive
      std::string wordSymbolsOrLiterals=matchedRgxs.str(1);
      std::vector<std::string> tokens = Assembler::splitString(wordSymbolsOrLiterals,',');
      for(auto const &token:tokens){
        Assembler::writeLineToHelperOutputTxt("Found > RGX_WORD_DIR: "+token);
        if(!Assembler::processWord(token)){
          return false;
        }
      }
    }
    else if(std::regex_search(line, matchedRgxs, rgx_skip_dir)){  //skip directive
      std::string literal=matchedRgxs.str(1);
      Assembler::writeLineToHelperOutputTxt("Found > RGX_SKIP_DIR: "+literal);
      if(!Assembler::processSkip(literal)){
        return false;
      }
    }
    else if(std::regex_search(line, matchedRgxs, rgx_ascii_dir)){ //ascii directive
      std::string str=matchedRgxs.str(1).substr(1, matchedRgxs.str(1).length()-2);
      Assembler::writeLineToHelperOutputTxt("Found > RGX_ASCII_DIR: "+str);
      if(!Assembler::processAscii(str)){
        return false;
      }
    }
    else if(std::regex_search(line, matchedRgxs, rgx_equ_dir)){ //equ directive
      std::string newSymbol=matchedRgxs.str(1);
      std::string expr=matchedRgxs.str(2);
      Assembler::writeLineToHelperOutputTxt("Found > RGX_EQU_DIR: "+newSymbol+" = "+expr);
      //process equ
    }
    else if(std::regex_search(line, matchedRgxs, rgx_end_dir)){ //end directive
      Assembler::writeLineToHelperOutputTxt("Found > RGX_END_DIR");
      eof=true;
      break;
    }
    else if(std::regex_search(line, matchedRgxs, rgx_label)){   //label
      std::string label=matchedRgxs.str(0).substr(0,matchedRgxs.str(0).length()-1);
      Assembler::writeLineToHelperOutputTxt("Found > RGX_LABEL: "+label);
      if(!Assembler::processLabel(label)){
        return false;
      }
    }
    else if(std::regex_search(line, matchedRgxs, rgx_zero_op_ins)){
      std::string instruction=matchedRgxs.str(0);
      Assembler::writeLineToHelperOutputTxt("Found > ZERO_OP_INS: INS:"+instruction);
      if(!Assembler::processZeroOpIns(instruction)){
        return false;
      }
    }
    else if(std::regex_search(line, matchedRgxs, rgx_one_reg_ins)){
      std::string instruction=matchedRgxs.str(1);
      std::string reg=matchedRgxs.str(2);
      Assembler::writeLineToHelperOutputTxt("Found > ONE_REG_INS: INS:"+instruction+", R:"+reg);
      if(!Assembler::processOneRegIns(instruction, reg)){
        return false;
      }
    }
    else if(std::regex_search(line, matchedRgxs, rgx_two_reg_ins)){
      std::string instruction=matchedRgxs.str(1);
      std::string regOne=matchedRgxs.str(2);
      std::string regTwo=matchedRgxs.str(3);
      Assembler::writeLineToHelperOutputTxt("Found > TWO_REG_INS: INS:"+instruction+", R1:"+regOne+", R2:"+regTwo);
      if(!Assembler::processTwoRegIns(instruction, regOne, regTwo)){
        return false;
      }
    }
    else if(std::regex_search(line, matchedRgxs, rgx_one_op_ins)){
      std::string instruction=matchedRgxs.str(1);
      std::string operand=matchedRgxs.str(2);
      Assembler::writeLineToHelperOutputTxt("Found > ONE_OP_INS: INS:"+instruction+", OP:"+operand);
      if(!Assembler::processOneOpIns(instruction, operand)){
        return false;
      }
    }
    else if(std::regex_search(line, matchedRgxs, rgx_one_reg_one_op_ins)){
      std::string instruction=matchedRgxs.str(1);
      std::string reg=matchedRgxs.str(2);
      std::string operand=matchedRgxs.str(3);
      Assembler::writeLineToHelperOutputTxt("Found > ONE_REG_ONE_OP_INS: INS:"+instruction+", R:"+reg+", OP:"+operand);
      if(!Assembler::processOneRegOneOpIns(instruction, reg, operand)){
        return false;
      }
    }
    else{
      Assembler::writeLineToHelperOutputTxt("ERROR! Unknown instruction/directive/operand.");
      Assembler::addError("Invalid instruction/directive/operand.");
      return false;
    }
    Assembler::lineCnt++;
  }
  if(eof){
    Assembler::lineCnt=0; //for better error/warning display
  }
  else{
    Assembler::addWarning("Missing .end directive.");
  }
  return true;
}  

bool Assembler::goThroughFlinksAndRelocs(){ //fixes stuff in tables
  Assembler::writeLineToHelperOutputTxt("\nGOING THROUGH FLINKS AND RELOCS");

  std::vector<std::string> invalidSymbols=Assembler::symbolTable.invalidSymbols();

  for(const auto &invalidSymbol: invalidSymbols){
    Assembler::addError("Symbol "+invalidSymbol+" is not defined anywhere.");    
  }

  if(invalidSymbols.size()>0){
    return false;
  }

  std::vector<std::string> localSymbols = Assembler::symbolTable.getSymbolsOfType(SymbolType::LOCAL);

  for(const auto& localSymbol: localSymbols){
    Assembler::writeLineToHelperOutputTxt("Local symbol: "+localSymbol);
    std::list<ForwardRef> flinks=Assembler::symbolTable.getFlinks(localSymbol);
    for(const auto& flink: flinks){
      Assembler::writeLineToHelperOutputTxt("\tFlink: ("+flink.section+": "+std::to_string(flink.offset)+")");
      Assembler::writeLineToHelperOutputTxt("\tChanging reloc entry at #"+flink.section+".reloc: "+std::to_string(flink.offset)+" from '"+localSymbol+" + addend' to '"+Assembler::symbolTable.getSymbolSection(localSymbol)+"' + newAddend");
      Assembler::relocTable.changeRelocEntriesForLocal(flink.section, flink.offset, Assembler::symbolTable.getSymbolSection(localSymbol), Assembler::symbolTable.getSymbolValue(localSymbol));
    }
    Assembler::symbolTable.removeFlinks(localSymbol);
  }

  std::vector<std::string> externSymbols = Assembler::symbolTable.getSymbolsOfType(SymbolType::EXTERN);

  for(const auto& externSymbol: externSymbols){
    Assembler::writeLineToHelperOutputTxt("Extern symbol: "+externSymbol);
    if(Assembler::symbolTable.hasFlinks(externSymbol)){
      Assembler::writeLineToHelperOutputTxt("\tHas flinks - removing them");
      Assembler::symbolTable.removeFlinks(externSymbol);
    }
    else{
      Assembler::writeLineToHelperOutputTxt("\tDoes not have flinks - removing symbol");
      Assembler::addWarning("Extern symbol "+externSymbol+" not used anywhere.");
      Assembler::symbolTable.removeSymbol(externSymbol);
    }
  }
  Assembler::writeLineToHelperOutputTxt("");
  return true;
}  

void Assembler::writeToOutputFiles(){
  Assembler::symbolTable.printToOutput(Assembler::outputFileName);
  Assembler::symbolTable.printToHelperTxt(Assembler::helperOutputFileName);
  Assembler::symbolTable.printToBinaryOutput(Assembler::binaryOutputFileName);
  Assembler::sectionTable.printToOutput(Assembler::outputFileName);
  Assembler::sectionTable.printToHelperTxt(Assembler::helperOutputFileName);
  Assembler::sectionTable.printToBinaryOutput(Assembler::binaryOutputFileName);
  Assembler::relocTable.printToOutput(Assembler::outputFileName);
  Assembler::relocTable.printToHelperTxt(Assembler::helperOutputFileName);
  Assembler::relocTable.printToBinaryOutput(Assembler::binaryOutputFileName);
}