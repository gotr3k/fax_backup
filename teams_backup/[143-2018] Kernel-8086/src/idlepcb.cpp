/*
 * idlepcb.cpp
 *
 *  Created on: Aug 11, 2020
 *      Author: OS1
 */

#include "idlepcb.h"
#include "lock.h"//visak
#include "system.h"//visak

#include <stdio.h>

IdlePCB::IdlePCB(StackSize stackSize, Time timeSlice):PCB(0,stackSize,timeSlice){
	this->state=READY;
	createProcess(idleWrapper);
}

void IdlePCB::idleWrapper(){
	while(1){
		//for(unsigned i=0;i<30000;i++)
		//	for(unsigned j=0;j<30000;j++);
		//LOCK
		//printf("IDLE ");
		//System::blockedList->Test();
		//UNLOCK
	}
}

