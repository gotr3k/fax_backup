/*
 * thread.cpp
 *
 *  Created on: Aug 9, 2020
 *      Author: OS1
 */

#include "../h/pcb.h"
#include "../h/thread.h"
#include "../h/lock.h"
#include "../h/schedule.h"
#include "../h/system.h"
#include "../h/idlepcb.h"
#include <dos.h>
#include <stdio.h>

Thread::Thread(StackSize stackSize, Time timeSlice){
	LOCK
	myPCB=new PCB(this,stackSize,timeSlice);
	System::pcbList->add_pcb(myPCB);
	UNLOCK
}

Thread::~Thread(){
	LOCK
	//printf("\nUsli smo u destruktor niti %d",this->myPCB->threadID);
	this->waitToComplete();
	delete myPCB;
	UNLOCK
}

void Thread::start(){
	LOCK
	myPCB->state=READY;
	Scheduler::put(myPCB);
	UNLOCK
}

void Thread::waitToComplete(){
	if(this->getId()!=System::running->threadID &&//ne moze da ceka na sebe
	   this->getId()!=System::idle->threadID &&//ne moze da ceka na idle
	   this->getId()!=System::main->threadID &&//ne moze da ceka na main
	   this->myPCB->state!=FINISHED){//ne moze da ceka na zavrsenu nit
		//System::running->state=BLOCKED; visak
		LOCK
		this->myPCB->blockOne((PCB*)System::running);
		UNLOCK
		dispatch();
	}
}

ID Thread::getId(){
	return myPCB->threadID;
}

ID Thread::getRunningId(){
	return System::running->threadID;
}

Thread* Thread::getThreadById(ID id){
	return System::pcbList->getThreadById(id);
}

void dispatch(){
	LOCK
	//printf("\nUSLI SMO U DISPATCH!");
	System::context_switch_on_demand=1;
	timer();
	UNLOCK
}
