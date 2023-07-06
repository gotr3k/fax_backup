/*
 * pcblist.cpp
 *
 *  Created on: Apr 28, 2020
 *      Author: OS1
 */

#include "pcblist.h"

#include "utility.h"
#include "SCHEDULE.H"
#include "pcb.h"
#include "ksem.h"

PCBList* PCBList::allPCBs=0;

PCBList::PCBList() {
	lock
	head=0;
	unlock
}

PCBList::PCBList(PCB* p) {
	lock
	head = new pcbNode();
	head->pcb=p;
	head->next=0;
	unlock
}

void PCBList::addPCBToList(PCB* p) {
	pcbNode* newNode = new pcbNode();
	newNode->pcb=p;
	newNode->next=0;
	if(head==0) {
		head = newNode;
		return;
	}
	pcbNode* temp = head;
	while (temp->next != 0) {
		temp = temp->next;
	}
	temp->next=newNode;
}

void PCBList::removePCBFromList(PCB* p) {
	pcbNode * temp = head;
	if(head->pcb==p) {
		head=head->next;
		delete temp;
		return;
	}
	pcbNode * prev = temp;
	temp=temp->next;
	while(temp!=0) {
		if(temp->pcb==p) {
			prev->next=temp->next;
			delete temp;
			return;
		}
		prev=temp;
		temp=temp->next;
	}
}


PCB* PCBList::getPCBById(ID id) {

	pcbNode* temp = head;
	while (temp != 0) {
		if (temp->pcb->id == id) {
			return temp->pcb;
		}
		temp = temp->next;
	}
	return 0;

}

void PCBList::unblockWholeList() {

	pcbNode* temp = head;
	pcbNode* temp2=temp;
		while (temp != 0) {
			temp->pcb->blocked=0;
			temp->pcb->waitReturn=1;
			Scheduler::put(temp->pcb);
			temp2=temp;
			temp = temp->next;
			delete temp2;
		}
	head=0;
}

PCB* PCBList::getFirst() {
	pcbNode* del=head;
	PCB* temp = head->pcb;
	head=head->next;
	delete del;
	return temp;
}

//funkcija koja se koristi u semaforu da azurira vreme blokiranja svake blokirane niti na tom semaforu, i azurira njihovo stanje po potrebi
void PCBList::updateBlockedTime(KernelSem *k) {

	pcbNode* temp = head;
	while (temp != 0) {
		if(temp->pcb->blockedTime==0) {
			temp = temp->next;
			continue; //ako je blok. vreme 0, znaci da nit ima beskonacno vreme blokiranja
		}
		temp->pcb->blockedTime--;
		if(temp->pcb->blockedTime==0) {//ako smo stigli do 0, ubacujemo, nit vise nije blokirana i ubacujemo je u scheduler i izbacujemo je iz liste blokiranih na semaforu
			temp->pcb->blocked=0;
			temp->pcb->waitReturn=0;
			k->value++;
			Scheduler::put(temp->pcb);
			pcbNode* temp2=temp->next;
			removePCBFromList(temp->pcb);
			temp=temp2;
			continue;
		}
		temp = temp->next;
	}

}


PCBList::~PCBList() {
	lock

	pcbNode* temp = head;
	pcbNode* temp2=temp;
	while (temp != 0) {
		temp2=temp;
		temp = temp->next;
		delete temp2;
	}

	unlock
}
