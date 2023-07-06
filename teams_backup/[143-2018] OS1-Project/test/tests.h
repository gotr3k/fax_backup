/*
 * tests.h
 *
 *  Created on: May 9, 2020
 *      Author: OS1
 */

#ifndef TESTS_H_
#define TESTS_H_

#include "thread.h"

class TestKlasa2 : public Thread {
public:
	TestKlasa2(StackSize stackSize = defaultStackSize, Time timeSlice = defaultTimeSlice):Thread(stackSize,timeSlice){};
	virtual ~TestKlasa2() {waitToComplete(); }
protected:
	virtual void run ();

};

class TestKlasa3 : public Thread {
public:
	TestKlasa3(StackSize stackSize = defaultStackSize, Time timeSlice = defaultTimeSlice):Thread(stackSize,timeSlice){};
	virtual ~TestKlasa3() {waitToComplete(); }
protected:
	virtual void run ();

};



#endif /* TESTS_H_ */
