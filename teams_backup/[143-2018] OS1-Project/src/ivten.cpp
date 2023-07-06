/*
 * ivten.cpp
 *
 *  Created on: May 15, 2020
 *      Author: OS1
 */


#include "ivten.h"
#include "utility.h"
#include <dos.h>
#include "event.h"

IVTEntry* IVTEntry::entries[256]={0}; //treba dohvatiti objekte IVTEntry u zavisnosti od broja ulaza, tako da pamtimo svaki objekat IVTEntry na indeks broja ulaza za koji se definise



IVTEntry::IVTEntry(IVTNo entry, pInterrupt newRoutine) { //u konstruktoru ivtentry zamenjujemo prekidnu rutinu u ivt cuvajuci staru i u globalan niz objekata IVTEntry upisujemo novi objekat u zavisnosti za koji ulaz u ivt ga definisemo
	lock
	ent=entry;
	oldRoutine=getvect(entry);
	setvect(entry,newRoutine);
	kev=0;
	IVTEntry::entries[entry]=this;
	unlock
}

IVTEntry::~IVTEntry() {
	lock

	IVTEntry::entries[ent]=0; //u tabeli objekata na odg mesto stavljamo 0, ulaz postaje prazan
	setvect(ent,oldRoutine); // u destruktoru vracamo staru prekidnu rutinu u odgovarajuci ulaz

	unlock
}

void IVTEntry::EvSignal() {
	kev->signal();
}
