/*
 * event.cpp
 *
 *  Created on: May 15, 2020
 *      Author: OS1
 */

#include "event.h"
#include "utility.h"
#include "kevent.h"
#include "ivten.h"


Event::Event(IVTNo ivtNo) {

	lock

	myImpl = new KernelEv(ivtNo);
	IVTEntry::entries[ivtNo]->kev=myImpl;

	unlock

}
 void Event::wait() {
	 lock
	 myImpl->wait();
	 unlock
 }


 void Event::signal() {
	 lock
	 myImpl->signal();
	 unlock
 }

Event::~Event() {
	lock
	delete myImpl;
	unlock
}


