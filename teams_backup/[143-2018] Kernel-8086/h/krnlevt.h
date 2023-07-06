/*
 * krnlevt.h
 *
 *  Created on: Aug 18, 2020
 *      Author: OS1
 */

#ifndef H_KRNLEVT_H_
#define H_KRNLEVT_H_

#include "event.h"
#include "semaphor.h"
#include "pcb.h"
#include "ivtentry.h"

class KernelEv{
public:
	KernelEv(IVTNo ivtNo);
	~KernelEv();
	void signal();
	void wait();

	IVTNo ivtNo;
	PCB* myPCB;
	Semaphore* mySem;

	friend class IVTEntry;
};

#endif /* H_KRNLEVT_H_ */
