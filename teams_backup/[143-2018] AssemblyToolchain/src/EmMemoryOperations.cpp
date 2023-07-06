#include "../inc/Em.hpp"

short Emulator::readFromMemory(uint offset, uint size, bool isData){
  offset&=0xFFFF;
  if(size==1){
    Emulator::helperOutputFileStream<<"Reading data from memory @0x"<<std::hex<<offset<<" = 0x"<<Emulator::memory[offset].get()<<std::endl;
    return Emulator::memory[offset].get();
  }

  if(isData){ //little endian (left <- right)
    Emulator::helperOutputFileStream<<"Reading data from memory [0x"<<std::hex<<offset+1<<", 0x"<<offset<<"] = (0x"<<Emulator::memory[offset+1].get()<<", 0x"<<Emulator::memory[offset].get()<<")"<<std::endl;
    return ((short)(Emulator::memory[offset+1].get()<<8)+Emulator::memory[offset].get());
  }
  else{ //big endian (left -> right)
    Emulator::helperOutputFileStream<<"Reading data from memory [0x"<<std::hex<<offset<<", 0x"<<offset+1<<"] = (0x"<<Emulator::memory[offset].get()<<", 0x"<<Emulator::memory[offset+1].get()<<")"<<std::endl;
    return ((short)(Emulator::memory[offset].get()<<8)+Emulator::memory[offset+1].get());
  }
}

void Emulator::writeToMemory(short value, uint offset, uint size, bool isData){
  offset&=0xFFFF;

  if(offset==TERM_OUT){ //if we are writing to term_out, display the data
    Emulator::writeLineToHelperOutputTxt("Outputing data from Mem(TERM_OUT) to display.");
    std::cout<<(char)value<<std::flush;
  }

  if(size==1){
    Emulator::helperOutputFileStream<<"Writing data to memory @0x"<<std::hex<<offset<<" = 0x"<<value<<std::endl;
    Emulator::memory[offset].set(value);
    return;
  }

  if(isData){ //little endian (left <- right)
    Emulator::helperOutputFileStream<<"Writing data to memory [0x"<<std::hex<<offset+1<<", 0x"<<offset<<"] = (0x"<<(short)(value>>8)<<", 0x"<<(value&0xFF)<<")"<<std::endl;
    Emulator::memory[offset].set(value & 0xFF);
    Emulator::memory[offset+1].set(value>>8);
  }
  else{ //big endian (left -> right)
    Emulator::helperOutputFileStream<<"Writing data to memory [0x"<<std::hex<<offset<<", 0x"<<offset+1<<"] = (0x"<<(value&0xFF)<<", 0x"<<(short)(value>>8)<<")"<<std::endl;
    Emulator::memory[offset].set(value>>8);
    Emulator::memory[offset+1].set(value & 0xFF);
  }
  return;
}

