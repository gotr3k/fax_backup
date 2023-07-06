#include "../inc/AsSectionTable.hpp"
#include <iostream>
#include <fstream>
#include <iomanip>

//||=========================================================||
//||=========================================================||
//||=========================================================||
//||               SEC'S EXISTENTIAL DREAD                   ||
//||=========================================================||
//||=========================================================||
//||=========================================================||

bool SectionTable::sectionExists(const std::string &sectionName){
  return SectionTable::table.find(sectionName)!=SectionTable::table.end();
}

bool SectionTable::isEmpty(){
  return SectionTable::table.empty();
}

//||=========================================================||
//||=========================================================||
//||=========================================================||
//||                    SECTION ENTRIES                      ||
//||=========================================================||
//||=========================================================||
//||=========================================================||

SectionData SectionTable::getSectionData(const std::string &sectionName){
  return SectionTable::table.at(sectionName);
}

void SectionTable::addSectionEntry(const std::string &sectionName, SectionEntry entry){
  SectionTable::table[sectionName].entries.push_back(entry);
  SectionTable::table[sectionName].size+=entry.size;
}

void SectionTable::addSection(const std::string &sectionName){
  if(SectionTable::table.find(sectionName)==SectionTable::table.end())
    SectionTable::table[sectionName].size=0;
}

//||=========================================================||
//||=========================================================||
//||=========================================================||
//||                         DATA                            ||
//||=========================================================||
//||=========================================================||
//||=========================================================||

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

void SectionTable::setSectionDataAtOffset(const std::string &sectionName, unsigned int offset, unsigned int size, long newData){
  for (auto &entry : SectionTable::table.at(sectionName).entries) {
    if(offset>=entry.offset && offset<(entry.offset + entry.size)){
      int cnt=0;
      while(cnt<size && cnt<(entry.size-offset+entry.offset)){  //don't go into the next entry to fetch data
        entry.data[offset-entry.offset+cnt++]={(int)(newData >> 4) & 0xF, (int)(newData >> 0) & 0xF};
        newData>>=8;
      }
    }
  }
}

//||=========================================================||
//||=========================================================||
//||=========================================================||
//||                        PRINT                            ||
//||=========================================================||
//||=========================================================||
//||=========================================================||

void SectionTable::printToOutput(const std::string &fileName){
  std::ofstream file;
  file.open(fileName, std::ios::app);  //append to file
  for(const auto& section: SectionTable::table){
    if(section.second.size>0){
      std::string sectionName = section.first;
      file<<"#"<<sectionName<<" ("<<std::dec<<section.second.size<<" B)\n";
      int cnt=0;
      for(const auto& entry: section.second.entries){
        if(entry.size!=0){
          for(const auto& data: entry.data){
            file<<std::hex<<std::left<<data.hex1<<data.hex2<<" ";
            if(cnt==3)
              file<<" ";
            if(cnt++==7){
              file<<"\n";
              cnt=0;
            }
          }
        }
      }
      if(cnt!=0)
        file<<"\n";
    }
  }
  file.close();
}

void SectionTable::printToBinaryOutput(const std::string &fileName){
  std::ofstream file(fileName, std::ios::app | std::ios::binary);
  unsigned int numberOfSections = SectionTable::table.size();
  file.write((char *)&numberOfSections, sizeof(numberOfSections));    //total number of sections
  for(const auto &section: SectionTable::table){                      //for each section write:
    std::string sectionName=section.first;
    SectionData sectionData=section.second;
    unsigned int strLength=sectionName.length();                      //sectionName
    file.write((char *)(&strLength),sizeof(strLength));               //sectionName
    file.write(sectionName.c_str(), strLength);                       //sectionName
    file.write((char *)(&sectionData.size),sizeof(sectionData.size)); //sectionSize

    //entries
    unsigned int numberOfEntries = sectionData.entries.size();
    file.write((char *)&numberOfEntries, sizeof(numberOfEntries));  //number of entries
    for(const auto &entry: sectionData.entries){                    //for each entry write:
      file.write((char *)&entry.offset, sizeof(entry.offset));                //entry offset
      file.write((char *)&entry.size, sizeof(entry.size));                    //entry size
      file.write((char *)&entry.isData, sizeof(entry.isData));                //entry isData
      //data
      unsigned int numberOfDataEntries=entry.data.size();
      file.write((char *)&numberOfDataEntries, sizeof(numberOfDataEntries));  //size of data
      for(const auto &data: entry.data){                                      //for every data write:
        file.write((char *)&data.hex1, sizeof(data.hex1));                      //hex1
        file.write((char *)&data.hex2, sizeof(data.hex2));                      //hex2
      }
    }
  }
  file.close();
}

void SectionTable::printToHelperTxt(const std::string &fileName){
  std::ofstream file;
  file.open(fileName, std::ios::app);  //append to file
  for(const auto& section: SectionTable::table){
    std::string sectionName = section.first;
    file<<"#"<<sectionName<<" ("<<std::dec<<section.second.size<<" B)";
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