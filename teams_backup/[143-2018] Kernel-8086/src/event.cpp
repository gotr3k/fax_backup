/*
 * event.cpp
 *
 *  Created on: Aug 19, 2020
 *      Author: OS1
 */

#include "../h/event.h"
#include "../h/krnlevt.h"
#include "../h/lock.h"

Event::Event (IVTNo ivtNo){
	LOCK
	myImpl=new KernelEv(ivtNo);
	UNLOCK
}

Event::~Event (){
	LOCK
	delete myImpl;
	UNLOCK
}

 void Event::wait (){
	 LOCK
	 myImpl->wait();
	 UNLOCK
 }

 void Event::signal(){
	 LOCK
	 myImpl->signal();
	 UNLOCK
 }

