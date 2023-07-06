! inicijalizacija simulacije
dc x.1, x.9996
dc x.0, x.9998
onkp false, x.1, x.1
onkp false, x.1, x.1
onkp true, x.1, x.1
ondma x.1, x.1
ondma x.1, x.1
ondma x.1, x.1
ondma x.1, x.1
kpreg 1.1, r0, x.1
kpreg 1.1, r1, x.2
kpreg 1.1, r2, x.3
kpreg 1.1, r3, x.4
kpreg 1.1, r4, x.5
kpreg 1.1, r5, x.6
kpreg 1.1, r6, x.7
kpreg 1.1, r7, x.8
kpreg 2.1, r0, x.9
kpreg 2.1, r1, x.a
kpreg 2.1, r2, x.b
kpreg 2.1, r3, x.c
kpreg 2.1, r4, x.d
kpreg 2.1, r5, x.e
kpreg 2.1, r6, x.f
kpreg 2.1, r7, x.10
reg pc, x.4000
reg ivtp, x.4000
reg sp, x.9000
! kraj inicijalizacije


!ucitavanje ivt
org x.4000
clr r0
mvrir r0, ivtp
ldimm x.500, r0
stmem x.0, r0
ldimm x.1000, r0
stmem x.1, r0
ldimm x.1500, r0
stmem x.2, r0
ldimm x.2000, r0
stmem x.3, r0
ldimm x.2500, r0
stmem x.4, r0
ldimm x.3000, r0
stmem x.5, r0

!ucitavanje entry registara 
clr r0
stmem x.f102, r0
inc r0
stmem x.f142, r0
inc r0
stmem x.f202, r0
inc r0
stmem x.f002, r0
inc r0
stmem x.f042, r0
inc r0
stmem x.f0c2, r0

!globalne promenljive
ldimm x.5000, r1 !adresa 1
ldimm x.6000, r2 !adresa 2
ldimm x.8, r3 !counter 1 
ldimm x.9, r4 !counter 2
clr r5 !semafor

!pokretanje periferija
ldimm x.5, r0
stmem x.f100, r0
ldimm x.f, r0
stmem x.f200, r0

!ispitivanje bita spremnosti
ldimm x.1, r6
loop1:
ldmem x.f101, r7
tst r6, r7
beql loop1
ldmem x.f103, r7
stri [r1], r7
inc r1
dec r3
bneq loop1

!kp1 zavrsila, gasimo je

clr r0
stmem x.f100, r0

!vrtimo se dok ne primimo sve podatke iz kp2
loop2:
tst r5, r6
beql loop2

!prosledjivanje argumenata i pozivanje funkcije sumAll

ldimm x.5000, r1 !adresa 1
ldimm x.6000, r2 !adresa 2
ldimm x.8, r3 !counter 

push r3 
push r2
push r1

jsr sumAll

pop r1 !ciscenje steka
pop r2
pop r3

stmem x.9999, r0 !cuvanje rezultata sumAll 

clr r4 !semafor za dma
clr r6 
inc r6 !r6=1, za uporedjivanje

!DMA1.4, paketsko slanje niza B na 6100
stmem x.f0c5, r2 !izvorisna adresa 6000
ldimm x.6100, r0
stmem x.f0c6, r0 !odredisna adresa 6100
stmem x.f0c4, r3
ldimm x.be, r0
stmem x.f0c0, r0 !upis u kontrolni registar dma, pokretanje

waitDMA:
tst r4, r6
beql waitDMA

!Prenos niza A na KP1.2 meh prekida

ldimm x.5000, r1 !adresa 1
ldimm x.9, r2 !counter 
clr r3 !semafor
ldimm x.8e, r0 !aktiviranje per 1.2
stmem x.f140, r0

ldimm x.1, r6 !cekamo dok kp1.2 ne prenese sve
loop3:
tst r3, r6
beql loop3

clr r5 !semafor za DMA1.2
!prenos 9999 na DMA1.2
ldimm x.9999, r0
stmem x.f045, r0 !izvorisna adresa 
ldimm x.1, r3
stmem x.f044, r3
ldimm x.e, r0
stmem x.f040, r0 !upis u kontrolni registar dma, pokretanje

ldimm x.1, r6
waitDMA2:
tst r5, r6
beql waitDMA2

halt

sumAll:
mvrpl r6, sp
ldrid [r6]x.1, r7 !adresa1
ldrid [r6]x.2, r8 !adresa2
ldrid [r6]x.3, r9 !counter

!suma prvog niza
clr r0
mvrrl ra, r9 !brojac
sum1:
ldrid [r7]x.0, rb !trenutni element niza
add r0, r0, rb
inc r7
dec ra
bneq sum1

!suma drugog niza dodata na sumu prvog
mvrrl ra, r9 !brojac
sum2:
ldrid [r8]x.0, rb !trenutni element niza
add r0, r0, rb
inc r8
dec ra
bneq sum2

rts


org x.1500 !prekidna rutina kp2.1
dec r4 
beql terminate !da li smo dosli do kraja niza
ldmem x.f203, r8 
stri [r2], r8
inc r2
rti
terminate: !ako smo dosli do kraja, gasimo per2
inc r5 !postavljamo semafor
clr r0 
stmem x.f200, r0 !gasimo per2
rti

org x.3000 !dma1.4 prekidna rutina pocinje od 3000
inc r4 !semafor da smo zavrsili
clr r0
stmem x.f0c0, r0 !zaustavljanje dma
rti

org x.1000 !prekidna rutina kp1.2
dec r2 
beql terminate2 !da li smo dosli do kraja niza
ldrid [r1]x.0, r8
stmem x.f143, r8 
inc r1
rti
terminate2: !ako smo dosli do kraja, gasimo per1.2
inc r3 !postavljamo semafor
clr r0 
stmem x.f140, r0 !gasimo per1.2
rti

org x.2500 !dma1.2 prekidna rutina pocinje od 3000
inc r5 !semafor da smo zavrsili
clr r0
stmem x.f040, r0 !zaustavljanje dma
rti