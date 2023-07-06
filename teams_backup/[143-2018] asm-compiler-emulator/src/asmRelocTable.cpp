#include "../inc/asmRelocTable.h"
#include "../inc/helpers.h"

namespace assembler
{
  void RelocationTable::RegisterRelocation(std::string section, addressType off, RelocType type, std::string sym, byte add)
  {
    Content info;
    info.offset = off;
    info.type = type;
    info.symbol = sym;
    info.addent = add;
    m_Table[section].push_back(info);
  }

  void RelocationTable::WriteTable(std::ofstream& file, std::string sctn)
  {
    file<<"Offset\tType\tSymbol\tAddent\n";
    for(auto it : m_Table[sctn])
    {
      file<<GetHexString(it.offset)<<"\t"
        <<GetTypeString(it.type)<<"\t"
        <<it.symbol<<"\t"
        <<GetHexString(it.addent)<<"\n";
    }
  }

  std::string RelocationTable::GetTypeString(RelocType type)
  {
    switch (type)
    {
    case RelocType::r_pc :
      return "R_PC";
    case RelocType::r_word :
      return "R_WORD";
    default:
      return "Error";
    }
  }
}