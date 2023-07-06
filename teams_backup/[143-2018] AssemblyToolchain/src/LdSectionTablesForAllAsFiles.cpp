#include "../inc/LdSectionTablesForAllAsFiles.hpp"
#include <fstream>
#include <iomanip>

//sectionTable's existential dread
bool SectionTablesForAllAsFiles::sectionTableExists(const std::string &fileName){
  return SectionTablesForAllAsFiles::table.find(fileName)!=SectionTablesForAllAsFiles::table.end();
}

bool SectionTablesForAllAsFiles::isEmpty(){
  return SectionTablesForAllAsFiles::table.empty();
}

//sectionTable
SectionTable SectionTablesForAllAsFiles::getSectionTable(const std::string &fileName){
  return SectionTablesForAllAsFiles::table.at(fileName);
}

void SectionTablesForAllAsFiles::addSectionTable(const std::string &fileName, SectionTable sectionTable){
  SectionTablesForAllAsFiles::table[fileName]=sectionTable;
}

void SectionTablesForAllAsFiles::removeSectionTable(const std::string &fileName){
  SectionTablesForAllAsFiles::table.erase(fileName);
}

//sectionData
SectionData SectionTablesForAllAsFiles::getSectionData(const std::string &fileName, const std::string &sectionName){
  return SectionTablesForAllAsFiles::table.at(fileName).getSectionData(sectionName);
}

void SectionTablesForAllAsFiles::addSectionData(const std::string &fileName, const std::string &sectionName, SectionData sectionData){
  SectionTablesForAllAsFiles::table[fileName].addSectionData(sectionName, sectionData);
}

//size
unsigned int SectionTablesForAllAsFiles::getSectionSize(const std::string &fileName, const std::string &sectionName){
  return SectionTablesForAllAsFiles::table.at(fileName).getSectionSize(sectionName);
}

void SectionTablesForAllAsFiles::setSectionSize(const std::string &fileName, const std::string &sectionName, unsigned int newSize){
  SectionTablesForAllAsFiles::table.at(fileName).setSectionSize(sectionName, newSize);
}
//memAddr
unsigned int SectionTablesForAllAsFiles::getSectionMemAddr(const std::string &fileName, const std::string &sectionName){
  return SectionTablesForAllAsFiles::table.at(fileName).getSectionMemAddr(sectionName);
}
void SectionTablesForAllAsFiles::setSectionMemAddr(const std::string &fileName, const std::string &sectionName, unsigned int newMemAddr){
  SectionTablesForAllAsFiles::table.at(fileName).setSectionMemAddr(sectionName, newMemAddr);
}
//sectionEntries
void SectionTablesForAllAsFiles::addSectionEntry(const std::string &fileName, const std::string &sectionName, SectionEntry entry){
  SectionTablesForAllAsFiles::table[fileName].addSectionEntry(sectionName, entry);
}

std::vector<SectionEntry> SectionTablesForAllAsFiles::getSectionEntries(const std::string &fileName, const std::string &sectionName){
  return SectionTablesForAllAsFiles::table.at(fileName).getSectionEntries(sectionName);
}

std::vector<SectionEntry> SectionTablesForAllAsFiles::getAllSectionEntriesForSection(const std::string &sectionName){
  std::vector<SectionEntry> result;
  for(auto &sectionTable: SectionTablesForAllAsFiles::table){
    for(auto &entry: sectionTable.second.getSectionEntries(sectionName)){
      result.push_back(entry);
    }
  }
  return result;
}
//print
void SectionTablesForAllAsFiles::printToHelperTxt(const std::string &fileName){
  std::ofstream file;
  for(auto &sectionTable:SectionTablesForAllAsFiles::table){
    file.open(fileName, std::ios::app);  //append to file
    file<<"SECTION TABLE FROM FILE '"<<sectionTable.first<<"':"<<std::endl;
    file.close();
    sectionTable.second.printToHelperTxt(fileName);
  }
}