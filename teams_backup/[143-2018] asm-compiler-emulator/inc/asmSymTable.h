#include <unordered_map>
#include <vector>
#include <string>
#include "types.h"
#include <fstream>

namespace assembler
{
  enum SymType
  {
    NOTYP,
    SCTN
  };

  enum SymBind
  {
    GLOBAL, 
    LOCAL, 
    EXTERN
  };

  class SymTable 
  {
    private:
      struct Content
      {
        word value = 0;
        SymType type = SymType::NOTYP;
        SymBind bind = SymBind::LOCAL;
        std::string section;
        bool isKnown = false;
      };

      std::unordered_map<std::string, Content> m_Table;
      
      struct LocationInfo
      {
        std::string section;
        addressType address;
      };
      std::vector<std::pair<std::string, LocationInfo>> m_AdvancingTable;

    public:
      word GetSymbolValue(std::string name, std::string sec, addressType locationCounter);
      void RegisterGlobal(std::string name);
      void RegisterExtern(std::string name);
      void AssignValue(std::string name, word value, std::string section, bool isSection = false);
      std::vector<std::pair<std::string, LocationInfo>> GetAdvancingTable() { return m_AdvancingTable; };
      bool IsKnown(std::string name) { return m_Table[name].isKnown; }
      bool SymbolExist(std::string name) { return m_Table.find(name) != m_Table.end(); }
      void InsertIfNotExist(std::string name);
      bool IsUndefined();//call at the end, check if there is any undefined non-extern symbols
      std::vector<std::string> GetSections();
      inline Content GetSymbolInfo(std::string name) { return m_Table[name]; }
      void WriteTable(std::ofstream& file);
    private: //helpers
      std::string GetTypeString(SymType type);
      std::string GetBindString(SymBind bind);
      void FillUndefinedSections();
  };
}