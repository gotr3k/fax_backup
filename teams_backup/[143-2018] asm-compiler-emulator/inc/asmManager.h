#include "asmSymTable.h"
#include "asmRelocTable.h"
#include "../parser.h"
#include "codeConstants.h"
#include <fstream>

#define ASMManager assembler::Manager::GetInstance()
#define OP_SYNTAX assembler::OperandSyntax

namespace assembler
{
  enum OperandSyntax
  {
    unknown = 0, 
    noPrefixLiteral = 1, 
    noPrefixSymbol = 2, 
    dollarLiteral = 3, 
    dollarSymbol = 4, 
    percentSymbol = 5, 
    noPrefixReg = 6, 
    bracketReg = 7, 
    bracketRegLiteral = 8, 
    bracketRegSymbol = 9, 
    asteriskLiteral = 10, 
    asteriskSymbol = 11, 
    asteriskReg = 12, 
    asteriskBracketReg = 13, 
    asteriskBracketRegLiteral = 14, 
    asteriskBracketRegSymbol = 15
  };

  class Manager
  {
    private:
      Manager();
      static Manager* inst;

      SymTable m_SymbolTable;
      addressType m_LocationCounter = 0;
      std::unordered_map<std::string, std::vector<ubyte>> m_MachineCode; 
      std::string m_CurrSection;
      //bool -> isSym
      using argInfo = std::pair<std::string, bool>;
      std::vector<argInfo> m_CurrArgs;
      std::vector<std::string> m_CurrLabels;

      addressType m_PrevLocation = 0; //for same line label, ali samo kada je uz to direktiva koja sadrzi sadrzaj
      bool m_IsContentOp = false;

      RelocationTable m_RelocationTable; 

      std::vector<std::string> m_Sections;

    public:
      static Manager& GetInstance();

      //Assembly directives
      void ProcessLabel(std::string name);
      void ProcessSameLineLabel(std::string name);
      void ProcessGlobal();
      void ProcessExtern();
      void ProcessSection(std::string name);
      void ProcessWord();
      void ProcessSkip(int literal);
      void ProcessEnd();

      void RegisterSymArg(std::string arg);
      void RegisterNumArg(int arg);

      //Assembly commands
      void ProcessHalt();
      void ProcessInt(std::string regD);
      void ProcessIret();
      void ProcessCall(operandInfo op);
      void ProcessRet();
      void ProcessJmp(operandInfo op);
      void ProcessJeq(operandInfo op);
      void ProcessJne(operandInfo op);
      void ProcessJgt(operandInfo op);
      void ProcessPush(std::string regD);
      void ProcessPop(std::string regD);
      void ProcessXchg(std::string regD, std::string regS);
      void ProcessAdd(std::string regD, std::string regS);
      void ProcessSub(std::string regD, std::string regS);
      void ProcessMul(std::string regD, std::string regS);
      void ProcessDiv(std::string regD, std::string regS);
      void ProcessCmp(std::string regD, std::string regS);
      void ProcessNot(std::string regD);
      void ProcessAnd(std::string regD, std::string regS);
      void ProcessOr(std::string regD, std::string regS);
      void ProcessXor(std::string regD, std::string regS);
      void ProcessTest(std::string regD, std::string regS);
      void ProcessShl(std::string regD, std::string regS);
      void ProcessShr(std::string regD, std::string regS);
      void ProcessLdr(std::string regD, operandInfo op);
      void ProcessStr(std::string regD, operandInfo op);

      //Cleanup
      void FillPrevUnknownValues();
      void UndefinedCheck();
      void PatchRelocationTable();

      void WriteOutputFile(std::ofstream& file);

      inline void AddSection(std::string sctn) { m_Sections.push_back(sctn); }

    private: //helper functions
      void InsertWord(std::string secName, addressType locCounter, word value);
      void AssignLabels();
      void UnpackStrings(operandInfo& op, std::string& symbol, std::string& reg);
      ubyte RegNameToIndex(std::string reg);
      ubyte CreateByte(ubyte up_4b, ubyte low_4b);
      void ProcessJumpInstruction(InstructionTypes jumpType, operandInfo op);
      void ProcessDataInstruction(InstructionTypes instrType, std::string regD, operandInfo op);
      void WriteMachineCode(std::ofstream& file, std::string sctn);
      bool IsNumInRange(int num, bool isSigned);
      bool IsDefinedSection() { return m_CurrSection != "undefined"; }
  };
}