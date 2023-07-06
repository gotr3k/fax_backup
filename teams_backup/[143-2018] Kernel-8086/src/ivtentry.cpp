/*
 * ivtentry.cpp
 *
 *  Created on: Aug 18, 2020
 *      Author: OS1
 */
#include "../h/ivtentry.h"
#include "../h/lock.h"
#include "../h/krnlevt.h"

#include <dos.h>

IVTEntry* IVTEntry::IVT[256] = {0};

IVTEntry::IVTEntry(IVTNo ivtNo, interruptFunc newInterrupt){
	LOCK
	this->ivtNo=ivtNo;
	this->newInterrupt=newInterrupt;
	this->kernelEvent=0;

	IVT[ivtNo]=this;

	#ifndef BCC_BLOCK_IGNORE
	this->oldInterrupt=getvect(ivtNo);
	setvect(ivtNo,this->newInterrupt);
	#endif
	UNLOCK
}



IVTEntry::~IVTEntry(){
	LOCK
	#ifndef BCC_BLOCK_IGNORE
	setvect(ivtNo,this->oldInterrupt);
	IVT[ivtNo]=0;
	#endif
	UNLOCK
}

void IVTEntry::signal(){
	LOCK
	if(this->kernelEvent!=0){
		this->kernelEvent->signal();
	}
	UNLOCK
}


