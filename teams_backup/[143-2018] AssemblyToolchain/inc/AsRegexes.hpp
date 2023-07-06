#pragma once

#include <regex>
#include <string>

//file formatting rgxs
extern std::regex rgx_remove_comments;
extern std::regex rgx_reduce_multiple_spaces;
extern std::regex rgx_reduce_tabs;
extern std::regex rgx_reduce_spaces_around_commas;
extern std::regex rgx_reduce_spaces_around_colons;
extern std::regex rgx_insert_new_line_after_colon;
extern std::regex rgx_reduce_spaces_around_pluses;
extern std::regex rgx_reduce_bracket_start_spaces;
extern std::regex rgx_reduce_bracket_end_spaces;
extern std::regex rgx_reduce_line_start_spaces;
extern std::regex rgx_reduce_line_end_spaces;
extern std::regex rgx_line;

//symbols
extern std::string symbol;
extern std::regex rgx_symbol;

//literals
extern std::string literal_dec;
extern std::string literal_hex;
extern std::string literal_bin;
extern std::string literal;

extern std::regex rgx_literal_dec;
extern std::regex rgx_literal_hex;
extern std::regex rgx_literal_bin;
extern std::regex rgx_literal;

//registers
extern std::string register_;
extern std::regex rgx_register;

//directives
extern std::string list_of_symbols;
extern std::string list_of_literals;
extern std::string symbol_or_literal;
extern std::string list_of_symbols_or_literals;
extern std::string expression;
extern std::string string_;

extern std::regex rgx_global_dir;
extern std::regex rgx_extern_dir;
extern std::regex rgx_section_dir;
extern std::regex rgx_word_dir;
extern std::regex rgx_skip_dir;
extern std::regex rgx_ascii_dir;
extern std::regex rgx_equ_dir;
extern std::regex rgx_end_dir;

//labels
extern std::regex rgx_label;

//instructions
extern std::regex rgx_zero_op_ins;
extern std::regex rgx_one_reg_ins;
extern std::regex rgx_two_reg_ins;
extern std::regex rgx_one_op_ins;
extern std::regex rgx_one_reg_one_op_ins;

//load/store operands
extern std::regex rgx_addr_ld_str_immed;
extern std::regex rgx_addr_ld_str_memdir;
extern std::regex rgx_addr_ld_str_mempcrel;
extern std::regex rgx_addr_ld_str_regdir;
extern std::regex rgx_addr_ld_str_regind;
extern std::regex rgx_addr_ld_str_regdisp;

//jmp operands
extern std::regex rgx_addr_jmp_abs;
extern std::regex rgx_addr_jmp_pcrel;
extern std::regex rgx_addr_jmp_memdir;
extern std::regex rgx_addr_jmp_regdir;
extern std::regex rgx_addr_jmp_regind;
extern std::regex rgx_addr_jmp_regdisp;