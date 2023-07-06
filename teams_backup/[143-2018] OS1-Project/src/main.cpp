/*
 * main.cpp
 *
 *  Created on: May 15, 2020
 *      Author: OS1
 */

#include "utility.h"

extern int userMain(int argc, char* argv[]);

int main(int argc, char* argv[]) {

	INITIALIZE();
	int ret = userMain(argc, argv);
	RESTORE();
	return ret;

}


