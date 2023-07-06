/*
 * thread.cpp
 *
 *  Created on: Apr 25, 2020
 *      Author: OS1
 */

#include "timer.h"
#include "thread.h"
#include "utility.h"
#include "SCHEDULE.H"
#include "pcblist.h"

void dispatch() {
	Timer::explicit_dispatch=1;
	Timer::timer();
}

Thread::Thread(StackSize stackSize, Time timeSlice) {
	lock

	myPCB=new PCB(stackSize, timeSlice, this);
	PCBList::allPCBs->addPCBToList(myPCB); //dodajemo od svake nove nit, njen pcb u listu svih pcb-ova

	unlock
}

Thread::~Thread() {
	waitToComplete();//sacekamo da nit zavrsi pre nego sto je obrisemo
	lock

	PCBList::allPCBs->removePCBFromList(myPCB); //brisanjem niti moramo i da je uklonimo iz liste svih niti

	delete myPCB; //brisemo objekat na koji pokazuje myPCB
	unlock
}

void Thread::start() {
	lock
	Scheduler::put(myPCB); //startujemo nit tako sto je ubacimo u scheduler
	unlock
}

void Thread::waitToComplete() { //running nit se blokira sve dok pozivajuca nit ne zavrsi
	lock
	if(myPCB->finished==1||this==BackgroundThread::bg) { //ukoliko je pozivajuca nit zavrsila, ne radimo nista
		unlock
		return;
	}
	PCB::running->blocked=1; //oznacimo running blokiranom
	this->myPCB->blockedByThis->addPCBToList(PCB::running); //ubacujemo running nit u listu blokiranih niti koje cekaju da se zavrsi pozivajuca nit
	unlock
	dispatch(); //prebacujemo se na neku drugu nit jer je running blokirana

}

ID Thread::getId() {
	return myPCB->id;
}

ID Thread::getRunningId() {
	return PCB::running->id;
}

Thread * Thread::getThreadById(ID id) { //trazimo nit za odgovarajucim ID, prolazeci kroz listu svih niti (pcb-ova)
	return PCBList::allPCBs->getPCBById(id)->getThread();
}

