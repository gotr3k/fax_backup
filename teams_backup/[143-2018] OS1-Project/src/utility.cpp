/*
 * utility.cpp
 *
 *  Created on: May 15, 2020
 *      Author: OS1
 */

#include "utility.h"
#include "timer.h"

BackgroundThread* BackgroundThread::bg=0;



void BackgroundThread::run() {
	while(1) {

	}
}



//inicijalizacija
void INITIALIZE() {
	PCBList::allPCBs=new PCBList();
	KSEMList::allSems=new KSEMList();
	BackgroundThread::bg=new BackgroundThread();

	PCB::mainPCB = new PCB(defaultStackSize, defaultTimeSlice, 0);
	PCB::running=PCB::mainPCB;
	Timer::counter=defaultTimeSlice;

	Timer::initTimerInterrupt();
}

//dealokacija i restauracija tajmera

void RESTORE() {
	lock
	Timer::restoreTimerInterrupt();
	delete BackgroundThread::bg;
	delete PCBList::allPCBs;
	delete KSEMList::allSems;
	delete PCB::mainPCB;
	unlock

}
