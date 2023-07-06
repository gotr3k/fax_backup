#include <iostream>
#include <string.h>
#include <string>
#include "../inc/asmManager.h"
#include <fstream>

static bool OpenFile(int argc, char* argv[]);
static std::string outputFileName;
static std::string outputTextFileName = "asmOutput.txt";
extern FILE* yyin;

int main(int argc, char* argv[])
{
  if(OpenFile(argc, argv) == false)
  {
    std::cout<<"errors pri parsiranju argumenata!";
    return 1;
  }

  yydebug = 0;

  yyparse();
  //ASMManager.FillPrevUnknownValues(); - not needed, linker will overwrite it anyway
  ASMManager.UndefinedCheck();
  ASMManager.PatchRelocationTable();

  //open file for writing
  std::ofstream output("./" + outputTextFileName, std::ofstream::out);
  ASMManager.WriteOutputFile(output);
  
  return 0;
}

static bool OpenFile(int argc, char* argv[])
{
  if(argc == 1 || argc == 3 || argc > 4)
  {
    return false;
  }
  else if(argc == 2)
  {
    if(strcmp(argv[1], "-o") == 0)
    {
      return false;
    }
    yyin = fopen(argv[1], "r");
    outputFileName = argv[1];
    
    const size_t last_slash_idx = outputFileName.find_last_of("\\/");
    if (std::string::npos != last_slash_idx)
    {
        outputFileName.erase(0, last_slash_idx + 1);
    }

    // Remove extension if present.
    const size_t period_idx = outputFileName.rfind('.');
    if (std::string::npos != period_idx)
    {
        outputFileName.erase(period_idx);
    }
    outputFileName+=".o";
  }
  else //argc==4
  {
    if(strcmp(argv[1], "-o") != 0)
    {
      return false;
    }
    yyin = fopen(argv[3], "r");
    outputFileName = argv[2];
  }
  
  return true;
}