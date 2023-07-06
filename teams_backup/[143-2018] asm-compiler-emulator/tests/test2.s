#forward adressing
.section mhm
.word a, b
.global b
.word 10
b:
.global b
.word b
a: .word 20, 12
.section hey
.word b, a, c
c: .word 122
.end