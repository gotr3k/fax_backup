/*
 * utility.h
 *
 *  Created on: Apr 25, 2020
 *      Author: OS1
 */

#ifndef UTILITY_H_
#define UTILITY_H_

#include "pcblist.h"

// zabranjuje prekide
#define lock asm {pushf; cli;}

// dozvoljava prekide
#define unlock asm popf

//nit koja se izvrsava ako nema ni jedne niti spremne u scheduleru

class BackgroundThread : public Thread {
public:
	BackgroundThread():Thread(defaultStackSize,1){};
	static BackgroundThread* bg;
	friend class PCB;
protected:
	virtual void run ();

};

void INITIALIZE();
void RESTORE();

#endif /* UTILITY_H_ */
