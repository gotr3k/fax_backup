#include "../inc/LdRelocTable.hpp"
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

//reloc's existential dread
bool RelocationTable::relocationsExistsForSection(const std::string &sectionName){
  return RelocationTable::table.find(sectionName)!=RelocationTable::table.end();
}

bool RelocationTable::isEmpty(){
  return RelocationTable::table.empty();
}

std::unordered_map<std::string, std::vector<RelocEntry>> RelocationTable::getTable(){
  return RelocationTable::table;
}

//relocation entries
std::vector<RelocEntry> RelocationTable::getRelocEntriesForSection(const std::string &sectionName){
  return RelocationTable::table.at(sectionName);
}

void RelocationTable::addRelocEntry(const std::string &sectionName, RelocEntry entry){
  RelocationTable::table[sectionName].push_back(entry);
}

std::vector<AbsSymbolInfo> RelocationTable::getAndDeleteRelocEntriesForAbsolute(){
  std::vector<AbsSymbolInfo> result;
  
  return result;
}

//offset

void RelocationTable::increaseAllOffsetsBy(const std::string &sectionName, unsigned int addOffset){
  for(auto &entries: RelocationTable::table){
    if(entries.first==sectionName){
      for(auto &entry:entries.second){
        entry.offset+=addOffset;
      }
    }
  }
}

//addend

void RelocationTable::increaseAddendsForLocalRelocsBy(const std::string &sectionName, const std::string &symbolName, unsigned int addendIncrease){
  for(auto &entries: RelocationTable::table){
    if(entries.first==sectionName){
      for(auto &entry:entries.second){
        if(entry.isRealSectionSymbol==false && entry.symbol==symbolName){
          entry.addend+=addendIncrease;
        }
      }
    }
  }
}

//print
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
        <<std::setw(addW)<<"Addend(DEC)"
                         <<"File";
    for(const auto& entry: relocation.second){
      file<<"\n"
          <<std::setw(offW)<<entry.offset
          <<std::setw(typW)<<entry.type
          <<std::setw(datW)<<((entry.isData)?"Yes":"No")
          <<std::setw(symW)<<entry.symbol
          <<std::setw(addW)<<entry.addend
                           <<entry.originFile;
    }
    file<<std::endl;
  }
  file.close();
}