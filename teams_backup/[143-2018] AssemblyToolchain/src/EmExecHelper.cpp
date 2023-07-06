#include "../inc/Em.hpp"

void Emulator::updateAfterInstr(){
  switch(Emulator::instr_updateType){
    case UpdateType::noupdate:{
      Emulator::helperOutputFileStream<<"No post-update of Reg["<<std::hex<<(int)Emulator::instr_srcReg<<"] = 0x"<<Emulator::reg[Emulator::instr_srcReg]<<std::endl;
      return;
    }
    case UpdateType::deca:{
      Emulator::helperOutputFileStream<<"Post-decrement of Reg["<<std::hex<<(int)Emulator::instr_srcReg<<"] = 0x"<<Emulator::reg[Emulator::instr_srcReg]<<std::endl;
      Emulator::reg[Emulator::instr_srcReg]-=2;
      break;
    }
    case UpdateType::inca:{
      Emulator::helperOutputFileStream<<"Post-increment of Reg["<<std::hex<<(int)Emulator::instr_srcReg<<"] = 0x"<<Emulator::reg[Emulator::instr_srcReg]<<std::endl;
      Emulator::reg[Emulator::instr_srcReg]+=2;
      break;
    }
  }
  Emulator::helperOutputFileStream<<"New value of Reg["<<std::hex<<(int)Emulator::instr_srcReg<<"] = 0x"<<Emulator::reg[Emulator::instr_srcReg]<<std::endl;
  return;
}

void Emulator::updateBeforeInstr(){
  switch(Emulator::instr_updateType){
    case UpdateType::noupdate:{
      Emulator::helperOutputFileStream<<"No pre-update of Reg["<<std::hex<<(int)Emulator::instr_srcReg<<"] = 0x"<<Emulator::reg[Emulator::instr_srcReg]<<std::endl;
      return;
    }
    case UpdateType::decb:{
      Emulator::helperOutputFileStream<<"Pre-decrement of Reg["<<std::hex<<(int)Emulator::instr_srcReg<<"] = 0x"<<Emulator::reg[Emulator::instr_srcReg]<<std::endl;
      Emulator::reg[Emulator::instr_srcReg]-=2;
      break;
    }
    case UpdateType::incb:{
      Emulator::helperOutputFileStream<<"Pre-increment of Reg["<<std::hex<<(int)Emulator::instr_srcReg<<"] = 0x"<<Emulator::reg[Emulator::instr_srcReg]<<std::endl;
      Emulator::reg[Emulator::instr_srcReg]+=2;
      break;
    }
  }
  Emulator::helperOutputFileStream<<"New value of Reg["<<std::hex<<(int)Emulator::instr_srcReg<<"] = 0x"<<Emulator::reg[Emulator::instr_srcReg]<<std::endl;
  return;
}

short Emulator::getOperandByAddrMode(){
  short result;
  switch(Emulator::instr_addrMode){
    case AddressingMode::immed:{
      Emulator::helperOutputFileStream<<"AddrMode: Immed | Operand = 0x"<<std::hex<<Emulator::instr_payload<<std::endl;
      return Emulator::instr_payload;
    }
    case AddressingMode::regdir:{
      Emulator::helperOutputFileStream<<"AddrMode: Regdir | Operand = Reg["<<std::hex<<(int)Emulator::instr_srcReg<<"] = 0x"<<Emulator::reg[Emulator::instr_srcReg]<<std::endl;
      return Emulator::reg[Emulator::instr_srcReg];
    }
    case AddressingMode::regind:{
      result=Emulator::readFromMemory(Emulator::reg[Emulator::instr_srcReg], WORD, true);
      Emulator::helperOutputFileStream<<std::hex<<"AddrMode: Regind | Operand = Mem(Reg["<<(int)Emulator::instr_srcReg<<"]) = Mem (0x"<<Emulator::reg[Emulator::instr_srcReg]<<") = 0x"<<result<<std::endl;
      return result;
    }
    case AddressingMode::regindmv:{
      result=Emulator::readFromMemory(Emulator::reg[Emulator::instr_srcReg]+Emulator::instr_payload, WORD, true);
      Emulator::helperOutputFileStream<<std::hex<<"AddrMode: Regind with displ | Operand = Mem(Reg["<<(int)Emulator::instr_srcReg<<"] + 0x"<<Emulator::instr_payload<<") = Mem (0x"<<Emulator::reg[Emulator::instr_srcReg]<<" + 0x"<<Emulator::instr_payload<<") = Mem (0x"<<Emulator::reg[Emulator::instr_srcReg]+Emulator::instr_payload<<") = 0x"<<result<<std::endl;
      return result;
    }
    case AddressingMode::memdir:{
      result=Emulator::readFromMemory(Emulator::instr_payload, WORD, true);
      Emulator::helperOutputFileStream<<std::hex<<"AddrMode: Memdir| Operand = Mem(0x"<<(int)Emulator::instr_payload<<") = 0x"<<result<<std::endl;
      return result;
    }
    case AddressingMode::regdirmv:{
      result=Emulator::reg[Emulator::instr_srcReg]+Emulator::instr_payload;
      Emulator::helperOutputFileStream<<std::hex<<"AddrMode: Regdir with displ| Operand = Reg["<<(int)Emulator::instr_srcReg<<"] + 0x"<<Emulator::instr_payload<<" = 0x"<<Emulator::reg[Emulator::instr_srcReg]<<" + 0x"<<Emulator::instr_payload<<" = 0x"<<result<<std::endl;
      return result;
    }
  }
  //none matched with given addresing mode
  Emulator::writeLineToHelperOutputTxt("Error while trying to match addressing mode. Returning 0x0.");
  return 0;
}

bool Emulator::setOperandByAddrMode(short value){
    switch(Emulator::instr_addrMode){
    case AddressingMode::immed:{
      Emulator::addError("Can't store value in immediate operand.");
      Emulator::writeLineToHelperOutputTxt("Can't store value in immediate operand.");
      return false;
    }
    case AddressingMode::regdir:{
      Emulator::helperOutputFileStream<<"AddrMode: Regdir | Operand = 0x"<<std::hex<<value<<std::endl;
      Emulator::reg[Emulator::instr_srcReg]=value;
      Emulator::helperOutputFileStream<<"Reg["<<std::hex<<(int)Emulator::instr_srcReg<<"] = 0x"<<std::hex<<Emulator::reg[Emulator::instr_srcReg]<<std::endl;
      return true;
    }
    case AddressingMode::regind:{
      Emulator::helperOutputFileStream<<"AddrMode: Regind | Operand = 0x"<<std::hex<<value<<std::endl;
      Emulator::writeToMemory(value, Emulator::reg[Emulator::instr_srcReg], WORD, true);
      Emulator::helperOutputFileStream<<"Mem(Reg["<<std::hex<<(int)Emulator::instr_srcReg<<"]) = Mem(0x"<<Emulator::reg[Emulator::instr_srcReg]<<") = 0x"<<std::hex<<Emulator::readFromMemory(Emulator::reg[Emulator::instr_srcReg],WORD,true)<<std::endl;
      return true;
    }
    case AddressingMode::regindmv:{
      Emulator::helperOutputFileStream<<"AddrMode: Regind with displ | Operand = 0x"<<std::hex<<value<<std::endl;
      Emulator::writeToMemory(value, Emulator::reg[Emulator::instr_srcReg]+Emulator::instr_payload, WORD, true);
      Emulator::helperOutputFileStream<<"Mem(Reg["<<std::hex<<(int)Emulator::instr_srcReg<<"] + 0x"<<std::hex<<Emulator::instr_payload<<") = 0x"<<Emulator::readFromMemory(Emulator::reg[Emulator::instr_srcReg]+Emulator::instr_payload,WORD,true)<<std::endl;
      return true;
    }
    case AddressingMode::memdir:{
      Emulator::helperOutputFileStream<<"AddrMode: Memdir| Operand = 0x"<<std::hex<<value<<std::endl;
      Emulator::writeToMemory(value, Emulator::instr_payload, WORD, true);
      Emulator::helperOutputFileStream<<"Mem(0x"<<std::hex<<Emulator::instr_payload<<") = 0x"<<Emulator::readFromMemory(Emulator::instr_payload,WORD,true)<<std::endl;
      return true;
    }
    case AddressingMode::regdirmv:{
      Emulator::addError("Can't store value in regdir with displacement operand.");
      Emulator::writeLineToHelperOutputTxt("Can't store value in regdir with displacement operand.");
      return false;
    }
  }
  //none matched with given addresing mode
  Emulator::writeLineToHelperOutputTxt("Error while trying to match addressing mode. Didn't set anything.");
  return false;
}