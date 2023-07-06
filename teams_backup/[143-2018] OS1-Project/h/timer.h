/*
 * timer.h
 *
 *  Created on: Apr 25, 2020
 *      Author: OS1
 */

#ifndef TIMER_H_
#define TIMER_H_


typedef void interrupt (*pInterrupt)(...);

extern void tick();

class Timer {
private:
	Timer();

public:
	static volatile int counter;
	static volatile int explicit_dispatch;
	static void initTimerInterrupt();
	static void interrupt timer(...);
	static void restoreTimerInterrupt();

};



#endif /* TIMER_H_ */
