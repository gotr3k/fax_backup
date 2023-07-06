#pragma once

#include <string>
#include <unordered_map>
#include <vector>

enum  RelocType{      //page 75 in psABI amd64
  R_X86_64_16=0,      //S + A
  R_X86_64_PC16=1,    //S + A - P
};

std::ostream& operator<<(std::ostream& out, RelocType value);

struct RelocEntry{
  unsigned int offset;
  RelocType type; //type of relocation from System V ABI
  std::string symbol;
  int addend;
  bool isData;  //if it's data use little endian, if it's an instruction use big endian
  std::string originFile;
  bool isRealSectionSymbol; //so we dont override global (ex. local) symbols that had value 0 in reloc table when we go through it to amend relocs
  RelocEntry(unsigned int offset, RelocType type, std::string symbol, int addend, std::string originFile, bool isData=true, bool isRealSectionSymb=false)
  :offset(offset), type(type), symbol(symbol), addend(addend), originFile(originFile), isData(isData), isRealSectionSymbol(isRealSectionSymb){}
  RelocEntry():offset(0), type(RelocType::R_X86_64_16), symbol(""), addend(0), originFile(""), isData(true), isRealSectionSymbol(false){}
};

struct AbsSymbolInfo{
  int value;
  std::string section;
  unsigned int offset;
  unsigned int size;
};

class RelocationTable{
    std::unordered_map<std::string, std::vector<RelocEntry>> table; //section name, reloc entries
  public:
    //reloc's existential dread
    bool relocationsExistsForSection(const std::string &sectionName);
    bool isEmpty();
    std::unordered_map<std::string, std::vector<RelocEntry>> getTable();
    //relocation entries
    std::vector<RelocEntry> getRelocEntriesForSection(const std::string &sectionName);
    void addRelocEntry(const std::string &sectionName, RelocEntry entry);
    std::vector<AbsSymbolInfo> getAndDeleteRelocEntriesForAbsolute(); 
    //offset
    void increaseAllOffsetsBy(const std::string &sectionName, unsigned int addOffset);
    //addend
    void increaseAddendsForLocalRelocsBy(const std::string &sectionName, const std::string &symbolName, unsigned int addendIncrease);
    //print
    void printToHelperTxt(const std::string &fileName);
};