/*
 * macro.h
 *
 *  Created on: Aug 20, 2020
 *      Author: OS1
 */

#ifndef H_MACRO_H_
#define H_MACRO_H_

#include "ivtentry.h"
#include "krnlsem.h"
#include "krnlevt.h"

#define PREPAREENTRY(ivtNo, old)\
extern IVTEntry ivtEntry##ivtNo;\
void interrupt interrupt##ivtNo(...){\
	ivtEntry##ivtNo.signal();\
	if(old)\
		ivtEntry##ivtNo.oldInterrupt();\
}\
IVTEntry ivtEntry##ivtNo(ivtNo, interrupt##ivtNo);

#endif /* H_MACRO_H_ */
