#include "HelperFunctions.h"
//#include <Windows.h>
//#include <conio.h>
#include <iostream>
//#include <vector>
//#include <chrono>
//#include <thread>

void setTextColor(WindowsConsoleTextColor color) {
	SetConsoleTextAttribute(GetStdHandle(STD_OUTPUT_HANDLE), color);
}

void setCursorXY(int x, int y) {
	COORD c;
	c.X = x;
	c.Y = y;
	SetConsoleCursorPosition(GetStdHandle(STD_OUTPUT_HANDLE), c);
}

COORD getCursorXY() {
    CONSOLE_SCREEN_BUFFER_INFO cbsi;
    if (GetConsoleScreenBufferInfo(GetStdHandle(STD_OUTPUT_HANDLE), &cbsi))
    {
        return cbsi.dwCursorPosition;
    }
    else
    {
        // The function failed. Call GetLastError() for details.
        COORD invalid = { 0, 0 };
        return invalid;
    }
}

void swap(int* x, int* y) {
	int temp = *x;
	*x = *y;
	*y = temp;
}

int getNumberOfElements() {
	int x = 0, y = getCursorXY().Y;
	int numberOfElements = 0;

	while (numberOfElements < 3 || numberOfElements > 20) {	//LATER Add user notification that input is invalid
		setCursorXY(x, y + 2);
		clearLine;
		std::cout << "Number of elements in an array [3-20]: ";
		std::cin >> numberOfElements;
	}

	return numberOfElements;
}

int getSortingSpeed() {
	int x = 0, y = getCursorXY().Y;
	int sortingSpeed = 0;

	while (sortingSpeed < 1 || sortingSpeed>5) {
		setCursorXY(x, y);
		clearLine;
		std::cout << "Sorting speed [1-5]: ";
		std::cin >> sortingSpeed;
	}

	return sortingSpeed;
}

void ShowConsoleCursor(bool showFlag){
	HANDLE out = GetStdHandle(STD_OUTPUT_HANDLE);

	CONSOLE_CURSOR_INFO     cursorInfo;

	GetConsoleCursorInfo(out, &cursorInfo);
	cursorInfo.bVisible = showFlag;			//Set the cursor visibility
	SetConsoleCursorInfo(out, &cursorInfo);
}