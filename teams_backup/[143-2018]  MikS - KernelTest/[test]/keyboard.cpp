#include "keyboard.h"

void printf(char*);
char* tochar(uint8_t val);

KeyboardDriver::KeyboardDriver(InterruptManager* manager)
: InterruptHandler(manager, 0x21),
dataport(0x60),
commandport(0x64)
{
	while(commandport.Read() & 0x1){
		dataport.Read();
	}
	commandport.Write(0xAE);
	commandport.Write(0x20);
	uint8_t status = (dataport.Read() | 1) & ~0x10;
	commandport.Write(0x60);
	dataport.Write(status);
	dataport.Write(0xF4);


}
KeyboardDriver::~KeyboardDriver(){

}
char* KeyboardDriver::CharSwitch(uint8_t hex){
	if(hex < 0x80){
		switch(hex){

			case 0x01: return ("ESC");

			case 0x29: return ("`");
			case 0x02: return ("1");
			case 0x03: return ("2");
			case 0x04: return ("3");
			case 0x05: return ("4");
			case 0x06: return ("5");
			case 0x07: return ("6");
			case 0x08: return ("7");
			case 0x09: return ("8");
			case 0x0A: return ("9");
			case 0x0B: return ("0");

			case 0x10: return ("q");
			case 0x11: return ("w");
			case 0x12: return ("e");
			case 0x13: return ("r");
			case 0x14: return ("t");
			case 0x15: return ("z");
			case 0x16: return ("u");
			case 0x17: return ("i");
			case 0x18: return ("o");
			case 0x19: return ("p");

			case 0x1E: return ("a");
			case 0x1F: return ("s");
			case 0x20: return ("d");
			case 0x21: return ("f");
			case 0x22: return ("g");
			case 0x23: return ("h");
			case 0x24: return ("j");
			case 0x25: return ("k");
			case 0x26: return ("l");

			case 0x2C: return ("y");
			case 0x2D: return ("x");
			case 0x2E: return ("c");
			case 0x2F: return ("v");
			case 0x30: return ("b");
			case 0x31: return ("n");
			case 0x32: return ("m");
			case 0x33: return (",");
			case 0x34: return (".");
			case 0x0C: return ("-");
			case 0x0D: return ("=");
			case 0x0E: return ("DEL");

			case 0x1C: return ("\n");
			case 0x39: return (" ");

			case 0x2A:
			case 0x36: return ("SHIFT");
			case 0x0F: return ("TAB");
			case 0x1D: return ("CTRL");
			case 0x38: return ("ALT");
			case 0x5B: return ("WIN");
			case 0x4B: return ("RIGHT");
			case 0x4D: return ("LEFT");
			case 0x48: return ("UP");
			case 0x50: return ("DOWN");

			case 0x1A: return ("[");
			case 0x1B: return ("]");
			case 0x2B: return ("\\");

			case 0x35: return ("/");
			case 0x37: return ("*");
			case 0x4A: return ("-");
			case 0x4E: return ("+");
			case 0x27: return (";");
			case 0x28: return ("\\");
			case 0x3A: return ("CAPS");

			default:
				char* foo = "00";
				char* d = "0123456789ABCDEF";
				foo[0] = d[(hex >> 4) & 0xF];
				foo[1] = d[hex & 0xF];
				return "0";
		}
	}else{
		key = 0xFA;
	}
}

uint32_t KeyboardDriver::HandleInterrupt(uint32_t esp){
	
	key = dataport.Read();
	keyfig = CharSwitch(key);
	// printf(keyfig);
	return esp;
}