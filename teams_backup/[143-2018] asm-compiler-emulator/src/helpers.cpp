#include "../inc/helpers.h"
#include <iomanip>

std::string GetHexString(uword value)
{
  std::stringstream stream;
  stream << std::hex << value;
  std::string ret(stream.str());
  return ret;
}