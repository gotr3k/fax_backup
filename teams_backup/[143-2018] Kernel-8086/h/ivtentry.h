/*
 * ivtentry.h
 *
 *  Created on: Aug 18, 2020
 *      Author: OS1
 */

#ifndef H_IVTENTRY_H_
#define H_IVTENTRY_H_

#include "krnlevt.h"
#include "event.h"

typedef void interrupt (*interruptFunc)(...);

class IVTEntry{
public:
	IVTNo ivtNo;
	KernelEv* kernelEvent;
	interruptFunc newInterrupt;
	interruptFunc oldInterrupt;
	IVTEntry(IVTNo ivtNo, interruptFunc newInterrupt);
	~IVTEntry();
	void signal();
	static IVTEntry* IVT[];
};



#endif /* H_IVTENTRY_H_ */
