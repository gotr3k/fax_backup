/*
 * event.h
 *
 *  Created on: May 14, 2020
 *      Author: OS1
 */

#ifndef _event_h_
#define _event_h_

typedef unsigned char IVTNo;

#include "ivten.h"

class KernelEv;

class Event {
public:
	Event (IVTNo ivtNo);
	~Event ();
	void wait ();
protected:
	friend class KernelEv;
	void signal(); // can call KernelEv
private:
	KernelEv* myImpl;
};



#endif
