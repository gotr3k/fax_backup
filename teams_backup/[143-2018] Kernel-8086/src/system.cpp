/*
 * system.cpp
 *
 *  Created on: Aug 9, 2020
 *      Author: OS1
 */

#include "../h/system.h"
#include "../h/pcb.h"
#include "../h/schedule.h"
#include "../h/lock.h"
#include <stdio.h>

volatile PCB* System::running;
IdlePCB* System::idle;
PCB* System::main;
PCB_List* System::pcbList=new PCB_List();
volatile Sem_List* System::blockedList=new Sem_List();
volatile int System::counter;//treba inicijalizovati na pocetku maina
volatile int System::context_switch_on_demand;//treba inicijalizovati na nulu na pocetku maina
static volatile unsigned tsp, tss, tbp;
static unsigned oldTimerOFF, oldTimerSEG;

extern void tick();

void interrupt timer(){
	//printf("\nUSLI SMO U TAJMER, RUNNING=%d",System::running->threadID);
	if(!System::context_switch_on_demand){
		asm{
			int 60h
		}
		//printf("\nINT 60h obavljen");
		System::blockedList->unblockAllTime();
		//printf("\nOdblokirane niti kojima je isteklo vreme!");
		tick();
		if(System::counter>0 && System::running->timeSlice!=0){
			System::counter--;
			//printf("\nSMANJILI SMO BROJAC NA %d",System::counter);
		}
	}
	if(System::context_switch_on_demand || (System::counter==0 && System::running->timeSlice!=0)){
		asm{
			mov tsp, sp
			mov tss, ss
			mov tbp, bp
		}

		System::running->sp=tsp;
		System::running->ss=tss;
		System::running->bp=tbp;


		if((System::running->state==RUNNING || System::running->state==READY) && System::running->threadID!=System::idle->threadID){//ako nit nije zavrsena ili blokirana i ako nije idle ili *main PROVERITI
			System::running->state=READY;
			//printf("\nStavili smo running sa id %d u Scheduler\n",System::running->threadID);//ne stavlja lepo u scheduler
			Scheduler::put((PCB*)System::running);
		}

		//printf("\nPre nego sto smo uzeli nit iz Schedulera!");
		System::running=Scheduler::get();//nekad nam vraca nit sa id 1740 dok je running=idle, proveriti stavljanje u scheduler!!!
		//printf("\nUzeli smo novi running iz Schedulera sa id %d\n",System::running->threadID);
		if(System::running==0){//ako nema niti u scheduleru spremnih
			System::running=System::idle;//proveriti CAST
			//printf("\nIDLE je RUNNING");
		}
		System::running->state=RUNNING;
		System::counter=System::running->timeSlice;
		tsp=System::running->sp;
		tss=System::running->ss;
		tbp=System::running->bp;

		//printf("\nPRE ASM");
		asm{
			mov sp, tsp
			mov ss, tss
			mov bp, tbp
		}
		//printf("\nPOSLE ASM");
		System::context_switch_on_demand=0;
		//printf("\n%d",System::running->threadID);
		//printf("\nIZLAZIMO IZ TAJMERA, RUNNING=%d",System::running->threadID);
	}
}

void initialize(){
asm{
	cli
	push es
	push ax

	mov ax,0
	mov es,ax

	//pamtimo staru rutinu
	mov ax, word ptr es:0022h
	mov word ptr oldTimerSEG, ax
	mov ax, word ptr es:0020h
	mov word ptr oldTimerOFF, ax

	//postavljamo novu rutinu
	mov word ptr es:0022h, seg timer
	mov word ptr es:0020h, offset timer

	//postavljamo staru rutinu na int 60h
	mov ax, oldTimerSEG
	mov word ptr es:0182h, ax
	mov ax, oldTimerOFF
	mov word ptr es:180h, ax

	pop ax
	pop es
	sti
}
}

void restore(){
	asm{
		cli
		push es
		push ax

		mov ax, 0
		mov es, ax

		mov ax, word ptr oldTimerSEG
		mov word ptr es:0022h, ax
		mov ax, word ptr oldTimerOFF
		mov word ptr es:0020h, ax

		pop ax
		pop es
		sti
	}
}

