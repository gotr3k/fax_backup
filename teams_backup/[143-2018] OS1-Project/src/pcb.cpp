/*
 * pcb.cpp
 *
 *  Created on: Apr 26, 2020
 *      Author: OS1
 */


#include "utility.h"
#include "pcb.h"
#include <dos.h>
#include "SCHEDULE.H"
#include <iostream.h>
#include "pcblist.h"


unsigned PCB::sid=0; //staticka promenljiva koja nam sluzi za dodavanje IDova PCBovima
PCB* PCB::running=0; //globalna promenljiva running koja predstavlja pokazivac na nit koja se trenutno izvrsava
PCB* PCB::mainPCB=0; //pcb glavnog programa

PCB::PCB(StackSize stackSize, Time timeSlice, Thread* thr) {
	lock

	if (stackSize > 4096) stackSize = 4096; //4096*16(adresibilna jedinica)=64KB
	unsigned size=stackSize/sizeof(unsigned int);
	stack= new unsigned[size]; //alociramo memoriju za stek, i postavljamo pokazivac stack na pocetak niza

	//Kreiranje PCB i steka, moramo inicijalizovati i pocetne podatke na steku, i to tako da odgovaraju pocetnom pozivanju dispatch.
	//Promena konteksta se vrsi u interrupt funkciji, pri cijem pozivu se stavlja gomila registara na stek
	//Pri prvom promenu konteksta na novu nit, ocekuje se da je stek u odgovarajucem stanju, da bi se lepo vratili iz te prekidne rutine kada promenimo sp i ss registar na one iz PCB-a nove niti
	//stek raste unazad, pokazuje na poslednju zauzetu lokaciju

	stack[size-1]=0x200; //prvo se na stek stavlja PSW pri skoku na prekidnu rutinu, upisujemo ovu vrednost jer tako postavljamo I bit PSW registra sacuvanog na steku na 1, da bi kada se vratili iz
	//prekidne rutine bili dozvoljeni maskirajuci prekidi

	stack[size-2] = FP_SEG(&(wrapper)); //sledeca dva polja na steku jesu segmentni i ofsetni deo PC
	stack[size-3] = FP_OFF(&(wrapper)); //na pocetku PC treba da pokazuje na pocetak funkcije koju izvrsava nit, odnosno wrapper funkcije

	sp = bp = FP_OFF(stack+(size-12)); //dodaju se jos neki registri prilikom ulaska u prekidnu rutinu pa pomeramo za 12 mesta nanize
	ss = FP_SEG(stack+(size-12)); //nije potrebno definisati i ostale pocetne vrednosti na steku koje ce zavrsiti u ostalim registrima nakon promene konteksta jer nisu bitne njihove vrednosti
	finished=0;
	quantum=timeSlice;
	myThread=thr; //pcb mora da zna za koju nit je vezan jer je u nekim situacijama potrebno znati nit koja odgovara datom pcb
	blockedByThis=new PCBList(); //inicijalizujemo listu pcb-ova koju ova (this) pcb blokira, tako sto cekaju da se odblokiraju kad pcb zavrsi (za implementaciju waitToComplete metode)
	blockedTime=0; //koliko najduze nit ostale blokirana, korisceno pri implementaciji semafora, tacnije wait metode koja kao parametar prima upravo maskimalno vreme koliko ce dugo nit ostati blokirana
	blocked=0; //fleg koji oznacava da li je nit blokirana
	waitReturn=0;

	id=++sid;

	unlock
}

void PCB::wrapper() {
	running->myThread->run();
	running->finished=1;
	lock
	 //dosli smo do kraja, ako ima niti koja ceka na zavrsetak, ubacujemo sve niti u scheduler i oznacavamo da nisu blokirane
	running->blockedByThis->unblockWholeList();
	unlock
	dispatch();
}

void PCB::initRunning(Thread* t) {
	running=t->myPCB;
}

Thread* PCB::getThread() {
	return myThread;
}

PCB::~PCB() { //brise se kad se brise i thread, vec smo u destruktoru thread-a uklonili iz liste
	delete blockedByThis;
	delete [] stack; //dealokacija prostora za stek

}
