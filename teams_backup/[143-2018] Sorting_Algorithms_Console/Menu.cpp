#include "Menu.h"
#include <iostream>
#include <conio.h>

Menu::Menu(const char* _menuName,
	const int _numberOfMenuItems,
	const char** _menuItems,
	const WindowsConsoleTextColor _defaultColor,
	const WindowsConsoleTextColor _highlightColor)
	: menuName{ _menuName },
	numberOfMenuItems{ _numberOfMenuItems },
	defaultColor{ _defaultColor },
	highlightColor{ _highlightColor },
	menuItems{ new const char* [numberOfMenuItems] },
	counter{ 0 }{
	for (int i = 0; i < numberOfMenuItems; i++) {
		menuItems[i] = _menuItems[i];
	}
}

void Menu::moveDown() {
	counter = (counter + 1) % numberOfMenuItems;
}
void Menu::moveUp() {
	counter = (counter == 0) ? numberOfMenuItems - 1 : counter - 1;	//doesn't work with modulo like moveDown()
}

int Menu::showMenu() {
	setTextColor(WHITE);
	std::cout << menuName;
	while (true) {
		for (int i = 0; i < numberOfMenuItems; i++) {
			setCursorXY(0, 2+i);
			setTextColor((i==counter)?highlightColor:defaultColor);
			std::cout << menuItems[i];
		}
		char key = _getch();

		switch (key) {
			case UP: {
				moveUp();
				break;
			}
			case DOWN: {
				moveDown();
				break;
			}
			case ENTER: {
				clearConsole;
				return counter;
				break;
			}
		}
	}
}

Menu::~Menu() {
	delete[] menuName;	
	for (int i = 0; i < numberOfMenuItems; i++)
		delete[] menuItems[i];
	delete[] menuItems;
}