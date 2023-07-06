/*
 * list.h
 *
 *  Created on: Aug 7, 2020
 *      Author: OS1
 */

#ifndef H_PCBLIST_H_
#define H_PCBLIST_H_

#include "pcb.h"
#include "thread.h"

class PCB;

struct nodePCB{
		PCB* pcb;
		nodePCB* next;
		nodePCB(PCB* pcb, nodePCB* next=0);
	};

class PCB_List{
private:
	nodePCB* head;
	nodePCB* tail;
public:
	PCB_List();
	~PCB_List();
	PCB* popFront();
	nodePCB* getHead();
	nodePCB* getTail();
	void unblockAll();
	void remove_all_pcbs();
	void add_pcb(PCB* pcb);
	void remove_pcb(PCB* pcb);
	Thread* getThreadById(ID id);
	void Test();
};

#endif /* H_PCBLIST_H_ */
