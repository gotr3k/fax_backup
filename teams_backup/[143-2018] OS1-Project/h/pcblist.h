/*
 * pcblist.h
 *
 *  Created on: Apr 28, 2020
 *      Author: OS1
 */

#ifndef PCBLIST_H_
#define PCBLIST_H_

#include "pcb.h"
#include "thread.h"
#include "ksem.h"

struct pcbNode {
	PCB* pcb;
	pcbNode* next;
};

class PCBList {
	pcbNode* head;
public:
	PCBList();
	PCBList(PCB* p);
	~PCBList();
	void addPCBToList(PCB *p);
	void removePCBFromList(PCB *p);
	PCB * getPCBById(ID id);
	PCB* getFirst();
	void unblockWholeList();
	void updateBlockedTime(KernelSem *k);

	static PCBList* allPCBs;
};



#endif /* PCBLIST_H_ */

