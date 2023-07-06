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
  bool isRealSectionSymbol; //so we dont override global (ex. local) symbols that had value 0 in reloc table when we go through it to amend relocs
  RelocEntry(unsigned int offset, RelocType type, std::string symbol, int addend, bool isData=true, bool isRealSectionSymbol=false)
  :offset(offset), type(type), symbol(symbol), addend(addend), isData(isData), isRealSectionSymbol (isRealSectionSymbol){}
};

struct AbsSymbolInfo{
  int value;
  std::string section;
  unsigned int offset;
  unsigned int size;
};

class RelocationTable{
    std::unordered_map<std::string, std::vector<RelocEntry>> table;
  public:
    //reloc's existential dread
    bool relocationsExistsForSection(const std::string &sectionName);
    bool isEmpty();
    //relocation entries
    std::vector<RelocEntry> getRelocEntriesForSection(const std::string &sectionName);
    void addRelocEntry(const std::string &sectionName, RelocEntry entry);
    //for local symbols which were previously undefined (will get sectName and offset by going through flinks)
    void changeRelocEntriesForLocal(const std::string &sectionName, unsigned int offset, std::string newSymbol, int newAddend);
    //for section symbols which were previously undefined
    void changeRelocEntriesForSection(const std::string &sectionName);
    //for global symbols which were previously local
    //  old symbol = section name in which local symbol was defined
    //  old addend = local symbol's value
    void changeRelocEntriesForGlobal(const std::string &oldSymbol, int oldAddend, std::string newSymbol, int newAddend);
    //delete absolute symbol relocs and return places in which to insert them in mem
    std::vector<AbsSymbolInfo> getAndDeleteRelocEntriesForAbsolute(); 
    //print
    void printToOutput(const std::string &fileName);
    void printToBinaryOutput(const std::string &fileName);
    void printToHelperTxt(const std::string &fileName);
};