#include "../inc/LdSymbolTable.hpp"
#include "../inc/LdSectionTable.hpp"
#include <iostream>
#include <fstream>
#include <iomanip>
#include <algorithm>

std::ostream& operator<<(std::ostream& out, SymbolType value){
    const char* s = 0;
#define PROCESS_VAL(p) case(p): s = #p; break;
    switch(value){
        PROCESS_VAL(NONE);     
        PROCESS_VAL(SECTION);     
        PROCESS_VAL(LOCAL);
        PROCESS_VAL(GLOBAL);
        PROCESS_VAL(EXTERN);
    }
#undef PROCESS_VAL
    return out << std::string(s);
}

//||=========================================================||
//||=========================================================||
//||=========================================================||
//||                   CONSTRUCTOR                           ||
//||=========================================================||
//||=========================================================||
//||=========================================================||




//||=========================================================||
//||=========================================================||
//||=========================================================||
//||              SYMBOL'S EXISTENTIAL DREAD                 ||
//||=========================================================||
//||=========================================================||
//||=========================================================||

bool SymbolTable::symbolExists(const std::string &label){
  return SymbolTable::table.find(label)!=SymbolTable::table.end();
}

bool SymbolTable::isEmpty(){
  return SymbolTable::table.empty();
}

std::map<std::string, SymbolData> SymbolTable::getTable(){
  return SymbolTable::table;
}

//||=========================================================||
//||=========================================================||
//||=========================================================||
//||                       SYMBOL                            ||
//||=========================================================||
//||=========================================================||
//||=========================================================||

SymbolData SymbolTable::getSymbol(const std::string &label){
  return SymbolTable::table.at(label);
}

void SymbolTable::addSymbol(const std::string &label, SymbolData symbolData){
  SymbolTable::table.insert(std::make_pair(label, symbolData));
}

void SymbolTable::removeSymbol(const std::string &label){
  SymbolTable::table.erase(label);
}

//||=========================================================||
//||=========================================================||
//||=========================================================||
//||                    SYMBOL ID                            ||
//||=========================================================||
//||=========================================================||
//||=========================================================||

int SymbolTable::getSymbolID(const std::string &label){
  return SymbolTable::table.at(label).symbolID;
}

//||=========================================================||
//||=========================================================||
//||=========================================================||
//||                      SECTION                            ||
//||=========================================================||
//||=========================================================||
//||=========================================================||

std::string SymbolTable::getSymbolSection(const std::string &label){
  return SymbolTable::table.at(label).section;
}

void SymbolTable::setSymbolSection(const std::string &label, std::string newSectionName){
  SymbolTable::table.at(label).section=newSectionName;
}

//||=========================================================||
//||=========================================================||
//||=========================================================||
//||                       VALUE                             ||
//||=========================================================||
//||=========================================================||
//||=========================================================||

unsigned int SymbolTable::getSymbolValue(const std::string &label){
  return SymbolTable::table.at(label).value;
}

void SymbolTable::setSymbolValue(const std::string &label, unsigned int newValue){
  SymbolTable::table.at(label).value=newValue;
}

void SymbolTable::increaseValueByAndSetOriginFile(const std::string &sectionName, const std::string &originFile, unsigned int addOffset, const std::string &newOriginFile){
  for(auto &symbol: SymbolTable::table){
    if(symbol.second.type!=SymbolType::SECTION){
      if(symbol.second.section==sectionName && symbol.second.originFile==originFile){
        symbol.second.originFile=newOriginFile;
        symbol.second.value+=addOffset;
      }
    }
  }
}
//||=========================================================||
//||=========================================================||
//||=========================================================||
//||                        TYPE                             ||
//||=========================================================||
//||=========================================================||
//||=========================================================||

SymbolType SymbolTable::getSymbolType(const std::string &label){
  return SymbolTable::table.at(label).type;
}

void SymbolTable::setSymbolType(const std::string &label, SymbolType newType){
  SymbolTable::table.at(label).type=newType;
} 

std::vector<std::string> SymbolTable::getSymbolsOfType(SymbolType wantedType){
  std::vector<std::string> result;
  for(auto const &symbol: SymbolTable::table){
    if(symbol.second.type==wantedType)
      result.push_back(symbol.first);
  }
  return result;
}

void SymbolTable::removeSymbolsOfType(SymbolType wantedType){
  for(auto const &symbol: SymbolTable::table){
    if(symbol.second.type==wantedType)
      SymbolTable::removeSymbol(symbol.first);
  }
}

//||=========================================================||
//||=========================================================||
//||=========================================================||
//||                   IS DEFINED                            ||
//||=========================================================||
//||=========================================================||
//||=========================================================||

bool SymbolTable::getSymbolIsDefined(const std::string &label){
  return SymbolTable::table.at(label).isDefined;
}

void SymbolTable::setSymbolIsDefined(const std::string &label, bool newIsDefined){
  SymbolTable::table.at(label).isDefined=newIsDefined;
}

//||=========================================================||
//||=========================================================||
//||=========================================================||
//||                  ORIGIN FILE                            ||
//||=========================================================||
//||=========================================================||
//||=========================================================||

std::string SymbolTable::getSymbolOriginFile(const std::string &label){
  return SymbolTable::table.at(label).originFile;
}

void SymbolTable::setSymbolOriginFIle(const std::string &label, std::string newOriginFile){
  SymbolTable::table.at(label).originFile=newOriginFile;
}

//||=========================================================||
//||=========================================================||
//||=========================================================||
//||                  INVALID SYMBOLS                        ||
//||=========================================================||
//||=========================================================||
//||=========================================================||

//should be checked in global table after processing (removing locals, externals defined in other files and duplicate sections)
std::vector<std::string> SymbolTable::invalidSymbols(){
  std::vector<std::string> invalidSymbols;
  for(const auto &symbol: SymbolTable::table){
    unsigned int symbolOccuranceCnt=0;
    std::string checkingForSymbol=symbol.first;
    if(symbol.second.isDefined==false){
      invalidSymbols.push_back(checkingForSymbol);
    }
    else{
      for(const auto &symbol: SymbolTable::table){
        if(symbol.first==checkingForSymbol)
          symbolOccuranceCnt++;
      }
      if(symbolOccuranceCnt>1)
        invalidSymbols.push_back(checkingForSymbol);
    }
  }
  return invalidSymbols;
}

//||=========================================================||
//||=========================================================||
//||=========================================================||
//||                       PRINT                             ||
//||=========================================================||
//||=========================================================||
//||=========================================================||

void SymbolTable::printToHelperTxt(const std::string &fileName){
  int idW=4, valW=10, typW=9, nameW=20, flnW=30;
  std::ofstream file;
  file.open(fileName, std::ios::app);  //append to file
  file<<std::left<<"#.symtab\n"
      <<std::setw(idW)  <<"ID"
      <<std::setw(valW) <<"Value(HX)"
      <<std::setw(typW) <<"MyType"
      <<std::setw(nameW)<<"Section"
      <<std::setw(nameW)<<"Name"
                        <<"File";

  for(auto const &symbol: SymbolTable::table){
    std::string label = symbol.first;
    SymbolData symbolData = symbol.second;
    file<<"\n"
        <<std::setw(idW)<<symbolData.symbolID                      //num
        <<std::setw(valW)<<std::hex<<std::right<<symbolData.value<<" "<<std::left<<std::dec     //value
        <<std::setw(typW)<<symbolData.type                         //type
        <<std::setw(nameW)<<symbolData.section                     //section
        <<std::setw(nameW)<<std::left<<label.c_str()               //name
                          <<std::left<<symbolData.originFile;
  }
  file<<std::endl;
  file.close();
}