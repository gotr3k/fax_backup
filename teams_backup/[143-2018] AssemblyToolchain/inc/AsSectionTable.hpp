#pragma once

#include <string>
#include <unordered_map>
#include <vector>

#define SECTION_UNDEFINED ".undefined"
#define SECTION_ABSOLUTE ".absolute"

struct Data{
  int hex1;
  int hex2;
  bool operator==(Data d) const {
    return d.hex1==hex1 && d.hex2==hex2;
  }
};

struct SectionEntry{
  unsigned int offset;
  unsigned int size;
  std::vector<Data> data;
  bool isData;
  SectionEntry(unsigned int offset, unsigned int size, long data_, bool isData=true):offset(offset),size(size),isData(isData){
    if(isData){ //little endian (left <- right)
      for(int i=0; i<size; i++){  
        data.push_back({int((data_ >>4) & 0xF), int((data_ >> 0) & 0xF) });
        data_>>=8;
      }
    }
    else{ //big endian (left -> right)
      for(int i=size-1; i>=0; i--){  
        data.push_back({int((data_ >>(i*8+4)) & 0xF), int((data_ >> (i*8)) & 0xF) });
      }
    }
  }
  SectionEntry():offset(0),size(0),isData(true){}
};

struct SectionData{
  unsigned int size; //all entry sizes added up
  std::vector<SectionEntry> entries;
};

class SectionTable{
  private:
    std::unordered_map<std::string, SectionData> table;
  public:
    //constr
    //SectionTable();
    //section's existential dread
    bool sectionExists(const std::string &sectionName);
    bool isEmpty();
    //sectionEntries
    SectionData getSectionData(const std::string &sectionName);
    void addSectionEntry(const std::string &sectionName, SectionEntry entry);
    void addSection(const std::string &sectionName); //without an entry
    //data
    std::vector<Data> getDataAtOffset(const std::string &sectionName, unsigned int offset, unsigned int size);
    void setSectionDataAtOffset(const std::string &sectionName, unsigned int offset, unsigned int size, long data);
    //print
    void printToOutput(const std::string &fileName);
    void printToBinaryOutput(const std::string &fileName);
    void printToHelperTxt(const std::string &fileName);
};