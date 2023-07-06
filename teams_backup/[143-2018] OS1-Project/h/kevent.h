/*
 * kevent.h
 *
 *  Created on: May 15, 2020
 *      Author: OS1
 */


#ifndef KEVENT_H_
#define KEVENT_H_

#include "pcb.h"
#include "event.h"

class KernelEv {
public:
	KernelEv (IVTNo ivtNo);
	void wait ();
	void signal();
private:

	friend class Event;
	IVTNo entry;
	PCB* createdBy;
	unsigned value;
	unsigned ThreadBlocked;
};



#endif /* KEVENT_H_ */

