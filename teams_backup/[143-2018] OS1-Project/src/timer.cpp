/*
 * timer.cpp
 *
 *  Created on: Apr 25, 2020
 *      Author: OS1
 */



#include "timer.h"
#include <dos.h>
#include "utility.h"
#include "SCHEDULE.H"


static pInterrupt oldRoutine; //promenljiva u kojoj pamtimo adresu stare prekidne rutine koju je nakon zavrsetka programa potrebno vratiti na zeljeni ulaz


void Timer::initTimerInterrupt() { //postavljamo adresu nase prekidne rutine u ulaz 8 (tajmer poziva prekidnu rutinu u ovom ulazu) i cuvamo staru zbog restauracije na kraju

	lock
	oldRoutine = getvect(8);
	setvect(8,Timer::timer);
	setvect(0x60, oldRoutine); //staru rutinu smo upisali u ulaz 60 jer ce biti potrebno pozivati je u novoj prekidnoj rutini, jer ce tajmer eventualno prestati da salje zahteve za prekid ako se ta prekidna rutina tajmera
	unlock	//ne poziva neko vreme

}

void Timer::restoreTimerInterrupt() { //funkcija za vracanje stare prekidne rutine u ulaz 8

	lock
	setvect(8, oldRoutine);
	unlock

}

static volatile unsigned tss; //pomocne promenljive za prihvatanje i prosledjivanje sp, ss i bp
static volatile unsigned tsp;
static volatile unsigned tbp;

//explicit_dispatch da bi znali kada je timer pozvana iz funkcije dispatch(), drugacije se ponasa ako je pozvana eksplicitno samo za promenu konteksta a drugacije ako je pozvana kao posledica prekida tajmera
volatile int Timer::explicit_dispatch=0; //volatile da prevodilac ne bi uvodio optimizaciju upisivanjem 0 svude gde se pominje naziv ove promenljive smatrajuci da se nece nikad koristiti jer se koristi samo u prekidnoj rutini
volatile int Timer::counter=0;

void interrupt Timer::timer(...) { //prekidna rutina tajmera

	if (!explicit_dispatch) {
		tick();
		KSEMList::allSems->updateWholeList(); //ako nije pozvana eksplicitno, odnosno pozvana je kao posledica tajmera, azurira sve semafore i sve blokirane niti na semaforima, azurirajuci im vreme cekanja

	}

	if(!explicit_dispatch && counter==0) { //ako je pozvana kao tajmer i counter je 0, to znaci da nit nema ograniceno vreme izvrsavanja, potrebno je samo pozvati staru prekidnu rutinu i vratiti se
		asm int 60h;
		return;
	}

	if (!explicit_dispatch) counter--; //ako ipak nije ograniceno vreme, umanjuje brojac
	if (counter == 0 || explicit_dispatch) { //kada counter dodje do 0 ili je rutina pozvana kao posledica dispatch, potrebno je promeniti kontekst

		if(PCB::running->finished==0&&PCB::running->blocked==0&&PCB::running!=BackgroundThread::bg->myPCB) {//Ako nit nije zavrsila i nije blokirana i nije pozadinska, dodati je u scheduler

			Scheduler::put(PCB::running);
		}

		asm {
			// cuva sp
			mov tsp, sp
			mov tss, ss
			mov tbp, bp
		}

		PCB::running->sp = tsp; //u pcb trenutne/stare niti cuvamo sp i ss da bi znali gde da nastavimo, na steku se nalazi pc sacuvan gde treba da se vratimo nakon izlaska iz prekidne rutine
		PCB::running->ss = tss;
		PCB::running->bp = tbp;

		PCB::running = Scheduler::get(); //uzimamo iz schedulera novu nit
		if(PCB::running==0) {
			PCB::running=BackgroundThread::bg->myPCB; //ako nema spremnih niti, uzimamo nit koja se samo vrti i sluzi da bi sacekali da se neka druga nit odblokira
		}

		tsp = PCB::running->sp;
		tss = PCB::running->ss;
		tbp = PCB::running->bp;

		counter = PCB::running->quantum; //postavljamo brojac na vrednost trajanja novoizabrane niti

		asm {
			// restaurira sp
			mov sp, tsp
			mov ss, tss
			mov bp, tbp
		}
	}


	if(!explicit_dispatch) asm int 60h; //na kraju ako je prekidna rutina posledica tajmera, moramo pozvati i staru prekidnu rutinu inace tajmer nece vise slati prekide nakon nekog vremena nepozivanja originalne prekidne rutine

	explicit_dispatch = 0; //postavljamo explicit_dispatch na 0 za sledeci put ako je bio 1 da se u sledecem pozivu tajmera ne ponasa i dalje kao da je pozvan iz dispatcha

}



