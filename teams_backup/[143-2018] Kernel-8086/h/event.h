// File: event.h
#ifndef _event_h_
#define _event_h_

typedef unsigned char IVTNo;
class KernelEv;

#include "macro.h"

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

#endif //_event_h_
