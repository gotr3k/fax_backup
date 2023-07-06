package karting;

import java.util.Stack;



public class Krivina extends Specificnost implements Cloneable{
	
	double maxbrzdoz;

	Stack<Double> starebrzine = new Stack<Double>();
	
	public Krivina(double maxbrzdoz) {
		
		this.maxbrzdoz=maxbrzdoz;
		
	}
	
	public double getMaxbrzdoz() {
		return maxbrzdoz;
	}

	@Override
	public void ispoljiEfekat(Object s) throws GNeodgovarajuciObjekat {
		if(!(s instanceof Vozilo)) throw new GNeodgovarajuciObjekat();
		double novabrzina=maxbrzdoz*((Vozilo)s).dohvUpravljivost();
		if(((Vozilo)s).dohvMaksBrzinu()>=novabrzina) {
			starebrzine.push(((Vozilo)s).dohvMaksBrzinu()); //cuvamo na steku stare vrednosti
			((Vozilo)s).postMaksBrzinu(novabrzina);
		}
	}

	@Override
	public void ponistiEfekat(Object s) throws GNeodgovarajuciObjekat {
		if(!(s instanceof Vozilo)) throw new GNeodgovarajuciObjekat();
		
		double novabrzina=maxbrzdoz*((Vozilo)s).dohvUpravljivost();
		
		if(((Vozilo)s).dohvMaksBrzinu()==novabrzina) {
			((Vozilo)s).postMaksBrzinu(starebrzine.pop());
		}
		
		
	}

	@Override
	public Krivina clone(){

		Krivina krivina = (Krivina) super.clone();
				
		Stack<Double> novi = new Stack<Double>();
		novi.addAll(starebrzine);
		
		krivina.starebrzine=novi;
		
		return krivina;
		
	}

	@Override
	public String toString() {
		return "K" + maxbrzdoz;
	}
	
	
	

}
