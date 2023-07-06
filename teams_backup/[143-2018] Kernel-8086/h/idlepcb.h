/*
 * idlepcb.h
 *
 *  Created on: Aug 11, 2020
 *      Author: OS1
 */

#ifndef H_IDLEPCB_H_
#define H_IDLEPCB_H_

#include "pcb.h"
#include "thread.h"

class IdlePCB: public PCB{
public:
	IdlePCB(StackSize stackSize, Time timeSlice);
	static void idleWrapper();
};



#endif /* H_IDLEPCB_H_ */
