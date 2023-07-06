#include "../inc/AsRegexes.hpp"

std::regex rgx_remove_comments("#.*");
std::regex rgx_reduce_multiple_spaces(" {2,}");
std::regex rgx_reduce_tabs("\\t+");
std::regex rgx_reduce_spaces_around_commas(" *, *");
std::regex rgx_reduce_spaces_around_colons(" *: *");
std::regex rgx_insert_new_line_after_colon("(.+:)(.+)");
std::regex rgx_reduce_spaces_around_pluses(" *\\+ *");
std::regex rgx_reduce_bracket_start_spaces("\\[ *");
std::regex rgx_reduce_bracket_end_spaces(" *\\]");
std::regex rgx_reduce_line_start_spaces("^( *)");
std::regex rgx_reduce_line_end_spaces("( *)$");
std::regex rgx_line("(.+)"); //check

//symbols
std::string symbol="[a-zA-Z][a-zA-Z0-9_]*";
std::regex rgx_symbol("("+symbol+")");

//literals
std::string literal_dec="-?[0-9]+";
std::string literal_hex="0x[0-9a-fA-F]+";
std::string literal_bin="0b[0-1]+";
std::string literal=literal_dec+"|"+literal_hex+"|"+literal_bin;

std::regex rgx_literal_dec("("+literal_dec+")");
std::regex rgx_literal_hex("("+literal_hex+")");
std::regex rgx_literal_bin("("+literal_bin+")");
std::regex rgx_literal("("+literal+")");

//registers
std::string register_="r[0-7]|pc|sp|psw";
std::regex rgx_register("("+register_+")");

//directives
std::string list_of_symbols="("+symbol+"(,"+symbol+")*)";
std::string list_of_literals=literal+"(,"+literal+")*";
std::string symbol_or_literal="("+symbol+"|"+literal+")";
std::string list_of_symbols_or_literals="("+symbol_or_literal+"(,"+symbol_or_literal+")*)";
std::string expression=".+";  //DO LATER
std::string string_="\"[^\"]*\"";

std::regex rgx_global_dir("^\\.global "+list_of_symbols+"$");
std::regex rgx_extern_dir("^\\.extern "+list_of_symbols+"$");
std::regex rgx_section_dir("^\\.section ("+symbol+")$");
std::regex rgx_word_dir("^\\.word "+list_of_symbols_or_literals+"$");
std::regex rgx_skip_dir("^\\.skip ("+literal+")$");
std::regex rgx_ascii_dir("^\\.ascii ("+string_+")$");
std::regex rgx_equ_dir("^\\.equ ("+symbol+"),("+expression+")$");
std::regex rgx_end_dir("^\\.end$");

//labels
std::regex rgx_label("^"+symbol+":");

//instructions
std::regex rgx_zero_op_ins("^(halt|iret|ret)$");
std::regex rgx_one_reg_ins("^(int|push|pop|not) ("+register_+")$");
std::regex rgx_two_reg_ins("^(xchg|add|sub|mul|div|cmp|and|or|xor|test|shl|shr) ("+register_+"),("+register_+")$");
std::regex rgx_one_op_ins("^(call|jmp|jeq|jne|jgt) (.+)$");
std::regex rgx_one_reg_one_op_ins("^(ldr|str) ("+register_+"),(.+)$");

//load/store operands CHECK THESE
std::regex rgx_addr_ld_str_immed("\\$"+symbol_or_literal+"$");
std::regex rgx_addr_ld_str_memdir(symbol_or_literal+"$");
std::regex rgx_addr_ld_str_mempcrel("%("+symbol+")$");
std::regex rgx_addr_ld_str_regdir("("+register_+")$");
std::regex rgx_addr_ld_str_regind("\\[("+register_+")\\]$");
std::regex rgx_addr_ld_str_regdisp("\\[("+register_+")\\+"+symbol_or_literal+"\\]$");

//jmp operands CHECK THESE
std::regex rgx_addr_jmp_abs(symbol_or_literal+"$");
std::regex rgx_addr_jmp_pcrel("%("+symbol+")$");
std::regex rgx_addr_jmp_memdir("\\*("+symbol_or_literal+")$");
std::regex rgx_addr_jmp_regdir("\\*("+register_+")$");
std::regex rgx_addr_jmp_regind("\\*\\[("+register_+")\\]$");
std::regex rgx_addr_jmp_regdisp("\\*\\[("+register_+")\\+"+symbol_or_literal+"\\]$");