/*
 * kernelsem.cpp
 *
 *  Created on: May 10, 2020
 *      Author: OS1
 */

#include "ksem.h"
#include "utility.h"
#include "SCHEDULE.H"

KernelSem::KernelSem(int init) {
	value=init;
	blocked=new PCBList();

}


int KernelSem::val() const {
	return value;
}

KernelSem::~KernelSem() {
	delete blocked;
}

int KernelSem::stdsignal() {
	if(value++<0) {
		PCB* p = blocked->getFirst();
		p->blocked=0;
		p->waitReturn=1;
		Scheduler::put(p);
	}
	return 0;
}

int KernelSem::signal(int n) {
	if(n<0) return n; //ako je negativno vracamo tu vrednost parametra
	if(n==0) return stdsignal(); //ako je parametar 0, ponasa se kao standardni signal, vraca 0
	value +=n; //uvecavamo value
	if(value>=0) { //ako je n veci od broja blokiranih, odnosno nova vrednost value pozitivna, sve niti koje cekaju smo odblokirali
		blocked->unblockWholeList();
		return n-value; //vracamo broj odblokiranih niti
	}
	else { //ako je value i dalje negativno, nismo sve odblokirali, nego samo prvih n, po fifo principu
		for(int i=0;i<n;i++) {
			PCB* p = blocked->getFirst();
			p->blocked=0;
			p->waitReturn=1;
			Scheduler::put(p);
		}
		return n;
	}
}

int KernelSem::wait(Time maxTimeToWait) {

	value--;
	if(value<0) {
		PCB::running->blocked=1;
		PCB::running->blockedTime=maxTimeToWait;
		blocked->addPCBToList(PCB::running);
		dispatch();
	}
	return PCB::running->waitReturn;
}

//lista semafora

KSEMList* KSEMList::allSems=0;

KSEMList::KSEMList() {
	lock
	head=0;
	unlock
}

KSEMList::KSEMList(KernelSem *k) {
	lock
	head = new ksemNode();
	head->ksem=k;
	head->next=0;
	unlock
}

KSEMList::~KSEMList() {
	lock

	ksemNode* temp = head;
	ksemNode* temp2=temp;
	while (temp != 0) {
		temp2=temp;
		temp = temp->next;
		delete temp2;
	}

	unlock
}

void KSEMList::addKSEMToList(KernelSem *k) {
	lock
	ksemNode* newNode = new ksemNode();
		newNode->ksem=k;
		newNode->next=0;
		if(head==0) {
			head = newNode;
			return;
		}
		ksemNode* temp = head;
		while (temp->next != 0) {
			temp = temp->next;
		}
		temp->next=newNode;

	unlock
}

void KSEMList::removeKSEMFromList(KernelSem *k) {

	ksemNode * temp = head;
	if(head->ksem==k) {
		head=head->next;
		delete temp;
		return;
	}
	ksemNode * prev = temp;
	temp=temp->next;
	while(temp!=0) {
		if(temp->ksem==k) {
			prev->next=temp->next;
			delete temp;
			return;
		}
		prev=temp;
		temp=temp->next;
	}
}



void KSEMList::updateWholeList() { //prolazak kroz sve semafore i azuriranje svih blokiranih, u tajmeru

	ksemNode* temp = head;
	while (temp != 0) {
		temp->ksem->blocked->updateBlockedTime(temp->ksem);
		temp = temp->next;
	}

}



