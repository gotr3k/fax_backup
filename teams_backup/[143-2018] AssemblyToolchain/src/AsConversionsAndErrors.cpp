#include "../inc/As.hpp"

void Assembler::writeLineToHelperOutputTxt(const std::string &line){
  Assembler::helperOutputFileStream<<line<<std::endl;
}

//||=========================================================||
//||=========================================================||
//||=========================================================||
//||                      ERRORS                             ||
//||=========================================================||
//||=========================================================||
//||=========================================================||

void Assembler::addError(const std::string &errorMsg){
  if(Assembler::errorMap[Assembler::lineCnt]==""){
    Assembler::errorMap[Assembler::lineCnt]=errorMsg;
    Assembler::errorOccured=true;
  }
  else{
    Assembler::errorMap[Assembler::lineCnt].append("\n"+errorMsg);
  }
}

void Assembler::addWarning(const std::string &warningMsg){
  if(Assembler::warningMap[Assembler::lineCnt]==""){
    Assembler::warningMap[Assembler::lineCnt]=warningMsg;
    Assembler::warningOccured=true;
  }
  else{
    Assembler::warningMap[Assembler::lineCnt].append("\n"+warningMsg);
  }
}

void Assembler::printErrors(){
  std::cout<<"Errors:"<<std::endl;
  for(auto err: Assembler::errorMap){
    if(Assembler::lineMap[err.first]>0)
      std::cout<<"Line "<<Assembler::lineMap[err.first]<<":"<<Assembler::inputFileLines[Assembler::lineMap[err.first]-1]<<"\n"<<err.second<<std::endl;
    else
      std::cout<<err.second<<std::endl;
  }
}

void Assembler::printWarnings(){
  std::cout<<"Warnings:"<<std::endl;
  for(auto warning: Assembler::warningMap){
    if(Assembler::lineMap[warning.first]>0)
      std::cout<<"Line "<<Assembler::lineMap[warning.first]<<":"<<Assembler::inputFileLines[Assembler::lineMap[warning.first]-1]<<"\n"<<warning.second<<std::endl;
    else
      std::cout<<warning.second<<std::endl;
  }
}

void Assembler::printResults(){
  if(Assembler::errorOccured){
    std::cout<<"Failed to assemble input file "<<Assembler::inputFileName<<"! Details below:"<<std::endl;
    Assembler::printErrors();
  }
  else if(Assembler::warningOccured){
    std::cout<<"Assembled input file "<<Assembler::inputFileName<<"!"<<std::endl;
    Assembler::printWarnings();
  }
  else{
    std::cout<<"Assembled input file "<<Assembler::inputFileName<<" successfuly!"<<std::endl;
  }
}

//||=========================================================||
//||=========================================================||
//||=========================================================||
//||                     CONVERSIONS                         ||
//||=========================================================||
//||=========================================================||
//||=========================================================||

std::vector<std::string> Assembler::splitString(const std::string& str, const char c){ //from stack overflow :D
    std::vector<std::string> tokens;
    std::string::size_type pos = 0;
    std::string::size_type prev = 0;
    while ((pos = str.find(c, prev)) != std::string::npos) {
        tokens.push_back(str.substr(prev, pos - prev));
        prev = pos + 1;
    }
    tokens.push_back(str.substr(prev));
    return tokens;
}

std::string Assembler::stringToHex(const std::string& input){ //from stack overflow :D
    static const char hex_digits[] = "0123456789ABCDEF";
    std::string output;
    output.reserve(input.length() * 2);
    for(unsigned char c : input){
      c=std::toupper(c);
      output.push_back(hex_digits[c >> 4]);
      output.push_back(hex_digits[c & 15]);
    }
    return output;
}

std::string Assembler::decToHex(int number, int size){
  std::stringstream stream;
  stream << std::uppercase<<std::setfill('0')<<std::setw(size)<<std::hex << number;
  return stream.str().substr(stream.str().length()-size); 
}

int Assembler::stringToDec(const std::string &literal){
  if(std::regex_match(literal, rgx_literal_hex))
    return std::stoi(literal.substr(2),0,16);

  if(std::regex_match(literal, rgx_literal_dec))
    return std::stoi(literal);

  if(std::regex_match(literal, rgx_literal_bin))
    return std::stoi(literal.substr(2),0,2);

  return 0;
}

int Assembler::getRegNumber(const std::string &reg){
  if(reg=="sp")
    return 6;

  if(reg=="pc")
    return 7;

  if(reg=="psw")
    return 8;
  
  return reg.at(1)-'0';
}