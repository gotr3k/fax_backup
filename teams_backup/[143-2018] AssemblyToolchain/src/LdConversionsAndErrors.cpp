#include "../inc/Ld.hpp"

void Linker::writeLineToHelperOutputTxt(const std::string &line){
  Linker::helperOutputFileStream<<line<<std::endl;
}

bool Linker::sectionsIntersect(unsigned int startAddrOne, unsigned int sizeOne, unsigned int startAddrTwo, unsigned int sizeTwo){
  return std::max(startAddrOne, startAddrTwo) < std::min(startAddrOne+sizeOne, startAddrTwo+sizeTwo);
}

void Linker::addError(const std::string &errorMsg){
  Linker::errorMessages.push_back(errorMsg);
  Linker::errorOccured=true;
}

void Linker::addWarning(const std::string &warningMsg){
  Linker::warningMessages.push_back(warningMsg);
  Linker::warningOccured=true;
}

void Linker::printErrors(){
  std::cout<<"Errors:"<<std::endl;
  for(auto err: Linker::errorMessages){
    std::cout<<err<<std::endl;
  }
}

void Linker::printWarnings(){
  std::cout<<"Warnings:"<<std::endl;
  for(auto warning: Linker::warningMessages){
    std::cout<<warning<<std::endl;
  }
}

void Linker::printResults(){
  if(Linker::errorOccured){
    std::cout<<"Failed to link input file(s)! Details below:"<<std::endl;
    Linker::printErrors();
  }
  else if(Linker::warningOccured){
    std::cout<<"Linked input file(s)!"<<std::endl;
    Linker::printWarnings();
  }
  else{
    std::cout<<"Linked input file(s) successfuly!"<<std::endl;
  }
}