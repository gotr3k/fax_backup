#include "../inc/Em.hpp"

void Emulator::addError(const std::string &errorMsg){
  Emulator::errorMessages.push_back(errorMsg);
  Emulator::errorOccured=true;
}

void Emulator::addWarning(const std::string &warningMsg){
  Emulator::warningMessages.push_back(warningMsg);
  Emulator::warningOccured=true;
}

void Emulator::printErrors(){
  std::cout<<"Errors:"<<std::endl;
  for(auto err: Emulator::errorMessages){
    std::cout<<err<<std::endl;
  }
}

void Emulator::printWarnings(){
  std::cout<<"Warnings:"<<std::endl;
  for(auto warning: Emulator::warningMessages){
    std::cout<<warning<<std::endl;
  }
}

void Emulator::printResults(){
  Emulator::printState();
  if(Emulator::errorOccured){
    std::cout<<"Failed to emulate input file! Details below:"<<std::endl;
    Emulator::printErrors();
  }
  else if(Emulator::warningOccured){
    std::cout<<"Emulated input file!"<<std::endl;
    Emulator::printWarnings();
  }
  else{
    std::cout<<"Emulated input file successfuly!"<<std::endl;
  }
  
}