/*
 * pcb.h
 *
 *  Created on: Apr 25, 2020
 *      Author: OS1
 */

#ifndef PCB_H_
#define PCB_H_

#include "pcblist.h"
#include "thread.h"


class PCBList;

class PCB{
public:

	static void wrapper();
	static PCB* running;
	static PCB* mainPCB;
	static unsigned sid;
	static void initRunning(Thread* t);
	PCB(StackSize stackSize, Time timeSlice, Thread* thr);
	~PCB();
	Thread* getThread();

private:
	unsigned sp;
	unsigned ss;
	unsigned bp;
	unsigned finished; //da li je nit zavrsila
	unsigned blocked; //da li je nit blokirana
	unsigned id;
	unsigned* stack; //pokazivac na stek niti, koristimo pri oslobadjanju memorije u destruktoru
	Time quantum; //vreme trajanja niti dok ne dodje do promene konteksta
	Thread* myThread; //veza  u oba smera sa thread klasom
	PCBList* blockedByThis; //lista ostalih niti koje cekaju da nit zavrsi
	Time blockedTime; //koliko maksimalno ostaje blokirana na semaforu
	unsigned waitReturn; //da li je odblokirana zbog isteka vremena (0) ili kao posledica signal (1)


	friend class Timer;
	friend class Thread;
	friend class PCBList;
	friend class KernelSem;
	friend class KernelEv;
};

#endif /* PCB_H_ */
