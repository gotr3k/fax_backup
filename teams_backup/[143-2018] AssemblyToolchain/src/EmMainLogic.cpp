#include "../inc/Em.hpp"

Emulator::Emulator(const std::string &inputFileName):isRunning(false),
memory(MEMORY_SIZE,{0,0}),reg(NUMBER_OF_REGISTERS,0),interruptRequests(NUMBER_OF_PERIFERIES,0),errorOccured(false),warningOccured(false){
  Emulator::inputFileName=inputFileName.substr(0,inputFileName.find_last_of('.'))+"_binary.o";
  Emulator::helperOutputFileName=Emulator::inputFileName.substr(0,Emulator::inputFileName.find_last_of('.'))+"_emulator_helper.txt";
}

void Emulator::emulate(){
  Emulator::helperOutputFileStream.open(Emulator::helperOutputFileName, std::ios::out);
  if(!Emulator::readDataFromInputFile()){
    Emulator::printResults();
    return;
  }
  if(!Emulator::loadDataToMemory()){
    Emulator::printResults();
    return;
  }

  Emulator::emulationLoop();
  Emulator::printResults();
  Emulator::helperOutputFileStream.close();
  return;
}

