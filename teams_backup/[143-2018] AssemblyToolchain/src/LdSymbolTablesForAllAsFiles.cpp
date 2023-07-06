#include "../inc/LdSymbolTablesForAllAsFiles.hpp"
#include <fstream>

//||=========================================================||
//||=========================================================||
//||=========================================================||
//||         SYMBOL TABLE'S EXISTENTIAL DREAD                ||
//||=========================================================||
//||=========================================================||
//||=========================================================||

bool SymbolTablesForAllAsFiles::symbolTableExists(const std::string &fileName){
  return SymbolTablesForAllAsFiles::table.find(fileName)!=SymbolTablesForAllAsFiles::table.end();
}

bool SymbolTablesForAllAsFiles::isEmpty(){
  return SymbolTablesForAllAsFiles::table.empty();
}

//||=========================================================||
//||=========================================================||
//||=========================================================||
//||                    SYMBOL TABLE                         ||
//||=========================================================||
//||=========================================================||
//||=========================================================||
SymbolTable SymbolTablesForAllAsFiles::getSymbolTable(const std::string &fileName){
  return SymbolTablesForAllAsFiles::table.at(fileName);
}

void SymbolTablesForAllAsFiles::addSymbolTable(const std::string &fileName, SymbolTable symbolTable){
  SymbolTablesForAllAsFiles::table[fileName]=symbolTable;
}

void SymbolTablesForAllAsFiles::removeSymbolTable(const std::string &fileName){
  SymbolTablesForAllAsFiles::table.erase(fileName);
}

//symbol
SymbolData SymbolTablesForAllAsFiles::getSymbol(const std::string &fileName, const std::string &label){
  return SymbolTablesForAllAsFiles::table.at(fileName).getSymbol(label);
}

void SymbolTablesForAllAsFiles::addSymbol(const std::string &fileName, const std::string &label, SymbolData symbolData){
  SymbolTablesForAllAsFiles::table[fileName].addSymbol(label, symbolData);
}

void SymbolTablesForAllAsFiles::removeSymbol(const std::string &fileName, const std::string &label){
  SymbolTablesForAllAsFiles::table.at(fileName).removeSymbol(label);
}

//symbolID
int SymbolTablesForAllAsFiles::getSymbolID(const std::string &fileName, const std::string &label){
  return SymbolTablesForAllAsFiles::table.at(fileName).getSymbolID(label);
}

//||=========================================================||
//||=========================================================||
//||=========================================================||
//||                     SECTION                             ||
//||=========================================================||
//||=========================================================||
//||=========================================================||

std::string SymbolTablesForAllAsFiles::getSymbolSection(const std::string &fileName, const std::string &label){
  return SymbolTablesForAllAsFiles::table.at(fileName).getSymbolSection(label);
}

void SymbolTablesForAllAsFiles::setSymbolSection(const std::string &fileName, const std::string &label, std::string newSectionName){
  SymbolTablesForAllAsFiles::table.at(fileName).setSymbolSection(label, newSectionName);
}

//||=========================================================||
//||=========================================================||
//||=========================================================||
//||                     VALUE                               ||
//||=========================================================||
//||=========================================================||
//||=========================================================||

unsigned int SymbolTablesForAllAsFiles::getSymbolValue(const std::string &fileName, const std::string &label){
  return SymbolTablesForAllAsFiles::table.at(fileName).getSymbolValue(label);
}

void SymbolTablesForAllAsFiles::setSymbolValue(const std::string &fileName, const std::string &label, unsigned int newValue){
  SymbolTablesForAllAsFiles::table.at(fileName).setSymbolValue(label, newValue);
}

//||=========================================================||
//||=========================================================||
//||=========================================================||
//||                       TYPE                              ||
//||=========================================================||
//||=========================================================||
//||=========================================================||

SymbolType SymbolTablesForAllAsFiles::getSymbolType(const std::string &fileName, const std::string &label){
  return SymbolTablesForAllAsFiles::table.at(fileName).getSymbolType(label);
}

void SymbolTablesForAllAsFiles::setSymbolType(const std::string &fileName, const std::string &label, SymbolType newType){
  SymbolTablesForAllAsFiles::table.at(fileName).setSymbolType(label, newType);
}

std::vector<std::string> SymbolTablesForAllAsFiles::getAllSymbolsOfType(SymbolType wantedType){
  std::vector<std::string> result;
  for(auto &symbolTable: SymbolTablesForAllAsFiles::table){
    for(auto &symbol: symbolTable.second.getSymbolsOfType(wantedType)){
      result.push_back(symbol);
    }
  }
  return result;
}

std::vector<std::string> SymbolTablesForAllAsFiles::getSymbolsOfTypeFromFile(const std::string &fileName, SymbolType wantedType){
  return SymbolTablesForAllAsFiles::table.at(fileName).getSymbolsOfType(wantedType);
}

void SymbolTablesForAllAsFiles::removeSymbolsOfTypeFromFile(const std::string &fileName, SymbolType wantedType){
  SymbolTablesForAllAsFiles::table.at(fileName).removeSymbolsOfType(wantedType);
}

void SymbolTablesForAllAsFiles::removeAllSymbolsOfType(SymbolType wantedType){
  for(auto &symbolTable: SymbolTablesForAllAsFiles::table){
    symbolTable.second.removeSymbolsOfType(wantedType);
  }
}

//||=========================================================||
//||=========================================================||
//||=========================================================||
//||                   IS DEFINED                            ||
//||=========================================================||
//||=========================================================||
//||=========================================================||

bool SymbolTablesForAllAsFiles::getSymbolIsDefined(const std::string &fileName, const std::string &label){
  return SymbolTablesForAllAsFiles::table.at(fileName).getSymbolIsDefined(label);
}

void SymbolTablesForAllAsFiles::setSymbolIsDefined(const std::string &fileName, const std::string &label, bool newIsDefined){
  SymbolTablesForAllAsFiles::table.at(fileName).setSymbolIsDefined(label, newIsDefined);
}

//||=========================================================||
//||=========================================================||
//||=========================================================||
//||       INVALID SYMBOLS (CHECK AFTER PROCESSING)          ||
//||=========================================================||
//||=========================================================||
//||=========================================================||

std::vector<std::string> SymbolTablesForAllAsFiles::invalidSymbols(){
  std::vector<std::string> result;
  for(auto &sectionTable: SymbolTablesForAllAsFiles::table){
    for(auto &invalidSymbol: sectionTable.second.invalidSymbols()){
      result.push_back(invalidSymbol);
    }
  }
  return result;
}

//||=========================================================||
//||=========================================================||
//||=========================================================||
//||                      PRINT                              ||
//||=========================================================||
//||=========================================================||
//||=========================================================||

void SymbolTablesForAllAsFiles::printToHelperTxt(const std::string &fileName){
  std::ofstream file;
  for(auto &symbolTable:SymbolTablesForAllAsFiles::table){
    file.open(fileName, std::ios::app);  //append to file
    file<<"SYMBOL TABLE FROM FILE '"<<symbolTable.first<<"':"<<std::endl;
    file.close();
    symbolTable.second.printToHelperTxt(fileName);
  }
}