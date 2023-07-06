#pragma once

#include "HelperFunctions.h"
#include <string>

class Menu {
private:
	const WindowsConsoleTextColor defaultColor;
	const WindowsConsoleTextColor highlightColor;
	const char* menuName;
	const int numberOfMenuItems;
	const char** menuItems;
	int counter;
	void moveDown();
	void moveUp();
public:
	Menu(const char* menuName,
		const int numberOfMenuItems,
		const char** menuItems,
		const WindowsConsoleTextColor defaultColor = WHITE,
		const WindowsConsoleTextColor highlightColor = RED );
	int showMenu();
	~Menu();
};