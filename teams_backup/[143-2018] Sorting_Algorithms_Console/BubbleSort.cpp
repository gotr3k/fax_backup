#include "BubbleSort.h"
#include "HelperFunctions.h"
#include <iostream>
#include <conio.h>

BubbleSort::BubbleSort(int _numberOfElements, int _sortingSpeed, int _maxNumberSize)
	: SortingAlgorithm(_numberOfElements, _sortingSpeed, _maxNumberSize),
	sortedIndex{ _numberOfElements },
	comparisonIndex1{ -1 },
	comparisonIndex2{ -1 },
	swappingIndex1{ -1 },
	swappingIndex2{ -1 }{
	//Empty
}

void BubbleSort::printLegend() {
	setTextColor(WHITE);
	std::cout << "Unsorted     ";
	setTextColor(CYAN);
	std::cout << "Comparing     ";
	setTextColor(PINK);
	std::cout << "Swapping     ";
	setTextColor(GREEN);
	std::cout << "Sorted";
}

void BubbleSort::changeTextColor(int i) {	//Write cleaner
	if (i >= sortedIndex)
		setTextColor(GREEN);
	else if (i == swappingIndex1 || i == swappingIndex2)
		setTextColor(PINK);
	else if (i == comparisonIndex1 || i==comparisonIndex2)
		setTextColor(CYAN);
	else
		setTextColor(WHITE);
}

void BubbleSort::sortArray() {
	int n = numberOfElements;
	while(n>1){
		int newn = 0;
		for (int i = 0; i < n-1; i++) {
			comparisonIndex1 = i;
			comparisonIndex2 = i + 1;
			numberOfElementsAccessed += 2;
			printArray();
			if (arrayOfElements[i] > arrayOfElements[i+1]) {
				swappingIndex1 = comparisonIndex1;
				swappingIndex2 = comparisonIndex2;
				comparisonIndex1 = -1;
				comparisonIndex2 = -1;
				printArray();

				int temp = arrayOfElements[i];
				arrayOfElements[i] = arrayOfElements[i+1];
				arrayOfElements[i+1] = temp;
				newn = i+1;

				numberOfElementsAccessed += 4;
				swappingIndex1 = -1;
				swappingIndex2 = -1;
				printArray();
			}
		}
		n = newn;

		comparisonIndex1 = -1;
		comparisonIndex2 = -1;
		sortedIndex = newn;
		printArray();
	}
}