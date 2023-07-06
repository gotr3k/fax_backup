/*
 * main.cpp
 *
 *  Created on: Aug 7, 2020
 *      Author: OS1
 */

#include "pcb.h"
#include "pcblist.h"
#include "thread.h"
#include "system.h"
#include "lock.h"
#include <stdio.h>

extern void userMain(int argc, char* argv[]);

int main(int argc, char* argv[] ){
	LOCK
	printf("Start\n");
	System::main=new PCB(0,defaultStackSize,2);
	System::main->state=RUNNING;
	System::running=System::main;
	System::counter=System::running->timeSlice;
	System::context_switch_on_demand=0;
	System::pcbList=new PCB_List();
	System::blockedList=new Sem_List();
	System::idle=new IdlePCB(0,1);
	UNLOCK

	initialize();

	LOCK
	printf("UserMain:\n");
	UNLOCK

	userMain(argc, argv);

	delete System::blockedList;
	delete System::pcbList;
	delete System::main;
	delete System::idle;
	//System::pcbList->Test();
	restore();
	printf("\nFinish!");
}
