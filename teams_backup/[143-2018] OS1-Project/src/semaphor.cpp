/*
 * semaphor.cpp
 *
 *  Created on: May 9, 2020
 *      Author: OS1
 */


#include "semaphor.h"
#include "utility.h"
#include "ksem.h"

Semaphore::Semaphore(int init) {
	lock
	myImpl = new KernelSem(init);
	KSEMList::allSems->addKSEMToList(myImpl); //pamtimo sve semafore u globalnom nizu semafora allSem
	unlock
}


int Semaphore::val() const {
	return myImpl->val();
}
Semaphore::~Semaphore() {
	lock
	KSEMList::allSems->removeKSEMFromList(myImpl);
	delete myImpl;
	unlock
}

int Semaphore::signal(int n) {
	lock
	int ret = myImpl->signal(n);
	unlock
	return ret;
}

int Semaphore::wait(Time maxTimeToWait) {

	lock
	int ret = myImpl->wait(maxTimeToWait);
	unlock
	return ret;
}
