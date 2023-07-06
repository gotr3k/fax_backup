#include "../inc/AsSymbolTable.hpp"
#include "../inc/AsSectionTable.hpp"
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

SymbolTable::SymbolTable(){
  SymbolTable::addSymbol(SECTION_ABSOLUTE, SymbolData(SECTION_ABSOLUTE,0,SymbolType::SECTION,true));
  SymbolTable::addSymbol(SECTION_UNDEFINED, SymbolData(SECTION_UNDEFINED,0,SymbolType::SECTION,true));
}

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
//||                       FLINK                             ||
//||=========================================================||
//||=========================================================||
//||=========================================================||

std::list<ForwardRef> SymbolTable::getFlinks(const std::string &label){
  return SymbolTable::table.at(label).flinks;
}

void SymbolTable::addFlink(const std::string &label, std::string section, unsigned int offset){
  SymbolTable::table.at(label).flinks.push_back(ForwardRef(section, offset));
}

bool SymbolTable::hasFlinks(const std::string &label){
  return !SymbolTable::table.at(label).flinks.empty();
}

void SymbolTable::removeFlinks(const std::string &label){
  SymbolTable::table.at(label).flinks.clear();
}

//||=========================================================||
//||=========================================================||
//||=========================================================||
//||                  INVALID SYMBOLS                        ||
//||=========================================================||
//||=========================================================||
//||=========================================================||

std::vector<std::string> SymbolTable::invalidSymbols(){
  std::vector<std::string> invalidSymbols;
  for(const auto &symbol: SymbolTable::table){
    if(symbol.second.isDefined==false && symbol.second.type!=SymbolType::EXTERN){
      invalidSymbols.push_back(symbol.first);
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

void SymbolTable::printToOutput(const std::string &fileName){
  //sort symbols by transfering them to vector from map
  typedef std::pair<std::string, SymbolData> Symbol;
  std::vector<Symbol> vec;
  std::copy(SymbolTable::table.begin(), SymbolTable::table.end(), std::back_inserter<std::vector<Symbol>>(vec));
  std::sort(vec.begin(), vec.end(), [](const Symbol &l, const Symbol &r){
    return l.second.symbolID < r.second.symbolID;
  });

  int idW=4, valW=10, typW=6, bndW=6, ndxW=7;
  std::ofstream file;
  file.open(fileName);  //starts from 0!!!
  file<<std::left<<"#.symtab\n"
      <<std::setw(idW)<<"ID"
      <<std::setw(valW)<<" Value(HX) "
      <<std::setw(typW)<<"Type"
      <<std::setw(bndW)<<"Bind"
      <<std::setw(ndxW)<<"Ndx"
                    <<"Name";

  for(auto const &symbol: vec){
    if(symbol.first!=SECTION_ABSOLUTE){
      std::string label = symbol.first;
      SymbolData symbolData = symbol.second;
      file<<"\n"
          <<std::setw(idW)<<symbolData.symbolID  //id
          <<std::setw(valW)<<std::hex<<std::right<<symbolData.value<<" "<<std::left<<std::dec;        //value

      switch (symbolData.type)   //type
      {
        case (SymbolType::SECTION):{
          file<<std::setw(typW)<<"SCTN";
          break;
        }
        default:{
          file<<std::setw(typW)<<"NOTYP";
          break;
        }
      }

      switch (symbolData.type)   //bind
      {
        case (SymbolType::GLOBAL): case(SymbolType::EXTERN): {
          file<<std::setw(bndW)<<"GLOB";
          break;
        }
        default:{
          file<<std::setw(bndW)<<"LOC";
          break;
        }
      }


      if(symbolData.section==SECTION_ABSOLUTE){ //ndx
        file<<std::setw(ndxW)<<"*ABS*";
      }
      else{
        file<<std::setw(ndxW)<<SymbolTable::getSymbolID(symbolData.section);
      }

      file<<((label==SECTION_UNDEFINED)?"":label.c_str());  //name
    }
  }
  file<<std::endl;
  file.close();
}

void SymbolTable::printToBinaryOutput(const std::string &fileName){
  std::ofstream file(fileName, std::ios::binary);
  int numberOfSymbols = SymbolTable::table.size();
  file.write((char *)&numberOfSymbols, sizeof(numberOfSymbols));
  for(const auto &symbol: SymbolTable::table){
    std::string label=symbol.first;
    SymbolData symbolData=symbol.second;
    unsigned int strLength=label.length();                      //label
    file.write((char *)&strLength,sizeof(strLength));           //label
    file.write(label.c_str(), strLength);                       //label
    file.write((char *)&symbolData.symbolID, sizeof(symbolData.symbolID));  //symbolID
    strLength=symbolData.section.length();              //section
    file.write((char *)&strLength,sizeof(strLength));   //section
    file.write(symbolData.section.c_str(), strLength);  //section
    file.write((char *)&symbolData.value, sizeof(symbolData.value));  //value
    file.write((char *)&symbolData.type, sizeof(symbolData.type));    //type - CHECK THIS - MIGHT NEED TO TREAT IT AS STRING
    file.write((char *)&symbolData.isDefined, sizeof(symbolData.isDefined));  //isDefined
  }
  file.close();
}

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
                        <<"Flinks(Hex)";

  for(auto const &symbol: SymbolTable::table){
    std::string label = symbol.first;
    SymbolData symbolData = symbol.second;
    file<<"\n"
        <<std::setw(idW)<<symbolData.symbolID                      //num
        <<std::setw(valW)<<std::hex<<std::right<<symbolData.value<<" "<<std::left<<std::dec     //value
        <<std::setw(typW)<<symbolData.type                         //type
        <<std::setw(nameW)<<symbolData.section                      //section
        <<std::setw(nameW)<<std::left<<label.c_str();               //name
    
    for(auto const& flink: symbolData.flinks){                   //flinks
      file<<"("<<flink.section<<": "<<std::hex<<flink.offset<<") -> ";
    }
  }
  file<<std::endl;
  file.close();
}