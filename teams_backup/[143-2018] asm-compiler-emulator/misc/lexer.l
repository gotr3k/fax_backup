%{
  #include "parser.h"
  #include <stdlib.h>
  #include <string.h>

  extern int yychar;
%}

%option noyywrap
%option yylineno
%option outfile="lexer.c" header-file="lexer.h"

%%

"#"[^\n]* { return T_COMMENT; }
\n { return T_NEWLINE; }
":" { return T_COLON; }
".global " { return T_DIR_GLOB; }
".extern " { return T_DIR_EXT; }
".section " { return T_DIR_SEC; }
".word " { return T_DIR_WORD; }
".skip " { return T_DIR_SKIP; }
".end" { return T_DIR_END; }
"," { return T_COMMA; }
"$" { return T_DOLLAR; }
"%" { return T_PERCENT; }
"*" { return T_ASTERISK; }
"[" { return T_SQ_BRACKET_L; }
"]" { return T_SQ_BRACKET_R; }

"halt" { return T_CMD_HALT; }
"int" { return T_CMD_INT; }
"iret" { return T_CMD_IRET; }
"call" { return T_CMD_CALL; }
"ret" { return T_CMD_RET; }
"jmp" { return T_CMD_JMP; }
"jeq" { return T_CMD_JEQ; }
"jne" { return T_CMD_JNE; }
"jgt" { return T_CMD_JGT; }
"push" { return T_CMD_PUSH; }
"pop" { return T_CMD_POP; }
"xchg" { return T_CMD_XCHG; }
"add" { return T_CMD_ADD; }
"sub" { return T_CMD_SUB; }
"mul" { return T_CMD_MUL; }
"div" { return T_CMD_DIV; }
"cmp" { return T_CMD_CMP; }
"not" { return T_CMD_NOT; }
"and" { return T_CMD_AND; }
"or" { return T_CMD_OR; }
"xor" { return T_CMD_XOR; }
"test" { return T_CMD_TEST; }
"shl" { return T_CMD_SHL; }
"shr" { return T_CMD_SHR; }
"ldr" { return T_CMD_LDR; }
"str" { return T_CMD_STR; }

"psw"|"r"[0-7] {
  size_t len = strnlen(yytext, 32);
	char* buf = (char*)malloc(len + 1);
	strncpy(buf, yytext, len);
	buf[len] = '\0';
	yylval.ident = buf;
  return T_REG;
}

[+-]?[1-9][0-9]*|0 { 
  yylval.num = atoi(yytext);
  return T_NUM; 
}
[+-]?"0"[xX][0-9A-F]+ { 
  yylval.num = strtol(yytext, nullptr, 16);
  return T_NUM; 
}
[a-zA-Z][0-9a-zA-Z_]* {
  size_t len = strnlen(yytext, 32);
	char* buf = (char*)malloc(len + 1);
	strncpy(buf, yytext, len);
	buf[len] = '\0';
	yylval.ident = buf;
  return T_IDENT;
}

"+" { return T_PLUS; }

. ;

%%

int yyerror(const char* msg)
{
    printf("lexer error: %s line: %d val: %c\n", msg, yylineno, (char)yychar);
    return 0;
}