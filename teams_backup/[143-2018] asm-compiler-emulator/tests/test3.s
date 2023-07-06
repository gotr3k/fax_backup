#Operand syntax testing
.global a, c
.extern b
.section text
  jmp a
  jmp e
  jmp b
  jmp d
d: .word d
.section data
  .skip 8
e: .word e
  .word c
  .word bss
a: .word b
.section bss
c: .skip 8
.end