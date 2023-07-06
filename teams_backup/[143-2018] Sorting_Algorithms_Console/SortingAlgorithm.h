#pragma once

#define outputChar char(254)

class SortingAlgorithm {
protected:
	int numberOfElements;
	int* arrayOfElements;
	int numberOfElementsAccessed;
	int sortingSpeed;
	int maxNumberSize;
	int x;
	int y;
	void setLegend();				//prints legend while also setting y position
	virtual void printLegend() = 0;
	void printNumberOfElementsChecked();
	void printArray();
	virtual void sortArray() = 0;
	virtual void changeTextColor(int i) = 0;
public:
	SortingAlgorithm(int _numberOfElements, int _sortingSpeed, int maxNumberSize = 50);
	~SortingAlgorithm();
	void printAll();
};