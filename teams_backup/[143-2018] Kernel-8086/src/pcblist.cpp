/*
 * pcblist.cpp
 *
 *  Created on: Aug 7, 2020
 *      Author: OS1
 */

#include "../h/pcblist.h"
#include "../h/lock.h"
#include "../h/schedule.h"

#include <stdio.h>

nodePCB::nodePCB(PCB* pcb, nodePCB* next){
	this->pcb=pcb;
	this->next=next;
}

PCB_List::PCB_List(){
	this->head=0;
	this->tail=0;
}

nodePCB* PCB_List::getHead(){
	return this->head;
}
nodePCB* PCB_List::getTail(){
	return this->tail;
}

void PCB_List::remove_all_pcbs(){
	LOCK
	if(this!=0){
		if(head==0){
			UNLOCK
			return;
		}
		else{
			nodePCB* previousNode;
			while(head){
				head->pcb->state=READY;
				previousNode=head;
				head=head->next;
				previousNode->next=0;
			}
		}
		head=0;
		tail=0;
	}
	UNLOCK
}

PCB_List::~PCB_List(){
		LOCK
			while(popFront()!=0);
		UNLOCK
}

void PCB_List::add_pcb(PCB* pcb){
	LOCK
	if(pcb!=0){//mozda izaziva gresku
		nodePCB* newNode=new nodePCB(pcb);
		if(head==0){
			head=newNode;
		}
		else{
			tail->next=newNode;
		}
		tail=newNode;
	}//mozda izaziva gresku
	UNLOCK
}

PCB* PCB_List::popFront(){
	LOCK
	PCB* first=0;
	if(head!=0){
		first=head->pcb;
		nodePCB* temp=head;
		head=head->next;
		if(head==0) tail=0;
		delete temp;
	}
	first->state=READY;
	UNLOCK
	return first;
}

void PCB_List::unblockAll(){
	LOCK
	for(PCB* pcb;pcb=popFront();pcb->state=READY,Scheduler::put(pcb));
	UNLOCK
}

void PCB_List::remove_pcb(PCB* pcb){
	LOCK
	if(pcb!=0){
	if(head!=0){
			nodePCB* currentNode=head;
			nodePCB* previousNode;
			if(head->pcb->threadID==pcb->threadID){
				if(tail->pcb->threadID==pcb->threadID){
					tail=0;
					head=0;
				}
				else{
					head=head->next;
				}
				UNLOCK
				return;
			}
			else{
				previousNode=currentNode;
				currentNode=currentNode->next;
				while(currentNode!=0){
					if(currentNode->pcb->threadID==pcb->threadID){
						if(currentNode->pcb->threadID==tail->pcb->threadID){
							previousNode->next=0;
							tail=previousNode;
						}
						else{
							previousNode->next=currentNode->next;
						}
						UNLOCK
						return;
					}
					previousNode=currentNode;
					currentNode=currentNode->next;
				}
			}
		}
	}
	UNLOCK
}

Thread* PCB_List::getThreadById(ID id){
	LOCK
	nodePCB* currentNode=this->head;
	while(currentNode){
		if(currentNode->pcb->threadID==id){
			UNLOCK
			return currentNode->pcb->myThread;
		}
		currentNode=currentNode->next;
	}
	UNLOCK
	return 0;
}
void PCB_List::Test(){
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
		nodePCB* currentNode=head;
		while(currentNode!=0){
			printf("ThreadID: %d | StackSize: %d | TimeSlice: %d\n",currentNode->pcb->threadID, currentNode->pcb->stackSize, currentNode->pcb->timeSlice);
			currentNode=currentNode->next;
		}
	printf("\n");
	}
	UNLOCK
}
