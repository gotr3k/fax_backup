/*
 * pcb.h
 *
 *  Created on: Aug 7, 2020
 *      Author: OS1
 */

#ifndef H_PCB_H_
#define H_PCB_H_

#include "pcblist.h"
#include "thread.h"

enum State{NEW, READY, RUNNING, BLOCKED, FINISHED};

class PCB_List;

class PCB{
public:
	unsigned *stack;
	StackSize stackSize;
	Time timeSlice;
	Time timeSpentWaitingOnSem;
	unsigned bp;
	unsigned sp;
	unsigned ss;
	Thread* myThread;
	ID threadID;
	State state;
	PCB_List* waitingOnThis;
	PCB(Thread* thread, StackSize stackSize, Time timeSlice);
	~PCB();
	void createProcess(void (*body)());
	volatile void unblockAll();
	void unblockOne(PCB* pcb);
	void blockOne(PCB* pcb);
	static void wrapper();
};

#endif /* H_PCB_H_ */
