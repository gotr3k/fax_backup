package rs.ac.bg.etf.pp1;

import java_cup.runtime.Symbol;

%%

%{

	// ukljucivanje informacije o poziciji tokena
	private Symbol new_symbol(int type) {
		return new Symbol(type, yyline+1, yycolumn);
	}
	
	// ukljucivanje informacije o poziciji tokena
	private Symbol new_symbol(int type, Object value) {
		return new Symbol(type, yyline+1, yycolumn, value);
	}

%}

%cup
%line
%column

%xstate COMMENT

%eofval{
	return new_symbol(sym.EOF);
%eofval}

%%

" " 	{ }
"\b" 	{ }
"\t" 	{ }
"\r\n" 	{ }
"\f" 	{ }

//Keywords
"program"   { return new_symbol(sym.PROG, yytext()); }
"break"		{ return new_symbol(sym.BREAK, yytext()); }
"class"		{ return new_symbol(sym.CLASS, yytext()); }
"else"		{ return new_symbol(sym.ELSE, yytext()); }
"const"		{ return new_symbol(sym.CONST, yytext()); }
"if"		{ return new_symbol(sym.IF, yytext()); }
"while"		{ return new_symbol(sym.WHILE, yytext()); }
"new"		{ return new_symbol(sym.NEW, yytext()); }
"print"		{ return new_symbol(sym.PRINT, yytext()); }
"read"		{ return new_symbol(sym.READ, yytext()); }
"return"	{ return new_symbol(sym.RETURN, yytext()); }
"void"		{ return new_symbol(sym.VOID, yytext()); }
"extends"	{ return new_symbol(sym.EXTENDS, yytext()); }
"continue"	{ return new_symbol(sym.CONTINUE, yytext()); }
"foreach"	{ return new_symbol(sym.FOREACH, yytext()); }

//Special Characters
"{" 		{ return new_symbol(sym.LBRACE, yytext()); }
"}"			{ return new_symbol(sym.RBRACE, yytext()); }
";" 		{ return new_symbol(sym.SEMI, yytext()); }
"(" 		{ return new_symbol(sym.LPAREN, yytext()); }
")" 		{ return new_symbol(sym.RPAREN, yytext()); }
"[" 		{ return new_symbol(sym.LSQUAREBR, yytext()); }
"]" 		{ return new_symbol(sym.RSQUAREBR, yytext()); }

//Operators
"++" 		{ return new_symbol(sym.DBLPLUS, yytext()); }
"--"		{ return new_symbol(sym.DBLMINUS, yytext()); }
"+" 		{ return new_symbol(sym.PLUS, yytext()); }
"-"			{ return new_symbol(sym.MINUS, yytext()); }
"*"			{ return new_symbol(sym.STAR, yytext()); }
"/"			{ return new_symbol(sym.FWDSLASH, yytext()); }
"%"			{ return new_symbol(sym.PERC, yytext()); }
"=="		{ return new_symbol(sym.DBLEQ, yytext()); }
"!="		{ return new_symbol(sym.EXLEQ, yytext()); }
">"			{ return new_symbol(sym.GRT, yytext()); }
">="		{ return new_symbol(sym.GRTEQ, yytext()); }
"<"			{ return new_symbol(sym.LSS, yytext()); }
"<="		{ return new_symbol(sym.LSSEQ, yytext()); }
"&&"		{ return new_symbol(sym.DBLAMP, yytext()); }
"||"		{ return new_symbol(sym.DBLVER, yytext()); }
","			{ return new_symbol(sym.COMMA, yytext()); }
"="			{ return new_symbol(sym.EQUAL, yytext()); }

"true" { return new_symbol(sym.BOOL, true); }
"false" { return new_symbol(sym.BOOL, false); }

<YYINITIAL> "//" 		     { yybegin(COMMENT); }
<COMMENT> .      { yybegin(COMMENT); }
<COMMENT> "\r\n" { yybegin(YYINITIAL); }

[0-9]+  { return new_symbol(sym.NUMBER, new Integer (yytext())); }
([a-z]|[A-Z])[a-z|A-Z|0-9|_]* 	{return new_symbol (sym.IDENT, yytext()); }
"'"[ -~]"'" { return new_symbol(sym.CHAR, new Character(yytext().charAt(1))); }

. { System.err.println("Leksicka greska ("+yytext()+") u liniji "+(yyline+1)); }






