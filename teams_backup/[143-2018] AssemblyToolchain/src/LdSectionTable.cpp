#include "../inc/LdSectionTable.hpp"
#include <fstream>
#include <iomanip>
#include <iostream>

//section's existential dread
bool SectionTable::sectionExists(const std::string &sectionName){
  return SectionTable::table.find(sectionName)!=SectionTable::table.end();
}
bool SectionTable::isEmpty(){
  return SectionTable::table.empty();
}

std::unordered_map<std::string, SectionData> SectionTable::getTable(){
  return SectionTable::table;
}
//sectionData
SectionData SectionTable::getSectionData(const std::string &sectionName){
  return SectionTable::table.at(sectionName);
}

void SectionTable::addSectionData(const std::string &sectionName, SectionData sectionData){
  SectionTable::table[sectionName]=sectionData;
}

void SectionTable::addSection(const std::string &sectionName){ //without data
  SectionTable::table[sectionName]=SectionData();
}
//size
unsigned int SectionTable::getSectionSize(const std::string &sectionName){
  return SectionTable::table.at(sectionName).size;
}

void SectionTable::setSectionSize(const std::string &sectionName, unsigned int newSize){
  SectionTable::table.at(sectionName).size=newSize;
}

//memAddr
unsigned int SectionTable::getSectionMemAddr(const std::string &sectionName){
  return SectionTable::table.at(sectionName).memAddr;
}
void SectionTable::setSectionMemAddr(const std::string &sectionName, unsigned int newMemAddr){
  SectionTable::table.at(sectionName).memAddr=newMemAddr;
}
//originFile
std::string SectionTable::getSectionOriginFile(const std::string &sectionName){
  return SectionTable::table.at(sectionName).originFile;
}
void SectionTable::setSectionOriginFile(const std::string &sectionName, std::string newOriginFile){
  SectionTable:;table.at(sectionName).originFile=newOriginFile;
}

//sectionEntries
void SectionTable::addSectionEntry(const std::string &sectionName, SectionEntry entry){
  SectionTable::table[sectionName].entries.push_back(entry);
  SectionTable::table[sectionName].size+=entry.size;
}

std::vector<SectionEntry> SectionTable::getSectionEntries(const std::string &sectioName){
  return SectionTable::table.at(sectioName).entries;
}
//data
std::vector<Data> SectionTable::getDataAtOffset(const std::string &sectionName, unsigned int offset, unsigned int size){
  std::vector<Data> result;
  for (auto &entry : SectionTable::table.at(sectionName).entries) {
    if(offset>=entry.offset && offset<(entry.offset + entry.size)){
      int cnt=0;
      while(cnt<size && cnt<(entry.size-offset+entry.offset)){  //don't go into the next entry to fetch data
        result.push_back(entry.data[offset-entry.offset+cnt++]);
      }
      break;
    }
  }
  return result;
}

void SectionTable::setDataAtOffset(const std::string &sectionName, unsigned int offset, unsigned int size, long newData, bool isData){
  //std::cout<<"Going through section entries until we find the right one. ("<<sectionName<<":"<<std::to_string(offset)<<"); Data = "<<std::to_string(newData)<<std::endl;
  for (auto &entry : SectionTable::table.at(sectionName).entries) {
    //std::cout<<"\tChecking entry: "<<sectionName<<":"<<std::to_string(entry.offset)<<"-"<<std::to_string(entry.offset + entry.size)<<std::endl;
    if(offset>=entry.offset && offset<(entry.offset + entry.size)){
      //std::cout<<"Found entry: "<<sectionName<<":"<<std::to_string(entry.offset)<<"-"<<std::to_string(entry.offset + entry.size)<<std::endl;
      if(isData){ //little endian (left <- right)
        //std::cout<<"Little endian (left <- right)"<<std::endl;
        int cnt=0;
        while(cnt<size && cnt<((int)entry.size-(int)offset+(int)entry.offset)){  //don't go into the next entry to set data
          entry.data[offset-entry.offset+cnt++]={(int)(newData >> 4) & 0xF, (int)(newData >> 0) & 0xF};
          //std::cout<<"Inserted data @"<<std::to_string(offset+cnt-1)<<": "<<std::to_string((int)(newData >> 4) & 0xF)<<std::to_string((int)(newData >> 0) & 0xF)<<std::endl;
          newData>>=8;
        }
      }
      else{ //big endian (left -> right)
        //std::cout<<"Big endian (left -> right)"<<std::endl;
        int cnt=size-1;
        while(cnt>=0 && cnt>=((int)entry.offset-(int)offset)){
          entry.data[offset-entry.offset+(size-cnt-1)]={(int)(newData >> (cnt*8+4)) & 0xF, (int)(newData >> (cnt*8)) & 0xF};
          //std::cout<<"Inserted data @"<<std::to_string(offset+size-cnt-1)<<": "<<std::to_string((int)(newData >> (cnt*8+4)) & 0xF)<<std::to_string((int)(newData >> (cnt*8)) & 0xF)<<std::endl;
          cnt--;
        }
      }
      break;
    }
  }
}

//print
void SectionTable::printToHelperTxt(const std::string &fileName){
  std::ofstream file;
  file.open(fileName, std::ios::app);  //append to file
  for(const auto& section: SectionTable::table){
    std::string sectionName = section.first;
    file<<"#"<<sectionName<<" ("<<std::dec<<section.second.size<<" B) @"<<section.second.memAddr<<", From file '"<<section.second.originFile<<"'";
    file<<"\n"<<std::setw(15)<<std::left<<"Offset"
        <<std::dec<<std::setw(15)<<std::left<<"Size"
        <<std::hex<<std::setw(15)<<std::left<<"Data"
        <<std::endl;
    
    for(const auto& entry: section.second.entries){
      if(entry.size!=0){
        file<<std::dec<<std::setw(15)<<std::left<<entry.offset
            <<std::dec<<std::setw(15)<<std::left<<entry.size;

      for(const auto& data: entry.data){
        file<<std::hex<<std::left<<data.hex1<<data.hex2<<" ";
      }
      file<<"\n";
      }
    }
  }
  file.close();
}