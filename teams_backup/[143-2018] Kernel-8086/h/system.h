/*
 * system.h
 *
 *  Created on: Aug 9, 2020
 *      Author: OS1
 */

#ifndef H_SYSTEM_H_
#define H_SYSTEM_H_

#include "pcb.h"
#include "idlepcb.h"
#include "pcblist.h"
#include "semlist.h"

class IdlePCB;
class PCB_List;
class Sem_List;

class System{
public:
	static volatile PCB* running;
	static IdlePCB* idle;
	static PCB* main;
	static PCB_List* pcbList;
	static volatile Sem_List* blockedList;
	static volatile int counter;
	static volatile int context_switch_on_demand;//treba inicijalizovati na nulu na pocetku maina
};

void interrupt timer();
void initialize();
void restore();


#endif /* H_SYSTEM_H_ */
