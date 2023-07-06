#pragma once

#include <regex>
#include <string>

std::string symbol="[a-zA-Z][a-zA-Z0-9_]*";
std::string hexAddr="0[xX][0-9a-fA-F]+";
std::string decAddr="[0-9]+";

std::regex rgx_hexAddr(hexAddr);
std::regex rgx_decAddr(decAddr);
std::regex rgx_placeAt("-place=("+symbol+")@("+hexAddr+"|"+decAddr+")");