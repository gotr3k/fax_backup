#include "../inc/AsRelocTable.hpp"
#include <iostream>
#include <fstream>
#include <iomanip>

std::ostream& operator<<(std::ostream& out, RelocType value){
    const char* s = 0;
#define PROCESS_VAL(p) case(p): s = #p; break;
    switch(value){
        PROCESS_VAL(R_X86_64_16);
        PROCESS_VAL(R_X86_64_PC16);
    }
#undef PROCESS_VAL
    return out << std::string(s);
}
    
//||=========================================================||
//||=========================================================||
//||=========================================================||
//||               RELOC'S EXISTENTIAL DREAD                 ||
//||=========================================================||
//||=========================================================||
//||=========================================================||

bool RelocationTable::relocationsExistsForSection(const std::string &sectionName){
  return RelocationTable::table.find(sectionName)!=RelocationTable::table.end();
}

bool RelocationTable::isEmpty(){
  return RelocationTable::table.empty();
}

//||=========================================================||
//||=========================================================||
//||=========================================================||
//||                   RELOCATION ENTRIES                    ||
//||=========================================================||
//||=========================================================||
//||=========================================================||

std::vector<RelocEntry> RelocationTable::getRelocEntriesForSection(const std::string &sectionName){
  return RelocationTable::table.at(sectionName);
}

void RelocationTable::addRelocEntry(const std::string &sectionName, RelocEntry entry){
  RelocationTable::table[sectionName].push_back(entry);
}

//for local symbols which were previously undefined (will get sectName and offset by going through flinks)
void RelocationTable::changeRelocEntriesForLocal(const std::string &sectionName, unsigned int offset, std::string newSymbol, int newAddend){
  for(auto &entry: RelocationTable::table.at(sectionName)){
    if(entry.offset==offset){
      entry.symbol=newSymbol;
      if(entry.type==RelocType::R_X86_64_16){
        entry.addend=newAddend;
      }
      else{ //must be pc rel then
        entry.addend=newAddend-2;
      }
    }
  }
}

//for sections which were previously undefined (just set data to show that it's actual section)
void RelocationTable::changeRelocEntriesForSection(const std::string &sectionName){
  for(auto &entries: RelocationTable::table){
    for(auto &entry: entries.second){
      if(entry.symbol==sectionName){
        entry.isRealSectionSymbol=true;
      }
    }
  }
}

//for global symbols which were previously local
//  old symbol = section name in which local symbol was defined
//  old addend = local symbol's value
void RelocationTable::changeRelocEntriesForGlobal(const std::string &oldSymbol, int oldAddend, std::string newSymbol, int newAddend){
  for(auto &relocEntries: RelocationTable::table){
    for(auto &entry: relocEntries.second){
      if(entry.symbol==oldSymbol && entry.isRealSectionSymbol==false){
        if(entry.addend==oldAddend && entry.type==RelocType::R_X86_64_16){
          entry.symbol=newSymbol;
          entry.addend=newAddend;
        }
        else if(entry.addend==oldAddend-2 && entry.type==RelocType::R_X86_64_PC16){ //if it was pc rel addressing
          entry.symbol=newSymbol;
          entry.addend=newAddend-2;
        }
      }
    }
  }
}

std::vector<AbsSymbolInfo> RelocationTable::getAndDeleteRelocEntriesForAbsolute(){
  //implement later
  std::vector<AbsSymbolInfo> result;
  return result;
}

//print
void RelocationTable::printToOutput(const std::string &fileName){
  int offW = 15, typW=20, datW=7, symW=20, addW=15;
  std::ofstream file;
  file.open(fileName, std::ios::app);
  for(const auto& relocation: RelocationTable::table){
    std::string sectionName = relocation.first;
    file<<std::left<<"#"<<sectionName<<".reloc\n";
    file<<std::setw(offW)<<"Offset(HX)"
        <<std::setw(20)<<"Type"
        <<std::setw(20)<<"Symbol"
        <<std::setw(15)<<"Addend(DEC)";
    for(const auto& entry: relocation.second){
      file<<"\n"
          <<std::setw(offW)<<std::hex<<entry.offset<<std::dec
          <<std::setw(20)<<entry.type
          <<std::setw(20)<<entry.symbol
          <<std::setw(15)<<entry.addend;
    }
    file<<std::endl;
  }
  file.close();
}

void RelocationTable::printToBinaryOutput(const std::string &fileName){
  std::ofstream file(fileName, std::ios::app | std::ios::binary);
  int numberOfRelocSections = RelocationTable::table.size();
  file.write((char *)&numberOfRelocSections, sizeof(numberOfRelocSections));    //total number of relocSections
  for(const auto &relocSection: RelocationTable::table){                        //for each relocSection write:
    std::string relocSectionName=relocSection.first;
    std::vector<RelocEntry> relocSectionData=relocSection.second;
    int strLength=relocSectionName.length();                               //relocSectionName
    file.write((char *)(&strLength),sizeof(strLength));                    //relocSectionName
    file.write(relocSectionName.c_str(), strLength);                       //relocSectionName

    //reloc entries
    int numberOfRelocEntries = relocSectionData.size();
    file.write((char *)&numberOfRelocEntries, sizeof(numberOfRelocEntries));  //number of reloc entries
    for(const auto &relocEntry: relocSectionData){                      //for each entry write:
      file.write((char *)&relocEntry.offset, sizeof(relocEntry.offset));      //entry offset
      file.write((char *)&relocEntry.type, sizeof(relocEntry.type));          //entry type CHECK THIS ONE MIGHT NEED TO BE TREATED AS STRING
      
      strLength=relocEntry.symbol.size();                             //entry symbol
      file.write((char *)(&strLength),sizeof(strLength));             //entry symbol
      file.write(relocEntry.symbol.c_str(), strLength);               //entry symbol

      file.write((char *)&relocEntry.addend, sizeof(relocEntry.addend));  //entry addend
      file.write((char *)&relocEntry.isData, sizeof(relocEntry.isData));  //entry isData
      file.write((char *)&relocEntry.isRealSectionSymbol, sizeof(relocEntry.isRealSectionSymbol));  //is real section (don't increase addend in ld)
    }
  }
  file.close();
}

void RelocationTable::printToHelperTxt(const std::string &fileName){
  int offW = 15, typW=20, datW=7, symW=20, addW=15;
  std::ofstream file;
  file.open(fileName, std::ios::app);
  for(const auto& relocation: RelocationTable::table){
    std::string sectionName = relocation.first;
    file<<std::left<<"#"<<sectionName<<".reloc\n";
    file<<std::setw(offW)<<"Offset(DEC)"
        <<std::setw(typW)<<"Type"
        <<std::setw(datW)<<"Data?"
        <<std::setw(symW)<<"Symbol"
        <<std::setw(addW)<<"Addend(DEC)";
    for(const auto& entry: relocation.second){
      file<<"\n"
          <<std::setw(offW)<<entry.offset
          <<std::setw(typW)<<entry.type
          <<std::setw(datW)<<((entry.isData)?"Yes":"No")
          <<std::setw(symW)<<entry.symbol
          <<std::setw(addW)<<entry.addend;
    }
    file<<std::endl;
  }
  file.close();
}