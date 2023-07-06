# file: logic.s

.global logicNot, logicAnd, logicOr, logicXor, logicTest, logicShl, logicShr

.section logic
logicNot:
  ldr r0, [r6 + 2]
  not r0
  ret

logicAnd:
  push r1
  ldr r0, [r6 + 4]
  ldr r1, [r6 + 6]
  and r0, r1
  pop r1
  ret

logicOr:
  push r1
  ldr r0, [r6 + 4]
  ldr r1, [r6 + 6]
  or r0, r1
  pop r1
  ret

logicXor:
  push r1
  ldr r0, [r6 + 4]
  ldr r1, [r6 + 6]
  xor r0, r1
  pop r1
  ret

logicTest:
  push r1
  ldr r0, [r6 + 4]
  ldr r1, [r6 + 6]
  test r0, r1
  pop r1
  ret

logicShl:
  push r1
  ldr r0, [r6 + 4]
  ldr r1, [r6 + 6]
  shl r0, r1
  pop r1
  ret

logicShr:
  push r1
  ldr r0, [r6 + 4]
  ldr r1, [r6 + 6]
  shr r0, r1
  pop r1
  ret
.end
