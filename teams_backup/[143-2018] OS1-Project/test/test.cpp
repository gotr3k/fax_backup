/*
 * test.cpp
 *
 *  Created on: Jul 21, 2020
 *      Author: OS1
 */


#include "thread.h"
#include "semaphor.h"
#include <iostream.h>

class nit:public Thread {
public:
	nit():Thread(){}
	virtual ~nit() { waitToComplete(); }
protected:
	virtual void run();
};

Semaphore* s11;
Semaphore* s22;

void nit::run() {

	s11->wait(0);
	cout<<"\nUsao u kriticnu sekciju!"<<getId();
	s22->wait(10);
	s11->signal();

}

void userMain(int argc, char* argv[]) {

	s11=new Semaphore(1);
	s22=new Semaphore(0);

	nit** niti = new nit*[10];
	for(int i=0;i<10;i++) {
		niti[i]=new nit();
	}
	for(i=0;i<10;i++) {
		niti[i]->start();
	}
	for(i=0;i<10;i++) {
		delete niti[i];
	}
	delete[] niti;
}

