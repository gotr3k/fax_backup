#pragma once

#include "LdSectionTable.hpp"

#include <iostream>
#include <map>
#include <unordered_map>
#include <vector>

typedef enum{
  LOCAL = 0,
  GLOBAL = 1,
  EXTERN = 2,
  SECTION = 3,
  NONE = 4
} SymbolType;

std::ostream& operator<<(std::ostream& out, SymbolType value);

struct SymbolData{
  int symbolID;
  std::string section;
  unsigned int value;  //offset in the current section
  SymbolType type;
  bool isDefined;
  std::string originFile;
  SymbolData(int symbolID, std::string section, unsigned int value, SymbolType type, bool isDefined, std::string originFile)
  :symbolID(symbolID), section(section),value(value),type(type),isDefined(isDefined), originFile(originFile) {}
  SymbolData() : symbolID(symbolID), section(SECTION_UNDEFINED),value(0),type(SymbolType::NONE),isDefined(false), originFile("") {}
};

class SymbolTable{  //symbol table from 1 assembler file  (and 1 global symbol Table)
  std::map<std::string, SymbolData> table;  //symbol name, symbol data
public:
  //symbol's existential dread
  bool symbolExists(const std::string &label);
  bool isEmpty();
  std::map<std::string, SymbolData> getTable();
  //symbol
  SymbolData getSymbol(const std::string &label);
  void addSymbol(const std::string &label, SymbolData symbolData);
  void removeSymbol(const std::string &label);
  //symbolID
  int getSymbolID(const std::string &label);
  //section
  std::string getSymbolSection(const std::string &label);
  void setSymbolSection(const std::string &label, std::string newSectionName);
  //value
  unsigned int getSymbolValue(const std::string &label);
  void setSymbolValue(const std::string &label, unsigned int newValue);
  void increaseValueByAndSetOriginFile(const std::string &sectionName, const std::string &originFile, unsigned int addOffset, const std::string &newOriginFile);
  //type
  SymbolType getSymbolType(const std::string &label);
  void setSymbolType(const std::string &label, SymbolType newType);    
  std::vector<std::string> getSymbolsOfType(SymbolType wantedType); //must go through reloc table and check global/local stuff   MAYBE NEEDS TO RETURN SYMBOLDATA ALSO
  void removeSymbolsOfType(SymbolType wantedType);
  //isDefined
  bool getSymbolIsDefined(const std::string &label);
  void setSymbolIsDefined(const std::string &label, bool newIsDefined);
  //originFile
  std::string getSymbolOriginFile(const std::string &label);
  void setSymbolOriginFIle(const std::string &label, std::string newOriginFile);
  //invalid symbols (checked in post processing of the file)
  std::vector<std::string> invalidSymbols();
  //print
  void printToHelperTxt(const std::string &fileName);
};