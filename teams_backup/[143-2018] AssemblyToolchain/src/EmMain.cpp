#include "../inc/Em.hpp"
#include <iostream>

int main(int argc, const char *argv[]){
  std::string inputFile;

  if(argc!=2){
    std::cout<<"Error! Invalid emulator call.\nExactly one input file needs to be specified."<<std::endl;
    return 0;
  }

  inputFile=argv[1];

  if(inputFile.find_last_of(".")==std::string::npos){
    std::cout<<"Error! Please provide file with correct extension '.hex'."<<std::endl;
    return 0;
  }

  if(inputFile.substr(inputFile.find_last_of(".")+1)!="hex"){
    std::cout<<"Error! Input file with extension '"<<inputFile.substr(inputFile.find_last_of("."))<<"' is not valid."
    <<"\nPlease provide input file in correct '.hex' format."<<std::endl;
    return 0;
  }

  Emulator emulator(inputFile);
  emulator.emulate();
  return 0;
}