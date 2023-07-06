#include <iostream>
#include "HelperFunctions.h"
#include "Menu.h"
#include "SortingAlgorithm.h"
#include "SelectionSort.h"
#include "BubbleSort.h"
#include "HelperFunctions.h"
#include <iostream>
#include <conio.h>

int main()
{
    while (true) {
        clearConsole;
        ShowConsoleCursor(false);
        const char* mainMenuName = "MAIN MENU";
        const int numberOfAlgorithms = 5;
        Algorithm* algorithms = new Algorithm[numberOfAlgorithms];
        const char* algorithmNames[numberOfAlgorithms] = { "SELECTION SORT", "BUBBLE SORT", "INSERTION SORT", "MERGE SORT", "QUICK SORT" };
        const char** mainMenuItems = new const char* [numberOfAlgorithms];

        for (int i = 0; i < numberOfAlgorithms; i++) {
            algorithms[i].name = algorithmNames[i];
            algorithms[i].number = i;
            mainMenuItems[i] = algorithms[i].name;
        }

        Menu* mainMenu=new Menu(mainMenuName, numberOfAlgorithms, mainMenuItems);
        int selectedAlgorithm = mainMenu->showMenu();

        for (int i = 0; i < numberOfAlgorithms; i++) {
            if (algorithms[i].number == selectedAlgorithm) {
                std::cout << algorithms[i].name;
                int numberOfElements = getNumberOfElements();
                int sortingSpeed = getSortingSpeed();
                SortingAlgorithm* algorithm;
                switch (algorithms[i].number) {
                case 0: {   //SELECTION SORT
                    algorithm = new SelectionSort(numberOfElements, sortingSpeed);
                    algorithm->printAll();
                    break;
                }
                case 1: {   //BUBBLE SORT
                    algorithm = new BubbleSort(numberOfElements, sortingSpeed);
                    algorithm->printAll();
                    break;
                }
                default:
                    break;
                }
                //algorithm->printAll();
                FlushConsoleInputBuffer(GetStdHandle(STD_INPUT_HANDLE));    //Discard all buffered user input
                std::cout << "Press any key to return to main menu...";
            }
        }
        char key = _getch();
    }
}
