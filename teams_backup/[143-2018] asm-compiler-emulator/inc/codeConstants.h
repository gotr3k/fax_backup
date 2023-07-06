#include "types.h"

enum InstructionTypes : ubyte //byte InstrDesc
{
  c_halt = 0b00000000, //c -> code
  c_int = 0b00010000, 
  c_iret = 0b00100000, 
  c_call = 0b00110000, 
  c_ret = 0b01000000, 
  c_jmp = 0b01010000, 
  c_jeq = 0b01010001, 
  c_jne = 0b01010010, 
  c_jgt = 0b01010011, 
  //push and pop commands can be implemented with other cmds
  c_xchg = 0b01100000, 
  c_add = 0b01110000, 
  c_sub = 0b01110001, 
  c_mul = 0b01110010, 
  c_div = 0b01110011, 
  c_cmp = 0b01110100, 
  c_not = 0b10000000, 
  c_and = 0b10000001, 
  c_or = 0b10000010, 
  c_xor = 0b10000011, 
  c_test = 0b10000100, 
  c_shl = 0b10010000, 
  c_shr = 0b10010001, 
  c_ldr = 0b10100000, 
  c_str = 0b10110000
};

enum AdressingMethod : ubyte //lower half of byte AddrMode
{
  c_imm = 0b0000, 
  c_regdir = 0b0001, 
  c_regdir_addition = 0b0101, 
  c_regind = 0b0010, 
  c_regind_addition = 0b0011, 
  c_mem = 0b0100
};

enum RegIndUpdate : ubyte //upper half of byte AddrMode
{
  c_noup = 0b0000, 
  c_sub2_before = 0b0001, 
  c_add2_before = 0b0010, 
  c_sub2_after = 0b0011, 
  c_add2_after = 0b0100, 
  c_not_used = 0b1111
};