package main;
import karting.*;

public class Main {

	public static void main(String[] args) {
		
		Vozilo v1 = new Vozilo(30.0, 3.0, 0.75, "Crash Bandicoot");
		
		Vozilo v2 = new Vozilo(40.0, 4.0, 0.5, "Coco Bandicoot");
		v2.postMaksBrzinu(40.0);
		v2.postUbrzanje(4.0);
		v2.postUpravljivost(0.5);
		v2.postTrenBrzinu(0.0);
		
		System.out.println(v1.toString());
		System.out.println(v2.dohvIme() + " [" + 
				v2.dohvMaksBrzinu() + ", " + 
				v2.dohvUbrzanje() + ", " +
				v2.dohvUpravljivost() + "]");
		
		System.out.println("Crash - predjeni put za 1s: " + v1.pomeriVozilo(1) + "s");
		System.out.println("Crash - trenutna brzina: " + v1.dohvTrenBrzinu() + "m/s");
		
		System.out.println("Coco - vreme za 200m: " + v2.izracunajVreme(200) + "m");
		System.out.println("Coco - trenutna brzina: " + v2.dohvTrenBrzinu() + "m/s");

		Vozilo v3 = new Vozilo(45, 2.5, 0.25, "Tiny Tiger");
		Specificnost s1 = new Krivina(40.0);
		try {
			s1.ispoljiEfekat(v3);
			System.out.println("Tiny - maksimalna brzina: " + v3.dohvMaksBrzinu() + "m/s");
			s1.ponistiEfekat(v3);
			System.out.println("Tiny - maksimalna brzina: " + v3.dohvMaksBrzinu() + "m/s");
		} catch (GNeodgovarajuciObjekat e) {
			System.err.println(e);
		}

		Deonica d = new Deonica(100.0);
		d.dodajSpecificnost(s1);
		d.dodajSpecificnost(((Krivina)s1).clone());
		d.dodajSpecificnost(((Krivina)s1).clone());
		d.izbaciSpecificnost(s1.dohvatiId());
		System.out.println("Specificnost na prvoj poziciji: " + d.dohvSpecificnost(0));
		
		System.out.println(d);
	}
}
