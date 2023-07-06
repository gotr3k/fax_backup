ASSEMBLER = assembler
LINKER = linker
EMULATOR = emulator

ASSEMBLER_SOURCE_CPP_LIST = \
src/AsMain.cpp \
src/AsMainLogic.cpp \
src/AsConversionsAndErrors.cpp \
src/AsProcess.cpp \
src/AsRegexes.cpp \
src/AsRelocTable.cpp \
src/AsSectionTable.cpp \
src/AsSymbolTable.cpp

LINKER_SOURCE_CPP_LIST = \
src/LdMain.cpp \
src/LdMainLogic.cpp \
src/LdSymbolTable.cpp \
src/LdSymbolTablesForAllAsFiles.cpp \
src/LdSectionTable.cpp \
src/LdSectionTablesForAllAsFiles.cpp \
src/LdRelocTable.cpp \
src/LdRelocTablesForAllAsFiles.cpp \
src/LdConversionsAndErrors.cpp

EMULATOR_SOURCE_CPP_LIST = \
src/EmMain.cpp \
src/EmMainLogic.cpp \
src/EmDataAndFiles.cpp \
src/EmMemoryOperations.cpp \
src/EmRegStackFlag.cpp \
src/EmExecHelper.cpp \
src/EmEmulation.cpp \
src/EmInterrupts.cpp \
src/EmErrors.cpp \

vpath src/%.cpp $(sort $(dir $(ASSEMBLER_SOURCE_CPP_LIST)))

CC = g++

all : cleanTxt cleanO cleanFormattedS cleanHex $(ASSEMBLER) $(LINKER) $(EMULATOR)

$(ASSEMBLER) : $(ASSEMBLER_SOURCE_CPP_LIST) 
	$(CC) $(^) -o $(@)

$(LINKER) : $(LINKER_SOURCE_CPP_LIST) 
	$(CC) $(^) -o $(@)

$(EMULATOR) : $(EMULATOR_SOURCE_CPP_LIST)
	$(CC) $(^) -o $(@)

cleanTxt:
	-find . -name "*.txt" -type f -delete

cleanO:
	-find . -name "*.o" -type f -delete

cleanFormattedS:
	-find . -name "*_formatted.s" -type f -delete

cleanHex:
	-find . -name "*.hex" -type f -delete