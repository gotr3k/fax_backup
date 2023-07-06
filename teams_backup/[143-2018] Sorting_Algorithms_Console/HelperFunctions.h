#pragma once

#include <Windows.h>

#define clearLine std::cout << "\33[2K\r";
#define clearConsole \
	setTextColor(WHITE); \
	system("cls");

typedef enum{
	GRAY = 8,
	BLUE = 9,
	GREEN = 10,
	CYAN = 11,
	RED = 12,
	PINK = 13,
	YELLOW = 14,
	WHITE = 15
}WindowsConsoleTextColor;

typedef enum {
	UP = 72,
	DOWN = 80,
	ENTER = '\r'
}WindowsCharCode;

struct Algorithm {
	short number;
	const char* name;
	Algorithm() : number{ 0 }, name{ "" }
	{
		//Empty
	}

	Algorithm(short _number, const char* _name) : number{ _number }, name{_name}
	{
		//Empty
	}
};

void setTextColor(WindowsConsoleTextColor color);
void setCursorXY(int x, int y);
COORD getCursorXY();
void swap(int* x, int* y);
int getNumberOfElements();
int getSortingSpeed();
void ShowConsoleCursor(bool showFlag);