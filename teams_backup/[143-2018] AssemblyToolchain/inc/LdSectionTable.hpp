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

struct SectionData{  //section from one file
  unsigned int size; //all entry sizes added up
  unsigned int memAddr;
  std::string originFile;
  std::vector<SectionEntry> entries;
  SectionData(unsigned int size, unsigned int memAddr, std::string originFile):size(size),memAddr(memAddr),originFile(originFile){}
  SectionData():size(0),memAddr(0){}
};

class SectionTable{
  private:
    std::unordered_map<std::string, SectionData> table; //section name, section data
  public:
    //section's existential dread
    bool sectionExists(const std::string &sectionName);
    bool isEmpty();
    std::unordered_map<std::string, SectionData> getTable();
    //sectionData
    SectionData getSectionData(const std::string &sectionName);
    void addSectionData(const std::string &sectionName, SectionData sectionData);
    void addSection(const std::string &sectionName); //without data
    //size
    unsigned int getSectionSize(const std::string &sectionName);
    void setSectionSize(const std::string &sectionName, unsigned int newSize);
    //memAddr
    unsigned int getSectionMemAddr(const std::string &sectionName);
    void setSectionMemAddr(const std::string &sectionName, unsigned int newMemAddr);
    //originFile
    std::string getSectionOriginFile(const std::string &sectionName);
    void setSectionOriginFile(const std::string &sectionName, std::string newOriginFile);
    //sectionEntries
    void addSectionEntry(const std::string &sectionName, SectionEntry entry);
    std::vector<SectionEntry> getSectionEntries(const std::string &sectioName);
    //data
    std::vector<Data> getDataAtOffset(const std::string &sectionName, unsigned int offset, unsigned int size);
    void setDataAtOffset(const std::string &sectionName, unsigned int offset, unsigned int size, long data, bool isData);
    //print
    void printToHelperTxt(const std::string &fileName);
};