/*
 * kevent.cpp
 *
 *  Created on: May 15, 2020
 *      Author: OS1
 */


#include "kevent.h"
#include "pcb.h"
#include "event.h"
#include "SCHEDULE.h"

KernelEv::KernelEv(IVTNo ivtNo) {

	createdBy = PCB::running;
	value=0;
	ThreadBlocked=0;
	entry=ivtNo;

}


void KernelEv::signal() {

	if(ThreadBlocked==0) value=1;
	else {
		value=0;
		createdBy->blocked=0;
		ThreadBlocked=0;
		Scheduler::put(createdBy);
	}

}


void KernelEv::wait() {
	if(createdBy!=PCB::running) return;

	if(value==0) {
		ThreadBlocked=1; //da oznacimo da je na tom eventu nit blokirana, da bismo znali da je odblokiramo u signal
		PCB::running->blocked=1;
		dispatch();
	}
	else value=0;

}
