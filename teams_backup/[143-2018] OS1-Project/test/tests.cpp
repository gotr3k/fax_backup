/*
 * tests.cpp
 *
 *  Created on: May 9, 2020
 *      Author: OS1
 */

#include "tests.h"
#include "utility.h"
#include <iostream.h>
//#include "thread.h"

Semaphore* s;
Semaphore* s1;

void TestKlasa2::run() {
	for (int i =0; i < 10; ++i) {
			lock
			cout<<"b() i = "<<i<<"ID procesa: "<<getId()<<endl;
			unlock
			if(i==4) {int b=s->wait(0); s->wait(30);}
			if(i==5) int c=s1->wait(100);
			if(i==10) cout<<"\nThread by id: "<<Thread::getThreadById(3)->getId()<<endl;
			for (int k = 0; k<10000; ++k)
				for (int j = 0; j <30000; ++j);
		}
}
void TestKlasa3::run() {
	for (int i =0; i < 10; ++i) {
			lock
			cout<<"c() i = "<<i<<"ID procesa: "<<getId()<<endl;
			unlock
			if(i==9) {int a=s->signal(0); s->wait(60);}
			for (int k = 0; k<10000; ++k)
				for (int j = 0; j <30000; ++j);
		}
}
/*
int userMain (int argc, char* argv[])
{
	s = new Semaphore(0);
	s1= new Semaphore(0);
	TestKlasa3* t3 = new TestKlasa3();
	TestKlasa2* t2 = new TestKlasa2();

	t3->start();
	t2->start();



	delete t2;
	delete t3;

	return 0;
}

*/
