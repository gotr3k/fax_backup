#pragma once

#include <iostream>
#include <fstream>
#include <iomanip>
#include <map>
#include "AsRelocTable.hpp"
#include "AsSectionTable.hpp"
#include "AsSymbolTable.hpp"
#include "AsRegexes.hpp"

class Assembler{
  private:
    //file stuff
    std::string inputFileName;
    std::string formattedInputFileName;
    std::string helperOutputFileName;
    std::string binaryOutputFileName;
    std::string outputFileName;
    std::vector<std::string> inputFileLines;
    std::vector<std::string> formattedInputFileLines;
    void writeLineToHelperOutputTxt(const std::string &line);
    std::ofstream helperOutputFileStream;
    
    //important internal assembler variables
    int lineCnt;
    int locationCnt;
    std::string currentSection;
    SymbolTable symbolTable;
    SectionTable sectionTable;
    RelocationTable relocTable;
    
    //error handling
    bool errorOccured;
    bool warningOccured;
    std::map<int, int> lineMap; //lines mapped between original input file and formatted input file - will be used for error display
    std::map<int, std::string> errorMap; //errors mapped between formatted input file line number and error msgs
    std::map<int, std::string> warningMap; //warnings mapped between formatted input file line number and error msgs
    void addError(const std::string &errorMsg); //errors which will be displayed in terminal
    void addWarning(const std::string &errorMsg); //warnings which will be displayed in terminal
    void printErrors();
    void printWarnings();
    void printResults();

    //conversions
    int getRegNumber(const std::string &reg);
    std::vector<std::string> splitString(const std::string &str, const char c);
    std::string stringToHex(const std::string &input);  //for ascii
    int stringToDec(const std::string &literal);
    std::string decToHex(int number, int size);
    
    //main logic parts
    bool formatInputFile();
    bool goThroughFormattedInputFile();  //goes through formatted input file and categorizes data
    bool goThroughFlinksAndRelocs();  //fixes stuff in tables
    void writeToOutputFiles();
    
    //process assembly directives and instructions
    bool processSection(const std::string &sectionName);
    bool processGlobal(const std::string &globalArgument);
    bool processExtern(const std::string &externArgument);
    bool processWord(const std::string &wordArgument);
    bool processSkip(const std::string &skipArgument);
    bool processAscii(const std::string &str);
    bool processEqu(const std::string &symbolName, const std::string &expr);
    bool processLabel(const std::string &labelName);
    bool processZeroOpIns(const std::string &instruction);
    bool processOneRegIns(const std::string &instruction, const std::string &reg);
    bool processTwoRegIns(const std::string &instruction, const std::string &regOne, const std::string &regTwo);
    bool processOneOpIns(const std::string &instruction, const std::string &operand);
    bool processOneRegOneOpIns(const std::string &instruction, const std::string &reg, const std::string &operand);
    int processAbsoluteAddr(const std::string &operand, int offsetInsideInstr);
    int processPCRelAddr(const std::string &operand, int offsetInsideInstr, int diffBetweenOffsetAndNextInstr);
  public:
    Assembler(const std::string &inputFileName, const std::string &outputFileName);
    void assemble();   
};
