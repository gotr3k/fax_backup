/*
 * lock.h
 *
 *  Created on: Aug 7, 2020
 *      Author: OS1
 */

#ifndef H_LOCK_H_
#define H_LOCK_H_


#define LOCK asm {pushf; cli;}

#define UNLOCK asm popf

#endif /* H_LOCK_H_ */
