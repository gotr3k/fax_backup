#include "../inc/Em.hpp"
#include <bitset>
#include <unistd.h>

void Emulator::requestIntOnLine(char intLineNumber){
  Emulator::writeLineToHelperOutputTxt("Interrupt requested on line "+std::to_string(intLineNumber)+"; Current psw="+std::to_string(Emulator::rpsw));
  if(intLineNumber>=0 && intLineNumber<NUMBER_OF_PERIFERIES){
    Emulator::interruptRequests[intLineNumber]=true;
    for(int i=0; i<Emulator::interruptRequests.size(); i++){
      Emulator::writeLineToHelperOutputTxt("InterruptRequest["+std::to_string(i)+"]="+std::to_string(Emulator::interruptRequests[i]));
    }
  }
}

void Emulator::processInterrupts(){
  Emulator::writeLineToHelperOutputTxt("Processing interrupts:");
  if(!Emulator::getFlag(Flag::I)){
    
    //add code for timer intr

    if(Emulator::interruptRequests[TERMINAL_INTR_REQUEST_LINE_NUMBER]==true){
      Emulator::writeLineToHelperOutputTxt("Pending terminal request.");
      if(!Emulator::getFlag(Flag::Tl)){
        Emulator::writeLineToHelperOutputTxt("Processing terminal interrupt:");
        Emulator::interruptRequests[TERMINAL_INTR_REQUEST_LINE_NUMBER]=false;
        Emulator::jmpOnInterruptRoutine(IVT_ENTRY_TERMINAL);
      }
      else{
        Emulator::writeLineToHelperOutputTxt("Terminal interrupts are masked.");
      }
    }
  }
  else{
    Emulator::writeLineToHelperOutputTxt("External interrupts are masked.");
  }
}

void Emulator::jmpOnInterruptRoutine(char ivtEntry){
  Emulator::writeLineToHelperOutputTxt("Jumping to interrupt routine in entry "+std::to_string(ivtEntry));
  Emulator::pushOnStack(Emulator::rpc);
  Emulator::pushOnStack(Emulator::rpsw);
  Emulator::rpc=Emulator::readFromMemory((ivtEntry%8)*2, WORD, true);
  Emulator::helperOutputFileStream<<"PC set to 0x"<<std::hex<<Emulator::rpc<<std::endl;
  //enable intr
  Emulator::setFlag(Flag::I);
  Emulator::setFlag(Flag::Tr);
  Emulator::setFlag(Flag::Tl);
}

//||=========================================================||
//||=========================================================||
//||=========================================================||
//||                       TERMINAL                          ||
//||=========================================================||
//||=========================================================||
//||=========================================================||

//check https://pubs.opengroup.org/onlinepubs/7908799/xsh/termios.h.html
//and https://www.ibm.com/docs/en/aix/7.2?topic=files-termiosh-file

bool Emulator::startTerminal(){
  Emulator::writeLineToHelperOutputTxt("\nSTARTING TERMINAL");

  if(tcgetattr(0,&(Emulator::defaultTerminalSettings))==-1){
    Emulator::addError("Can't get terminal's default settings.");
    Emulator::writeLineToHelperOutputTxt("Can't get initial terminal settings");
    return false;
  }

  Emulator::printTerminalSettings("Initial", Emulator::defaultTerminalSettings);
  
  //making some adjustments to term settings to suit our needs
  termios newTerminalSettings=Emulator::defaultTerminalSettings;
  newTerminalSettings.c_lflag &= ~ECHO; //don't write to display
  //newTerminalSettings.c_lflag &= ~ECHONL; //????? the program doesn't work without this for some reason, returns false from this function????????????????
  newTerminalSettings.c_lflag &= ~ICANON; //disable canonical input
  newTerminalSettings.c_lflag &= ~IEXTEN; //disable extended input char processing
  newTerminalSettings.c_cc[VMIN]=0; //wait for 0 characters before reading
  newTerminalSettings.c_cc[VTIME]=0; //no wait time before reading 2 chars one after another

  if(tcsetattr(0, TCSAFLUSH, &newTerminalSettings)==-1){
    Emulator::addError("Can't set new terminal settings.");
    Emulator::writeLineToHelperOutputTxt("Can't save new terminal settings.");
    return false;
  }

  Emulator::printTerminalSettings("Changed", newTerminalSettings);
  return true;
}

void Emulator::restoreDefaultTermSettings(){
  tcsetattr(0,TCSAFLUSH, &(Emulator::defaultTerminalSettings));
}

void Emulator::readCharFromTerminal(){
  Emulator::writeLineToHelperOutputTxt("\nReading a character from terminal");
  char c;
  if(read(0,&c,1)==1){
    Emulator::helperOutputFileStream<<"Read char = "<<c<<std::endl;
    Emulator::writeToMemory(c,TERM_IN, WORD, true);
    Emulator::writeLineToHelperOutputTxt("Requesting intr");
    Emulator::requestIntOnLine(TERMINAL_INTR_REQUEST_LINE_NUMBER);
  }
  Emulator::writeLineToHelperOutputTxt("No chars to be read");
}

void Emulator::stopTerminal(){
  Emulator::writeLineToHelperOutputTxt("\nSTOPPING TERMINAL and restoring default settings");
  restoreDefaultTermSettings();
}

void Emulator::printTerminalSettings(const std::string& str, termios settings){
  Emulator::helperOutputFileStream<<str<<" terminal settings:"<<std::endl;
  Emulator::helperOutputFileStream<<"\tInput modes (c_iflag)    = 0b"<<std::bitset<8*sizeof(settings.c_iflag)>(settings.c_iflag)<<std::endl; //input modes
  Emulator::helperOutputFileStream<<"\tOutput modes (c_oflag)   = 0b"<<std::bitset<8*sizeof(settings.c_oflag)>(settings.c_oflag)<<std::endl; //output modes
  Emulator::helperOutputFileStream<<"\tControl modes (c_cflag)  = 0b"<<std::bitset<8*sizeof(settings.c_cflag)>(settings.c_cflag)<<std::endl; //control modes
  Emulator::helperOutputFileStream<<"\tLocal modes (c_lflag)    = 0b"<<std::bitset<8*sizeof(settings.c_lflag)>(settings.c_lflag)<<std::endl; //local modes
  Emulator::helperOutputFileStream<<"\t\tICANON[1] = "<<((settings.c_lflag&ICANON)>>1)<<std::endl;
  Emulator::helperOutputFileStream<<"\t\tECHO[3]   = "<<((settings.c_lflag&ECHO)>>3)<<std::endl;
  Emulator::helperOutputFileStream<<"\t\tIEXTEN[15] = "<<((settings.c_lflag&IEXTEN)>>15)<<std::endl;
  Emulator::helperOutputFileStream<<"\tVTIME (c_cc[VTIME])      = "<<int(settings.c_cc[VTIME])<<std::endl;
  Emulator::helperOutputFileStream<<"\tVMIN (c_cc[VMIN])        = "<<int(settings.c_cc[VMIN])<<std::endl;
}