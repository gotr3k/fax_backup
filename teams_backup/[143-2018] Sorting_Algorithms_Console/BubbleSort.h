#pragma once

#include "SortingAlgorithm.h"

class BubbleSort : public SortingAlgorithm {
private:
	int sortedIndex;
	int comparisonIndex1;
	int comparisonIndex2;
	int swappingIndex1;
	int swappingIndex2;
	void printLegend();
	void changeTextColor(int i);
	void sortArray();
public:
	BubbleSort(int _numberOfElements, int _sortingSpeed, int _maxNumberSize = 50);
};