/*
 * krnlevt.cpp
 *
 *  Created on: Aug 19, 2020
 *      Author: OS1
 */

#include "../h/krnlevt.h"
#include "../h/system.h"
#include "../h/pcb.h"
#include "../h/lock.h"
#include "../h/ivtentry.h"


KernelEv::KernelEv(IVTNo ivtNo){
	LOCK
	this->ivtNo=ivtNo;
	this->myPCB=(PCB*)System::running;
	this->mySem=new Semaphore(0);
	IVTEntry::IVT[ivtNo]->kernelEvent=this;
	UNLOCK
}

KernelEv::~KernelEv(){
	LOCK
	IVTEntry::IVT[ivtNo]->kernelEvent=0;
	delete mySem;
	UNLOCK
}

void KernelEv::signal(){
	mySem->signal();
}

void KernelEv::wait(){
	if(System::running->threadID==myPCB->threadID)
		mySem->wait(0);
}
