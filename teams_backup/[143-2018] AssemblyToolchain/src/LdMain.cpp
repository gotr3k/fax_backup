#include "../inc/Ld.hpp"
#include "../inc/LdRegexes.hpp"
#include <iostream>

int main(int argc, const char *argv[]){
  std::vector<std::string> inputFileNames;
  std::string outputFileName;
  bool readOutputFileFlag=false;
  bool hasOutputFile=false;
  bool placeAtFlag=false;
  std::smatch regexMatcher;
  bool hexFlag=false;
  bool relocatableFlag=false;
  std::unordered_map<std::string, unsigned int> placeAt;
  std::string currArg;
  for(int i=1;i<argc;i++){
    currArg=argv[i];
    if(currArg=="-o"){
      readOutputFileFlag=true;
    }
    else if(std::regex_search(currArg,regexMatcher,rgx_placeAt)){
      placeAtFlag=true;
      std::string section=regexMatcher.str(1);
      std::string strAddr=regexMatcher.str(2);
      unsigned int intAddr;
      if(std::regex_match(strAddr, rgx_hexAddr)){
        intAddr=std::stoi(strAddr,nullptr,16);
      }
      else if(std::regex_match(strAddr, rgx_decAddr)){
        intAddr=std::stoi(strAddr);
      }
      placeAt.insert({section,intAddr});
    }
    else if(currArg=="-hex"){
      if(hexFlag==true){
        std::cout<<"Error. Multiple -hex options detected.";
        return 0;
      }
      if(relocatableFlag==true){
        std::cout<<"Error. Can't use -hex and and -relocatable options together.";
        return 0;
      }
      hexFlag=true;
    }
    else if(currArg=="-relocatable"){
      if(relocatableFlag==true){
        std::cout<<"Error. Multiple -relocatable options detected.";
        return 0;
      }
      if(hexFlag==true){
        std::cout<<"Error. Can't use -hex and and -relocatable options together.";
        return 0;
      }
      relocatableFlag=true;
    }
    else if(readOutputFileFlag==true){
      if(hasOutputFile==true){
        std::cout<<"Error. Multiple -o options detected."<<std::endl;
        return 0;
      }

      if(currArg.find_last_of(".")==std::string::npos){
        std::cout<<"Error! Please provide output file with correct '.hex' extension."<<std::endl;
        return 0;
      }

      if(currArg.substr(currArg.find_last_of(".")+1)!="hex"){
        std::cout<<"Error! Output file with extension '"<<currArg.substr(currArg.find_last_of("."))<<"' is not valid."
        <<"\nPlease provide output file in correct format."<<std::endl;
        return 0;
      }

      outputFileName=currArg;
      readOutputFileFlag=false;
      hasOutputFile=true;
    }
    else{ //input files

      if(currArg.find_last_of(".")==std::string::npos){
        std::cout<<"Error! Please provide input files with correct '.o' extension."<<std::endl;
        return 0;
      }

      if(currArg.substr(currArg.find_last_of(".")+1)!="o"){
        std::cout<<"Error! Input file with extension '"<<currArg.substr(currArg.find_last_of("."))<<"' is not valid."
        <<"\nPlease provide input file in correct format."<<std::endl;
        return 0;
      }

      inputFileNames.push_back(currArg);
    }
  }

  if(hexFlag==false && relocatableFlag==false){
    std::cout<<"Error. Must use either -hex or -relocatable option.";
    return 0;
  }

  Linker ld(inputFileNames, outputFileName, placeAt, relocatableFlag);
  ld.link();
  return 0;
}