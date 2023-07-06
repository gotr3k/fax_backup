#pragma once

#include "LdSymbolTable.hpp"
#include "LdSymbolTablesForAllAsFiles.hpp"
#include "LdRelocTable.hpp"
#include "LdRelocTablesForAllAsFiles.hpp"
#include "LdSectionTable.hpp"
#include "LdSectionTablesForAllAsFiles.hpp"
#include <fstream>

class Linker{
  private:
    //file stuff
    std::vector<std::string> inputFileNames;
    std::string helperOutputFileName;
    std::string outputFileName;
    std::string outputBinaryFileName;
    void writeLineToHelperOutputTxt(const std::string &line);
    std::ofstream helperOutputFileStream;
    
    //important internal assembler variables
    //int lineCnt;
    //int locationCnt;
    std::string currentSection;
    std::string currentFileName;
    unsigned int highestAddress;
    SymbolTablesForAllAsFiles symbolTablesForAllFiles;
    SectionTablesForAllAsFiles sectionTablesForAllFiles;
    RelocTablesForAllAsFiles relocationTablesForAllFiles;
    SymbolTable globalSymbolTable;
    SectionTable globalSectionTable;
    RelocationTable globalRelocTable;
    std::unordered_map<std::string, unsigned int> placeSectionAt;  //map for saving user -placeAt input
    bool isRelocatable;

    //error handling
    bool errorOccured;
    bool warningOccured;
    void addError(const std::string &errorMsg); //errors which will be displayed in terminal
    void addWarning(const std::string &errorMsg); //warnings which will be displayed in terminal
    std::vector<std::string> errorMessages;
    std::vector<std::string> warningMessages;
    void printErrors();
    void printWarnings();
    void printResults();

    //main logic parts
    bool readFromInputFiles();  //goes through formatted input file and categorizes data
    bool calculatePlaceAtSectionAddresses();
    bool calculateAllSectionAddresses();
    void calculateSymbolOffsets();
    void calculateRelocOffsetsAndAddends();
    void calculateRelocsHex(); //if -hex option is used
    void calculateRelocsRelocatable(); //if -relocateable option is used (misspelled in the document)
    void writeToOutputFiles();
    void writeToTxtFile();
    void writeToBinaryFile();
    void printInputTables();
    void printHelperOutputTables();
    //create global tables
    bool createGlobalSymbolTable();
    bool createGlobalSectionTable();
    bool createGlobalRelocTable();

    //helper stuff
    bool sectionsIntersect(unsigned int startAddrOne, unsigned int sizeOne, unsigned int startAddrTwo, unsigned int sizeTwo);
  public:
    unsigned int memoryMappedRegisters; //unavailable locations (0xFF00 - 0xFFFF)
    Linker(std::vector<std::string> inputFileNames, const std::string &outputFileName, std::unordered_map<std::string, unsigned int> placeAt, bool isRelocatable=false);
    void link();
};