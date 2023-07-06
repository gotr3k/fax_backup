/*
 * krnlsem.h
 *
 *  Created on: Aug 16, 2020
 *      Author: OS1
 */

#ifndef H_KRNLSEM_H_
#define H_KRNLSEM_H_

#include "semaphor.h"
#include "semlist.h"
#include "system.h"

class Sem_List;

class KernelSem{
public:
	KernelSem(int init=1, Semaphore* sem);
	~KernelSem();
	int wait(Time maxTimeToWait);
	int signal(int n=0);
	int value;
	Semaphore* mySem;
};

#endif /* H_KRNLSEM_H_ */
