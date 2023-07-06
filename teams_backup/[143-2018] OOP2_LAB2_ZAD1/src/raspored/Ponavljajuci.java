package raspored;

import java.util.ArrayList;

public class Ponavljajuci extends Sadrzaj implements Cloneable{
	
	private Vreme periodaPon;
	private ArrayList<Vreme> vremenaPoc = new ArrayList<Vreme>();
	
	
	private void popuniVremenaPoc() {
		try {
			Vreme vreme=dohvPocetak();
			Vreme vremekraja;
			while(true) {
				vremekraja=Vreme.addVreme(vreme, getVremetrajanja());
				vremenaPoc.add(vreme);
				vreme=Vreme.addVreme(vreme, periodaPon);
			}
		} catch (GVreme e) {
			return;
		}
	}
	
	
	
	
	
	@Override
	public Ponavljajuci clone(){
		Ponavljajuci p=null;
		try {
			p=(Ponavljajuci) super.clone();
			p.periodaPon=periodaPon.clone();
			p.vremenaPoc= new ArrayList<Vreme>();
			for(Vreme v:vremenaPoc) {
				p.vremenaPoc.add(v.clone());
			}
		}
		catch (CloneNotSupportedException e) {}
		
		return p;
		
	}


	public double minuti() {
		
		double ukup=0;
		for(int i=0;i<vremenaPoc.size();i++) {
			
			ukup+=getVremetrajanja().getUkupMinuta();
			
		}
		return ukup;
	}



	public Ponavljajuci(String naziv, Vreme vremetrajanja, Vreme perioda) {
		super(naziv, vremetrajanja);
		periodaPon=perioda;
		popuniVremenaPoc();
	}

	

	public Vreme getPeriodaPon() {
		return periodaPon;
	}



	@Override
	public char VrstaS() {
		return 'P';
	}



	@Override
	public String toString() {
		return super.toString()+ "T"+periodaPon;
	}


	public String svaEmitovanja() {
		return vremenaPoc.toString();
	}
	

	@Override
	public Vreme preklapaSe(Sadrzaj s) throws GVreme {
		

		
		if(s instanceof Ponavljajuci) {
			Ponavljajuci p=(Ponavljajuci)s;
			
			for(Vreme v1:vremenaPoc) {
				for(Vreme v2:p.vremenaPoc) {
					
					Vreme vremekraja1 = Vreme.addVreme(v1, getVremetrajanja());
					Vreme vremekraja2 = Vreme.addVreme(v2, p.getVremetrajanja());
					
					
					if(vremekraja1.compareTo(v2)<=0) continue;
					if(vremekraja2.compareTo(v1)<=0) continue;
					
					if(v1.compareTo(v2)<0) return v2;
					else return v1;
				}
			}
		}
		
		return null;
		
	}



	@Override
	public void pomeri(Vreme v) throws GVreme {
		
		super.pomeri(v);
		vremenaPoc.clear();
		popuniVremenaPoc();
		
	}





	@Override
	public void setVremepocetka(Vreme vremepocetka) {
		super.setVremepocetka(vremepocetka);
		vremenaPoc.clear();
		popuniVremenaPoc();
	}
	
	public void gornjaGranica(Vreme kranjevreme) {
		
		int pozicija=0;
		
		try {
			
			for(int i=0;i<vremenaPoc.size();i++) {
				pozicija=i;
				
				
				if(vremenaPoc.get(i).compareTo(kranjevreme)>0) {
					vremenaPoc.remove(i); 
					continue;
				}
				
				Vreme vremekraja1 = Vreme.addVreme(vremenaPoc.get(i), getVremetrajanja());
				
				if(vremekraja1.compareTo(kranjevreme)>0) vremenaPoc.remove(i);
				
			}
		}
		catch (Exception e) {
			 vremenaPoc.remove(pozicija);
		}
		
	}
	


}
