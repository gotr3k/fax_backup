/*
 * ivten.h
 *
 *  Created on: May 15, 2020
 *      Author: OS1
 */

#ifndef IVTEN_H_
#define IVTEN_H_

#include "event.h"
#include "kevent.h"

typedef void interrupt (*pInterrupt)(...);

class IVTEntry {
public:

	IVTEntry(IVTNo entry, pInterrupt newRoutine);
	~IVTEntry(); //restore old interrupt aswell
	static IVTEntry* entries[];

	pInterrupt oldRoutine;

	void EvSignal();


private:

	friend class Event;
	KernelEv* kev;
	IVTNo ent;
};

#define PREPAREENTRY(Ent, callBack) \
void interrupt Routine##Ent(...); \
IVTEntry Entry##Ent(Ent, Routine##Ent); \
void interrupt Routine##Ent(...) { \
	Entry##Ent.EvSignal(); \
	if(callBack==1) \
	Entry##Ent.oldRoutine(); \
}


#endif /* IVTEN_H_ */
