/*
 * kernelsem.h
 *
 *  Created on: May 10, 2020
 *      Author: OS1
 */

#ifndef KSEM_H_
#define KSEM_H_

#include "semaphor.h"
#include "pcblist.h"


class KernelSem {
public:
	KernelSem (int init=1);
	~KernelSem ();
 	int wait (Time maxTimeToWait);
 	int signal(int n=0);
 	int stdsignal();
 	int val () const; // Returns the current value of the semaphore

 	friend class PCBList;
 	friend class KSEMList;

private:
 	int value;
 	PCBList* blocked;

};




struct ksemNode {
	KernelSem* ksem;
	ksemNode* next;
};


class KSEMList {
	ksemNode* head;
public:
	static KSEMList* allSems;
	KSEMList();
	KSEMList(KernelSem* k);
	~KSEMList();
	void addKSEMToList(KernelSem *k);
	void removeKSEMFromList(KernelSem *k);
	void updateWholeList();

};


#endif /* KSEM_H_ */
