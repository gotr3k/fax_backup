/*
 * krnlsem.cpp
 *
 *  Created on: Aug 16, 2020
 *      Author: OS1
 */

#include "../h/krnlsem.h"
#include "../h/system.h"
#include "../h/semlist.h"
#include "../h/lock.h"
#include "../h/semaphor.h"

#include <stdio.h>

KernelSem::KernelSem(int init, Semaphore* sem){
	LOCK
	value=init;
	mySem=sem;
	UNLOCK
}

KernelSem::~KernelSem(){
	LOCK
	System::blockedList->unblockAllOneSem(this);
	UNLOCK
}

int KernelSem::wait(Time maxTimeToWait){//ne vraca dobar rezultat
	LOCK
	if(--value<0 && System::running->threadID!=System::idle->threadID && System::running->threadID>0 && System::running->threadID<500){
		System::running->state=BLOCKED;
		System::running->timeSpentWaitingOnSem=0;
		//LOCK
		//printf("\nNit %d pre blokiranja na semaforu!",System::running->threadID);
		//UNLOCK
		System::blockedList->add_pcb((PCB*)System::running, this, maxTimeToWait);
		//LOCK
		//printf("\nNit %d posle blokiranja na semaforu!",System::running->threadID);
		//UNLOCK
		UNLOCK
		dispatch();
		LOCK
	}
	if(System::running->timeSpentWaitingOnSem>=maxTimeToWait && maxTimeToWait!=0){
		UNLOCK
		return 0;
	}
	UNLOCK
	return 1;
}

int KernelSem::signal(int n){
	LOCK
	int ret;
	if(n==0){
		if(value++<0){
			System::blockedList->unblockNOneSem(this, 1);
		}
		UNLOCK
		return 0;
	}
	else if(n>0){
		if(n>=(-value)){
			ret=System::blockedList->unblockAllOneSem(this);
		}
		else{
			ret=System::blockedList->unblockNOneSem(this, n);
		}
		value=value+n;
	}
	else{
		ret=n;
	}
	UNLOCK
	return ret;
}
