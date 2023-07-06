/*
 * pcb.cpp
 *
 *  Created on: Aug 7, 2020
 *      Author: OS1
 */

#include "../h/pcb.h"
#include "../h/thread.h"
#include "../h/lock.h"
#include "../h/system.h"
#include "../h/schedule.h"
#include "../h/pcblist.h"

#include <dos.h>
#include <stdio.h>

PCB::PCB(Thread* thread, StackSize stackSize, Time timeSlice){
	static int IDcounter=0;
	this->myThread=thread;
	if(stackSize>65536){//max velicina je 64KB, tj. 32K adresa
		stackSize=65536;
	}
	//if(stackSize<0){
		//stackSize=0;
	//}
	stackSize/=sizeof(unsigned);//pretvaramo stackSize u br mesta na stacku
	this->stackSize=stackSize;
	this->timeSlice=timeSlice;
	this->threadID=IDcounter++;
	this->timeSpentWaitingOnSem=0;
	this->state=NEW;
	if(thread){//zbog idle steka jer ima drugaciji wrapper
		this->createProcess(wrapper);
	}
	this->waitingOnThis=new PCB_List();
}

void PCB::createProcess(void (*body)()){
	this->stack=new unsigned[this->stackSize];
	this->stack[this->stackSize-1]=0x200;//Stavljamo PSW sa I=1

	#ifndef BCC_BLOCK_IGNORE
	this->stack[this->stackSize-2]=FP_SEG(body);//postavljanje CS fje koju ce thread da izvrsava
	this->stack[this->stackSize-3]=FP_OFF(body);//postavljanje IP fje koju ce thread da izvrsava
	#endif

	//registri na steku od [pcb->stackSize-4] do [pcb->stackSize-12]

	#ifndef BCC_BLOCK_IGNORE
	this->ss=FP_SEG((this->stack)+stackSize-12);
	this->sp=FP_OFF((this->stack)+stackSize-12);
	#endif
	this->bp=this->sp;
}

void PCB::blockOne(PCB* pcb){
	if(pcb!=0 && this!=0){
		if(pcb->threadID!=this->threadID && this->state!=FINISHED && pcb!=0){
			pcb->state=BLOCKED;
			this->waitingOnThis->add_pcb(pcb);
		}
	}
}

void PCB::unblockOne(PCB* pcb){
	if(pcb!=0 && this!=0){
		if(pcb->threadID!=this->threadID){
			pcb->state=READY;
			this->waitingOnThis->remove_pcb(pcb);
			Scheduler::put(pcb);
		}
	}
}

volatile void PCB::unblockAll(){
	//this->waitingOnThis->remove_all_pcbs(); ne moze ovako jer moramo da ubacimo u scheduler spremne niti
	waitingOnThis->unblockAll();
}

void PCB::wrapper(){
	LOCK
	//printf("\nUSLI SMO U WRAPPER! TimeSlice=%d",System::running->timeSlice);
	UNLOCK
	System::running->myThread->run();
	LOCK
	System::running->state=FINISHED;
	//printf("\nKRAJ WRAPPERA!%d",System::running->threadID);
	System::running->unblockAll();
	dispatch();
	UNLOCK
}

PCB::~PCB(){
	//printf("\nUsli smo u destruktor myPCB-a niti %d", this->threadID);
	this->state=FINISHED;
	waitingOnThis->unblockAll();
	System::pcbList->remove_pcb(this);
	delete[] stack;
}
