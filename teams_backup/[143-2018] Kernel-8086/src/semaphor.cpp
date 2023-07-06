/*
 * semaphor.cpp
 *
 *  Created on: Aug 17, 2020
 *      Author: OS1
 */

#include "../h/semaphor.h"
#include "../h/lock.h"
#include "../h/krnlsem.h"


Semaphore::Semaphore(int init){
	LOCK
	myImpl=new KernelSem(init,this);
	UNLOCK
}
Semaphore::~Semaphore (){
	LOCK
	delete myImpl;
	UNLOCK
}

int Semaphore::wait (Time maxTimeToWait){
	 return myImpl->wait(maxTimeToWait);
 }
int Semaphore::signal(int n){
	return myImpl->signal(n);
 }

 int Semaphore::val () const{
	 return myImpl->value;
 }


