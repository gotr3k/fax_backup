package main;

import pitanja.GNemaPitanja;
import pitanja.IteratorPitanja;
import pitanja.Pitanje;
import pitanja.PitanjeSaPonudjenimOdgovorima;
import pitanja.ZbirkaPitanja;

public class Main {

	public static void main(String[] args) {
		Pitanje p1 = new Pitanje("Kada se koristi kljucna rec final?", 5, 5.5);
		Pitanje p2 = new PitanjeSaPonudjenimOdgovorima("Omotacka klasa tipa char je: ", 10, 3.5, new String[] {"Char", "Character", "String"});
		Pitanje p3 = new Pitanje("Da li se volatile promenljive kesiraju?", 10, 7.0);
		
		ZbirkaPitanja k = new ZbirkaPitanja();
		try {
			k.dodaj(p3);
			k.dodaj(p1);
			k.dodaj(p2);
			
			System.out.println(k.dohvati(0));
			System.out.println();
			
			IteratorPitanja iter = k.iterator();
			while(iter.postoji()) {
				System.out.println(iter.dohvati());
				iter.sledece();
			}
		}
		catch (GNemaPitanja g) {}
		catch (Exception e) {}
		
		
		
	}
}
