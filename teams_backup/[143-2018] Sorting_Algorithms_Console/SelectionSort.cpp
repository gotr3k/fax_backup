#include "SelectionSort.h"
#include "HelperFunctions.h"
#include <iostream>
#include <conio.h>

SelectionSort::SelectionSort(int _numberOfElements, int _sortingSpeed, int _maxNumberSize)
	: SortingAlgorithm(_numberOfElements, _sortingSpeed, _maxNumberSize),
	sortedIndex{ -1 },
	currMinIndex{ -1 },
	comparisonIndex{ -1 },
	swappingIndex1{ -1 },
	swappingIndex2{ -1 }{
	//Empty
}

void SelectionSort::printLegend() {
	setTextColor(WHITE);
	std::cout << "Unsorted     ";
	setTextColor(RED);
	std::cout << "Current Min     ";
	setTextColor(PINK);
	std::cout << "Comparing With     ";
	setTextColor(CYAN);
	std::cout << "Swapping     ";
	setTextColor(GREEN);
	std::cout << "Sorted";
}

void SelectionSort::changeTextColor(int i) {	//Write cleaner
	if (i <= sortedIndex)
		setTextColor(GREEN);
	else if (i == swappingIndex1 || i == swappingIndex2)
		setTextColor(CYAN);
	else if (i == currMinIndex)
		setTextColor(RED);
	else if (i == comparisonIndex)
		setTextColor(PINK);
	else
		setTextColor(WHITE);
}

void SelectionSort::sortArray() {
	for (int i = 0; i < numberOfElements-1; i++) {
		currMinIndex = i;
		printArray();
		for (int j = i + 1; j < numberOfElements; j++) {
			comparisonIndex = j;
			numberOfElementsAccessed+=2;
			printArray();
			if (arrayOfElements[currMinIndex] > arrayOfElements[j]) {
				currMinIndex = j;
				comparisonIndex = -1;
				printArray();
			}
		}
		swappingIndex1 = i;
		swappingIndex2 = currMinIndex;
		currMinIndex = -1;
		comparisonIndex = -1;
		printArray();
		if (i != currMinIndex) {
			numberOfElementsAccessed += 4;
			int temp = arrayOfElements[swappingIndex1];
			arrayOfElements[swappingIndex1] = arrayOfElements[swappingIndex2];
			arrayOfElements[swappingIndex2] = temp;
		}
		swappingIndex1 = -1;
		swappingIndex2 = -1;
		sortedIndex++;
		if (i == numberOfElements - 2)
			sortedIndex++;
		printArray();
	}
}