package karting;

import java.util.ArrayList;



public class Deonica implements Cloneable{

	private double duzina;
	ArrayList<Specificnost> specs= new ArrayList<Specificnost>();
	
	public Deonica(double duzina) {
		super();
		this.duzina = duzina;
		
	}
	
	
	
	public double getDuzina() {
		return duzina;
	}



	public void dodajSpecificnost(Specificnost s) {
		specs.add(s);
	}
	
	public void izbaciSpecificnost(int a) {
		for(int i=0; i < specs.size();i++) {
			if(specs.get(i).dohvatiId()==a) {
				specs.remove(i);
				break;
			}
		}
	}
	
	public Specificnost dohvSpecificnost(int i) {
		return specs.get(i);
	}
	
	public int brojSpecificnosti() {
		return specs.size();
	}
	
	public Deonica clone(){
		
		Deonica deonica=null;
		try {
			deonica = (Deonica) super.clone();
			deonica.specs = (ArrayList<Specificnost>) specs.clone();
			
			for(int i=0; i < specs.size();i++) {
				deonica.specs.set(i, specs.get(i).clone());
			}
		} catch (CloneNotSupportedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return deonica;
	
	}



	@Override
	public String toString() {
		StringBuilder sBuilder = new StringBuilder("deonica(" + duzina + "m)");
		
		for(int i=0; i < specs.size();i++) {
			sBuilder.append(specs.get(i));
		}
		
		return sBuilder.toString();
		
	}
	
	
	
}
