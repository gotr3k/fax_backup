#include "LdRelocTable.hpp"

class RelocTablesForAllAsFiles{
  std::unordered_map<std::string, RelocationTable> table; //file name, reloc table
public:
  //relocTable's existential dread
  bool relocTableExists(const std::string &fileName);
  bool isEmpty();
  //relocationTable
  RelocationTable getRelocationTable(const std::string &fileName);
  void addRelocationTable(const std::string &fileName, RelocationTable sectionTable);
  void removeRelocationTable(const std::string &fileName);
  //reloc entries
  std::vector<RelocEntry> getRelocEntries(const std::string &fileName, const std::string &sectionName);
  std::vector<RelocEntry> getAllRelocEntriesForSection(const std::string &sectionName);
  void addRelocEntry(const std::string &fileName, const std::string &sectionName, RelocEntry entry);
  //offsets
  void increaseOffsetsForFileAndSection(const std::string &fileName, const std::string &sectionName, unsigned int offsetIncrease);
  //addends
  void increaseAddendsForFileAndSection(const std::string &fileName, const std::string &sectionName, const std::string symbolName, unsigned int oaddendIncrease);
  //print
  void printToHelperTxt(const std::string &fileName);
};