/*
 * semlist.cpp
 *
 *  Created on: Aug 17, 2020
 *      Author: OS1
 */
#include "../h/semlist.h"
#include "../h/lock.h"
#include "../h/schedule.h"
#include "../h/system.h"

#include <stdio.h>

nodeSem::nodeSem(PCB* pcb, KernelSem* kernelSem, Time waitingTime){
	this->pcb=pcb;
	this->waitingTime=waitingTime;
	this->kernelSem=kernelSem;
	unlimitedWaiting=0;
	if(waitingTime==0)
		unlimitedWaiting=1;
	this->next=0;
}
Sem_List::Sem_List(){
	head=0;
	tail=0;
}

Sem_List::~Sem_List(){
	LOCK
		while(popFront()!=0);
	UNLOCK
}

nodeSem* Sem_List::getHead(){
	return this->head;
}

nodeSem* Sem_List::getTail(){
	return this->tail;
}

PCB* Sem_List::popFront(){
	LOCK
	PCB* first=0;
	if(head!=0){
		first=head->pcb;
		nodeSem* temp=head;
		head=head->next;
		if(head==0)
			tail=0;
		delete temp;
	}
	first->state=READY;
	UNLOCK
	return first;
}

void Sem_List::unblockAll(){
	LOCK
		for(PCB* pcb;pcb=popFront();pcb->state=READY,Scheduler::put(pcb));
	UNLOCK
}

int Sem_List::unblockAllOneSem(KernelSem* kernelSem){//testirati
	LOCK
	int counter=0;
	nodeSem* currentNode;
	nodeSem* previousNode;
	if(head!=0){
		while(head->kernelSem==kernelSem){
			head->pcb->state=READY;
			Scheduler::put(head->pcb);
			LOCK
			printf("ODBLOKIRAN%d",head->pcb->threadID);
			UNLOCK
			counter++;
			head=head->next;
			if(head==0){
				tail=0;
				UNLOCK
				return counter;
			}
		}
		previousNode=head;
		currentNode=head->next;
		while(currentNode!=0){
			if(currentNode->kernelSem==kernelSem){
				currentNode->pcb->state=READY;
				Scheduler::put(currentNode->pcb);
				LOCK
				printf("ODBLOKIRAN%d",currentNode->pcb->threadID);
				UNLOCK
				counter++;
				currentNode=currentNode->next;
				previousNode->next=currentNode;
			}
			else{
				previousNode=currentNode;
				currentNode=currentNode->next;
			}
		}
		tail=previousNode;
	}
	UNLOCK
	return counter;
}

int Sem_List::unblockNOneSem(KernelSem* kernelSem, int n){//TESTIRATI DOBRO ZBOG IZLASKA ZBOG COUNTERA!!!
	LOCK
	int counter=0;
	nodeSem* currentNode;
	nodeSem* previousNode;
	if(head!=0){
		while(head->kernelSem==kernelSem){
			head->pcb->state=READY;
			Scheduler::put(head->pcb);
			LOCK
			printf("ODBLOKIRAN%d",head->pcb->threadID);
			UNLOCK
			counter++;
			head=head->next;
			if(head==0){
				tail=0;
				UNLOCK
				return counter;
			}
			if(counter==n){
				UNLOCK
				return counter;
			}
		}
		previousNode=head;
		currentNode=head->next;
		while(currentNode!=0){
			if(currentNode->kernelSem==kernelSem){
				currentNode->pcb->state=READY;
				Scheduler::put(currentNode->pcb);
				LOCK
				printf("ODBLOKIRAN%d",currentNode->pcb->threadID);
				UNLOCK
				counter++;
				currentNode=currentNode->next;
				previousNode->next=currentNode;
				if(counter==n){
					if(currentNode==0){
						tail=previousNode;
					}
					UNLOCK
					return counter;
				}
			}
			else{
				previousNode=currentNode;
				currentNode=currentNode->next;
			}
		}
		tail=previousNode;
	}
	UNLOCK
	return counter;
}

void Sem_List::unblockAllTime(){//testirati
	LOCK
		if(head!=0){
			head->pcb->timeSpentWaitingOnSem++;
			if(head->unlimitedWaiting==0){
				head->waitingTime--;
			}
			//printf("\nNit %d:\nWaitingTime:%d\nTimeSpentWaiting:%d\n", head->pcb->threadID,head->waitingTime, head->pcb->timeSpentWaitingOnSem);
			while(head->waitingTime<=0 && head->unlimitedWaiting==0){
				nodeSem* currentNode=head;
				head->pcb->state=READY;
				Scheduler::put(head->pcb);
				LOCK
				printf("ODBLOKIRAN%d",head->pcb->threadID);
				UNLOCK
				head->kernelSem->value++;
				head=head->next;
				head->pcb->timeSpentWaitingOnSem++;
				delete currentNode;
				if(head->unlimitedWaiting==0){
					head->waitingTime--;
				}
				//printf("\nNit %d:\nWaitingTime:%d\nTimeSpentWaiting:%d\n", head->pcb->threadID,head->waitingTime, head->pcb->timeSpentWaitingOnSem);
				if(head==0){
					tail=0;
					UNLOCK
					return;
				}
			}
			nodeSem* previousNode=head;
			nodeSem* currentNode=head->next;
			while(currentNode!=0){
				currentNode->pcb->timeSpentWaitingOnSem++;
				if(currentNode->unlimitedWaiting==0){
					currentNode->waitingTime--;
				}
				//printf("\nNit %d:\nWaitingTime:%d\nTimeSpentWaiting:%d\n", currentNode->pcb->threadID,currentNode->waitingTime, currentNode->pcb->timeSpentWaitingOnSem);
				if(currentNode->waitingTime<=0 && currentNode->unlimitedWaiting==0){
					nodeSem* temp=currentNode;
					currentNode->pcb->state=READY;
					Scheduler::put(currentNode->pcb);
					LOCK
					printf("ODBLOKIRAN%d",currentNode->pcb->threadID);
					UNLOCK
					currentNode->kernelSem->value++;
					currentNode=currentNode->next;
					previousNode->next=currentNode;
					delete temp;
				}
				else{
					previousNode=currentNode;
					currentNode=currentNode->next;
				}
			}
			tail=previousNode;
		}
		UNLOCK
}


void Sem_List::add_pcb(PCB* pcb, KernelSem* kernelSem, Time waitingTime){
	LOCK
		if(pcb!=0){//mozda izaziva gresku
			nodeSem* newNode=new nodeSem(pcb,kernelSem,waitingTime);
			if(head==0){
				head=newNode;
				//LOCK
				//printf("\nNit %d dodata na pocetak liste!",pcb->threadID);
				//UNLOCK
			}
			else{
				tail->next=newNode;
				//LOCK
				//printf("\nNit %d dodata na kraj liste!",tail->next->pcb->threadID);
				//UNLOCK
			}
			tail=newNode;
			//System::blockedList->Test();
		}//mozda izaziva gresku
	UNLOCK
}

void Sem_List::Test(){
	LOCK
	if(this==0){
		printf("\nLista ne postoji!");
		UNLOCK
		return;
	}
	printf("\nLista:\n");
	if(head==0){
		printf("Lista je prazna!");
		UNLOCK
		return;
	}
	else{
		nodeSem* currentNode=head;
		while(currentNode!=0){
			printf("ThreadID: %d\n",currentNode->pcb->threadID);
			currentNode=currentNode->next;
		}
	printf("\n");
	}
	UNLOCK
}



