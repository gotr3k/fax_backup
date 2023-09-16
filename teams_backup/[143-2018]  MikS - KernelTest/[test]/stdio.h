#ifndef __STDIO_H
#define __STDIO_H
#include "string.h"

	static uint32_t x = 0, y = 0;
	static uint32_t screenwidth = 79, screenheight = 24;
	void gotoxy(uint32_t x_0, uint32_t y_0);
	string tochar(uint8_t val);
	void clrscr();
	void printchar(char chr);
	void printf(string str);
	void centerprint(string str);
	void leftprint(string str);
	void makeFrame(uint32_t startx, uint32_t starty,uint32_t width, uint32_t height);
	string getch();
	void scanf(string *a, uint32_t max_len);

	void gotoxy(uint32_t x_0, uint32_t y_0){
		x = x_0;
		y = y_0;
	}
	string tochar(uint8_t val){	
		string foo = "00";
		string hex = "0123456789ABCDEF";

		foo[0] = hex[(val >> 4) & 0xF];
		foo[1] = hex[val & 0xF];

		return foo;
	}
	void clrscr(){
		unsigned short* VideoMemory = (unsigned short*)0xb8000;
		for(y = 0; y < 25; y++){
				for(x = 0; x < 80; x++){
					VideoMemory[80*y+x] = (VideoMemory[80*y+x] & 0xFF00) | ' ';
				}
			}
			x = 0;
			y = 0;
	}

	void printf(string str){
		unsigned short* VideoMemory = (unsigned short*)0xb8000;
		for (int i = 0; str[i] != '\0'; ++i){
			printchar(str[i]);
		}
	}
	void printchar(char chr){
		unsigned short* VideoMemory = (unsigned short*)0xb8000;
		switch(chr){
			case '\n':
				x = 0;
				y++;
				break;
			default:
				VideoMemory[80*y+x] = (VideoMemory[80*y+x] & 0xFF00) | chr;
				x++;
				break;
		}
		if(x >= 81){
			x = 0;
			y++;
		}

		if(y >= 25){
			for(y = 0; y < 25; y++){
				for(x = 0; x < 80; x++){
					VideoMemory[80*y+x] = (VideoMemory[80*y+x] & 0xFF00) | ' ';
				}
			}
			x = 0;
			y = 0;
		}

	}

	void centerprint(string str){
		uint8_t len = strlen(str)/2;
		x = screenwidth/2 - len;
		printf(str);
	}
	void leftprint(string str){
		uint8_t len = strlen(str);
		x = screenwidth - len;
		printf(str);
	}

	void makeFrame(uint32_t startx, uint32_t starty, uint32_t width, uint32_t height){
		int i, j;
		gotoxy(startx, starty);
		for (i = starty; i <= height; i++)
		{
			for (j = 0; j <= width; j++)
			{
				if (i == starty){
					if(j == 0)
						printchar('+'); //0xC9
					else if(j == width)
						printchar('+'); //0xBB
					else
						printchar('-'); //0xCD
				}else if (i == height){
					if(j == 0)
						printchar('+'); //0xC8
					else if(j == width)
						printchar('+'); //0xBC
					else
						printchar('-'); //0xCD
				}else if(j == 0 || j == width){
						printchar('|'); //0xBA
				}else{
					printf(" ");
				}
			}
			if(i<height)
				gotoxy(startx, i+1);
				// printf("\n");
		}
	}

	string getch(){
		GlobalDescriptorTable gdt;
		InterruptManager interrupts(0x20, &gdt);
		KeyboardDriver keyboard(&interrupts);

		interrupts.Activate();
		while(1){
			if (keyboard.key != 0xFA){
				keyboard.key = 0xFA;
				interrupts.Deactivate();
				return keyboard.keyfig;
			}
		}
	}
	void scanf(string *a, uint32_t max_len){
		char *tmpstr;
		int i = 0;
		for (i = 0; i <= max_len; i++)
		{
			string tmp = getch();
			if (tmp[0] == '\n'){
				break;
			}
			for (int j = 0; tmp[j] != '\0'; ++j){
				printchar(tmp[j]);
				tmpstr[i] = tmp[j];
			}
		}
		printf("\n");
		tmpstr[i] = '\0';
		*a = tmpstr;
	}

#endif