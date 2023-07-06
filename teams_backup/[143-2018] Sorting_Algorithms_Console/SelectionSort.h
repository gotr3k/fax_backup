#pragma once

#include "SortingAlgorithm.h"

class SelectionSort : public SortingAlgorithm {
private:
	int sortedIndex;
	int currMinIndex;
	int comparisonIndex;
	int swappingIndex1;
	int swappingIndex2;
	void printLegend();
	void changeTextColor(int i);
	void sortArray();
public:
	SelectionSort(int _numberOfElements, int _sortingSpeed, int _maxNumberSize = 50);
};