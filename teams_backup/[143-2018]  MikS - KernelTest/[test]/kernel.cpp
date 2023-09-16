#include "types.h"
#include "gdt.h"
#include "port.h"
#include "interrupts.h"
#include "keyboard.h"
#include "stdio.h"
#include "string.h"
#include "apps/index.h"

typedef void (*constructor)();
extern "C" constructor start_ctors;
extern "C" constructor end_ctors;
extern "C" void callConstructors(){
	for (constructor* i = &start_ctors; i != &end_ctors; i++)
	{
		(*i)();
	}
}



extern "C" void kernelMain(void* multiboot_structure, unsigned int magicnumber){
	start:
	clrscr();
	makeFrame(0, 0,screenwidth, screenheight);

	gotoxy(2,10);
	centerprint("Welcome to OS");
	gotoxy(2,12);
	centerprint("By  Miodrag Rakonjac");
	gotoxy(2,14);
	
	makeFrame(15, 17,55, 21);
	gotoxy(20, 19);
	printf("Enter Your Password : ");

	string k;
	scanf(&k, 10);
	if (!strmatch(k, "a")){
		gotoxy(20, 19);
		printf("Wrong Password                 ");
		getch();
		// goto start;
	}

	clrscr();
	makeFrame(0, 0,screenwidth, screenheight);
	makeFrame(0, 0,screenwidth, 20);
	makeFrame(0, 0,screenwidth, 2);
	// makeFrame(0, 0, 20, screenheight);

	gotoxy(0, 1);
	centerprint("PamOS");

	gotoxy(2, 4);
	printf("1. New Bill");
	// leftprint("Transiction .1 ");
	gotoxy(2, 6);
	printf("2. Show Bill");
	gotoxy(2, 8);
	printf("3. Apps");
	gotoxy(2, 10);
	printf("4. Revinue");
	gotoxy(2, 12);
	printf("4. Settings");

	while(1);
}
