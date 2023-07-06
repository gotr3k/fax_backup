#include "../inc/LdRelocTablesForAllAsFiles.hpp"
#include <fstream>
#include <iomanip>

//relocTable's existential dread
bool RelocTablesForAllAsFiles::relocTableExists(const std::string &fileName){
  return RelocTablesForAllAsFiles::table.find(fileName)!=RelocTablesForAllAsFiles::table.end();
}
bool RelocTablesForAllAsFiles::isEmpty(){
  return RelocTablesForAllAsFiles::table.empty();
}

//relocationTable
RelocationTable RelocTablesForAllAsFiles::getRelocationTable(const std::string &fileName){
  return RelocTablesForAllAsFiles::table.at(fileName);
}

void RelocTablesForAllAsFiles::addRelocationTable(const std::string &fileName, RelocationTable relocTable){
  RelocTablesForAllAsFiles::table[fileName]=relocTable;
}

void RelocTablesForAllAsFiles::removeRelocationTable(const std::string &fileName){
  RelocTablesForAllAsFiles::table.erase(fileName);
}

//reloc entries
std::vector<RelocEntry> RelocTablesForAllAsFiles::getRelocEntries(const std::string &fileName, const std::string &sectionName){
  return RelocTablesForAllAsFiles::table.at(fileName).getRelocEntriesForSection(sectionName);
}

std::vector<RelocEntry> RelocTablesForAllAsFiles::getAllRelocEntriesForSection(const std::string &sectionName){
  std::vector<RelocEntry> result;
  for(auto &relocTable:RelocTablesForAllAsFiles::table){
    for(auto &relocEntry:relocTable.second.getRelocEntriesForSection(sectionName)){
      result.push_back(relocEntry);
    }
  }
  return result;
}

void RelocTablesForAllAsFiles::addRelocEntry(const std::string &fileName, const std::string &sectionName, RelocEntry entry){
  RelocTablesForAllAsFiles::table[fileName].addRelocEntry(sectionName,entry);
}

//offsets
void RelocTablesForAllAsFiles::increaseOffsetsForFileAndSection(const std::string &fileName, const std::string &sectionName, unsigned int offsetIncrease){
  RelocTablesForAllAsFiles::table.at(fileName).increaseAllOffsetsBy(sectionName, offsetIncrease);
}

//addends
void RelocTablesForAllAsFiles::increaseAddendsForFileAndSection(const std::string &fileName, const std::string &sectionName, const std::string symbolName, unsigned int addendIncrease){
  RelocTablesForAllAsFiles::table.at(fileName).increaseAddendsForLocalRelocsBy(sectionName, symbolName, addendIncrease);
}

//print
void RelocTablesForAllAsFiles::printToHelperTxt(const std::string &fileName){
  std::ofstream file;
  for(auto &relocTable:RelocTablesForAllAsFiles::table){
    file.open(fileName, std::ios::app);  //append to file
    file<<"RELOC TABLES FROM FILE '"<<relocTable.first<<"':"<<std::endl;
    file.close();
    relocTable.second.printToHelperTxt(fileName);
  }
}