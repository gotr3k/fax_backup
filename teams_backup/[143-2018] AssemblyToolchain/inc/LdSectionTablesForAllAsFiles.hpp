#pragma once

#include "LdSectionTable.hpp"

class SectionTablesForAllAsFiles{
  std::unordered_map<std::string, SectionTable> table;  //filename, section table
public:
  //sectionTable's existential dread
  bool sectionTableExists(const std::string &fileName);
  bool isEmpty();
  //sectionTable
  SectionTable getSectionTable(const std::string &fileName);
  void addSectionTable(const std::string &fileName, SectionTable sectionTable);
  void removeSectionTable(const std::string &fileName);
  //sectionData
  SectionData getSectionData(const std::string &fileName, const std::string &sectionName);
  void addSectionData(const std::string &fileName, const std::string &sectionName, SectionData sectionData);
  //size
  unsigned int getSectionSize(const std::string &fileName, const std::string &sectionName);
  void setSectionSize(const std::string &fileName, const std::string &sectionName, unsigned int newSize);
  //memAddr
  unsigned int getSectionMemAddr(const std::string &fileName, const std::string &sectionName);
  void setSectionMemAddr(const std::string &fileName, const std::string &sectionName, unsigned int newMemAddr);
  //sectionEntries
  void addSectionEntry(const std::string &fileName, const std::string &sectionName, SectionEntry entry);
  std::vector<SectionEntry> getSectionEntries(const std::string &fileName, const std::string &sectionName);
  std::vector<SectionEntry> getAllSectionEntriesForSection(const std::string &sectionName);
  //print
  void printToHelperTxt(const std::string &fileName);
};