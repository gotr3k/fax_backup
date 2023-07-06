#include "../inc/Em.hpp"
#include <sstream>
#include <iomanip>
#include <bitset>
#include <regex>

std::ostream& operator<<(std::ostream& out, Flag flag){
    const char* s = 0;
#define PROCESS_VAL(p) case(p): s = #p; break;
    switch(flag){
        PROCESS_VAL(Z);
        PROCESS_VAL(O);   
        PROCESS_VAL(C);     
        PROCESS_VAL(N);
        PROCESS_VAL(Tr);
        PROCESS_VAL(Tl);
        PROCESS_VAL(I);
    }
#undef PROCESS_VAL
    return out << std::string(s);
}

void Emulator::writeLineToHelperOutputTxt(const std::string &line){
    Emulator::helperOutputFileStream<<line<<std::endl;
}

void Emulator::printMemory(){
  Emulator::writeLineToHelperOutputTxt("\nCURRENT MEM. STATE:");
  int cnt=0;
  for(int i=0; i<Emulator::memory.size(); i++){
    if(cnt%8==0){ //print addresses
      Emulator::helperOutputFileStream<<std::hex<<std::setw(4)<<std::setfill('0')<<(cnt & 0xFFFF)<<": ";
    }
    Data data=memory[i];
    Emulator::helperOutputFileStream<<std::hex<<std::setw(2)<<std::setfill('0')<<(((data.hex1<<4)+data.hex2) & 0xFF)<<" ";
    cnt++;
    if(cnt%8==0){
      Emulator::helperOutputFileStream<<std::endl;
    }
  }
  Emulator::helperOutputFileStream<<std::endl;
 } 

bool Emulator::readDataFromInputFile(){
  Emulator::writeLineToHelperOutputTxt("READING DATA FROM INPUT FILE");
  std::ifstream inputFileStream(Emulator::inputFileName, std::ios::in | std::ios::binary);
  if(inputFileStream.fail()){
    Emulator::addError("Can't find file '"+std::regex_replace(Emulator::inputFileName, std::regex("_binary.o"), ".hex")+"'.");
    return false;
  }

  int numberOfSegments=0;
  inputFileStream.read((char *)&numberOfSegments, sizeof(numberOfSegments));
  for(int i=0; i<numberOfSegments; i++){
    Segment seg;
    inputFileStream.read((char *)&seg.startAddress, sizeof(seg.startAddress));
    inputFileStream.read((char *)&seg.size, sizeof(seg.size));
    //std::cout<<"\nSegment "<<std::to_string(i)<<"("<<seg.size<<"B) @"<<std::hex<<seg.startAddress<<std::dec<<std::endl;
    for(int j=0; j<seg.size; j++){
      int hex1=0;
      int hex2=0;
      inputFileStream.read((char *)&hex1, sizeof(hex1));
      inputFileStream.read((char *)&hex2, sizeof(hex2));
      //std::cout<<std::hex<<hex1<<hex2<<" ";
      // if(j%8==0 & j!=0){
      //   std::cout<<std::endl;
      // }
      seg.data.push_back({hex1,hex2});
    }
    Emulator::segments.push_back(seg);
  }
  return true;
}

bool Emulator::loadDataToMemory(){
  Emulator::writeLineToHelperOutputTxt("\nLOADING DATA TO MEMORY");
  for(auto &segment:Emulator::segments){
    if((segment.size+segment.startAddress) > MEMORY_MAPPED_REGISTERS){  //checked this in ld, but check again just to be sure
      Emulator::addError("Segment overlaps with memory mapped registers at "+std::to_string(MEMORY_MAPPED_REGISTERS));
      return false;
    }
    for(int i=0;i<segment.data.size(); i++){
      Emulator::memory[i+segment.startAddress]=segment.data[i];
    }
  }
  //Emulator::printMemory();
  return true;
}

void Emulator::printState(){
  std::cout<<"\n------------------------------------------------"<<std::endl;
  std::cout<<"Emulated processor executed halt instruction"<<std::endl;
  std::cout<<"Emulated processor state: psw=0b"<<std::bitset<8*sizeof(Emulator::rpsw)>(Emulator::rpsw)<<std::endl;
  std::cout<<"r0=0x"<<std::hex<<std::setw(4)<<std::setfill('0')<<Emulator::reg[Register::r0];
  std::cout<<"    r1=0x"<<std::hex<<std::setw(4)<<std::setfill('0')<<Emulator::reg[Register::r1];
  std::cout<<"    r2=0x"<<std::hex<<std::setw(4)<<std::setfill('0')<<Emulator::reg[Register::r2];
  std::cout<<"    r3=0x"<<std::hex<<std::setw(4)<<std::setfill('0')<<Emulator::reg[Register::r3]<<std::endl;
  std::cout<<"r4=0x"<<std::hex<<std::setw(4)<<std::setfill('0')<<Emulator::reg[Register::r4];
  std::cout<<"    r5=0x"<<std::hex<<std::setw(4)<<std::setfill('0')<<Emulator::reg[Register::r5];
  std::cout<<"    r6=0x"<<std::hex<<std::setw(4)<<std::setfill('0')<<Emulator::reg[Register::r6];
  std::cout<<"    r7=0x"<<std::hex<<std::setw(4)<<std::setfill('0')<<Emulator::reg[Register::r7]<<std::endl;
  std::cout<<"------------------------------------------------"<<std::endl;
}