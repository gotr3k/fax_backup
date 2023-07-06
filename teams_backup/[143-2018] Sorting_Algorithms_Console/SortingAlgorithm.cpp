#include "SortingAlgorithm.h"
#include "HelperFunctions.h"
#include <iostream>
#include <Windows.h>
#include <conio.h>
#include <time.h>
#include <stdlib.h>
#include <thread>

SortingAlgorithm::SortingAlgorithm(int _numberOfElements,
	int _sortingSpeed,
	int _maxNumberSize)
	: numberOfElements{ _numberOfElements },
	sortingSpeed{ _sortingSpeed },
	numberOfElementsAccessed{ 0 },
	maxNumberSize{ _maxNumberSize },
	x{ 0 },
	y{ 0 } {
	srand(time(NULL));
	arrayOfElements = new int[numberOfElements];
	for (int i = 0; i < numberOfElements; i++) {
		arrayOfElements[i] = rand() % (maxNumberSize + 1);
	}
}

void SortingAlgorithm::printNumberOfElementsChecked() {
	setCursorXY(x, y + numberOfElements + 1);
	setTextColor(WHITE);
	std::cout << "Number of elements accessed: "<< numberOfElementsAccessed <<"\n\n";
}

SortingAlgorithm::~SortingAlgorithm(){
	delete[] arrayOfElements;
}

void SortingAlgorithm::printAll() {
	setLegend();
	printArray();
	std::cout << "Press any character to begin sorting...";
	char k = _getch();
	clearLine;
	sortArray();
}

void SortingAlgorithm::setLegend() {
	y = getCursorXY().Y;
	setCursorXY(x, y + 1);
	printLegend();
	y = getCursorXY().Y + 2; //1) very important for printing the array on correct place down the line!!!
}

void SortingAlgorithm::printArray() {
	for (int i = 0; i < numberOfElements; i++) {
		setCursorXY(x, y + i);	//1)
		clearLine;
		changeTextColor(i);
		for (int j = 0; j < arrayOfElements[i]; j++) {
			std::cout << outputChar;
		}
		setCursorXY(maxNumberSize + 10, y + i);
		std::cout << arrayOfElements[i];
	}

	printNumberOfElementsChecked();
	std::this_thread::sleep_for(std::chrono::milliseconds(0 + (5 - sortingSpeed) * 50));
}