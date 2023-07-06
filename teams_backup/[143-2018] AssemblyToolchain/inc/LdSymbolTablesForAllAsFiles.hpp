#pragma once

#include "LdSymbolTable.hpp"

class SymbolTablesForAllAsFiles{  //structure which holds all input file's symbol tables
  std::unordered_map<std::string, SymbolTable> table;
public:
    //symbolTable's existential dread
    bool symbolTableExists(const std::string &fileName);
    bool isEmpty();
    //symbolTable
    SymbolTable getSymbolTable(const std::string &fileName);
    void addSymbolTable(const std::string &fileName, SymbolTable symbolTable);
    void removeSymbolTable(const std::string &fileName);
    //symbol
    SymbolData getSymbol(const std::string &fileName, const std::string &label);
    void addSymbol(const std::string &fileName, const std::string &label, SymbolData symbolData);
    void removeSymbol(const std::string &fileName, const std::string &label);
    //symbolID
    int getSymbolID(const std::string &fileName, const std::string &label);
    //section
    std::string getSymbolSection(const std::string &fileName, const std::string &label);
    void setSymbolSection(const std::string &fileName, const std::string &label, std::string newSectionName);
    //value
    unsigned int getSymbolValue(const std::string &fileName, const std::string &label);
    void setSymbolValue(const std::string &fileName, const std::string &label, unsigned int newValue);
    //type
    SymbolType getSymbolType(const std::string &fileName, const std::string &label);
    void setSymbolType(const std::string &fileName, const std::string &label, SymbolType newType);
    std::vector<std::string> getAllSymbolsOfType(SymbolType wantedType);
    std::vector<std::string> getSymbolsOfTypeFromFile(const std::string &fileName, SymbolType wantedType);
    void removeSymbolsOfTypeFromFile(const std::string &fileName, SymbolType wantedType);
    void removeAllSymbolsOfType(SymbolType wantedType);
    //isDefined
    bool getSymbolIsDefined(const std::string &fileName, const std::string &label);
    void setSymbolIsDefined(const std::string &fileName, const std::string &label, bool newIsDefined);
    //invalid symbols (checked in post processing of the file)
    std::vector<std::string> invalidSymbols();
    //print
    void printToHelperTxt(const std::string &fileName);
};