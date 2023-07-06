/*
 * semlist.h
 *
 *  Created on: Aug 16, 2020
 *      Author: OS1
 */

#ifndef H_SEMLIST_H_
#define H_SEMLIST_H_

#include "pcb.h"
#include "krnlsem.h"

struct nodeSem{
	PCB* pcb;
	Time waitingTime;
	char unlimitedWaiting;
	KernelSem* kernelSem;
	nodeSem* next;
	nodeSem(PCB* pcb, KernelSem* kernelSem, Time waitingTime=0);
};

class Sem_List{
private:
	nodeSem* head;
	nodeSem* tail;
public:
	Sem_List();
	~Sem_List();
	nodeSem* getHead();
	nodeSem* getTail();
	PCB* popFront();
	void unblockAll();
	int unblockAllOneSem(KernelSem* kernelSem);
	int unblockNOneSem(KernelSem* kernelSem, int n);
	void unblockAllTime();
	void add_pcb(PCB* pcb, KernelSem* kernelSem, Time waitingTime);
	void Test();
};

#endif /* H_SEMLIST_H_ */
