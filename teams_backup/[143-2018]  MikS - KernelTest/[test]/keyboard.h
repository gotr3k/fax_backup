#ifndef __KEYBOARD_H
#define __KEYBOARD_H 
	#include "types.h"
	#include "interrupts.h"
	#include "port.h"
	
	class KeyboardDriver: public InterruptHandler
	{
		Port8Bit dataport;
		Port8Bit commandport;
		public:
			uint8_t key = 0x00;
			char* keyfig;
			KeyboardDriver(InterruptManager* manager);
			~KeyboardDriver();
			virtual char* CharSwitch(uint8_t hex);
			virtual uint32_t HandleInterrupt(uint32_t esp);
		
	};

#endif