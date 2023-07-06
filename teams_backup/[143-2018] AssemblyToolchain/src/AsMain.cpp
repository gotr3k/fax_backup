#include "../inc/As.hpp"

int main(int argc, const char *argv[]){
  std::string outputFile, inputFile;

  if(argc!=4){
    std::cout<<"Error! Invalid asembler call!"
    <<"\nProvide input in format: 'assembler -o <output_file_name> <input_file_name>'"<<std::endl;
    return 0;
  }
  else if(strcmp(argv[1],"-o")==0){
    outputFile=argv[2];
    inputFile=argv[3];
  }
  else if(strcmp(argv[2],"-o")==0){
    inputFile=argv[1];
    outputFile=argv[3];
  }
  else{
    std::cout<<"Error! Invalid asembler call."
    <<"\nProvide input in format: 'assembler -o <output_file_name> <input_file_name>'"<<std::endl;
    return 0;
  }

  if(inputFile.find_last_of(".")==std::string::npos || outputFile.find_last_of(".")==std::string::npos){
    std::cout<<"Error! Please provide files with correct extensions."<<std::endl;
    return 0;
  }

  if(inputFile.substr(inputFile.find_last_of(".")+1)!="s"){
    std::cout<<"Error! Input file with extension '"<<inputFile.substr(inputFile.find_last_of("."))<<"' is not valid."
    <<"\nPlease provide input file in correct format."<<std::endl;
    return 0;
  }

  if(outputFile.substr(outputFile.find_last_of(".")+1)!="o"){
    std::cout<<"Error! Output file with extension '"<<outputFile.substr(outputFile.find_last_of("."))<<"' is not valid."
    <<"\nPlease provide output file in correct format."<<std::endl;
    return 0;
  }

  Assembler as(inputFile, outputFile);
  as.assemble();

  return 0;
}