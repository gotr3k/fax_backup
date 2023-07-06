# file: main.s

.global my_start, my_counter

.section my_code
my_start:
  ldr r6, $0xFEFE # init SP
wait:
  ldr r0, my_counter
  ldr r1, $1
  cmp r0, r1
  jne wait
  pop r2
  pop r2
  halt

.section my_data
my_counter:
.word 0

.end
