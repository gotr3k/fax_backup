package raspored;

public abstract class Sadrzaj implements Cloneable, Comparable<Sadrzaj>{
	
	private String naziv;
	private Vreme vremetrajanja;
	private Vreme vremepocetka=new Vreme();
	
	
	
	public Sadrzaj(String naziv, Vreme vremetrajanja) {
		super();
		this.naziv = naziv;
		this.vremetrajanja = vremetrajanja;
	}



	public Vreme preklapaSe(Sadrzaj s) throws GVreme {
		
		Vreme vremekraja1 = Vreme.addVreme(vremepocetka, vremetrajanja);
		Vreme vremekraja2 = Vreme.addVreme(s.vremepocetka, s.vremetrajanja);
		
		
		if(vremekraja1.compareTo(s.vremepocetka)<=0) return null;
		if(vremekraja2.compareTo(vremepocetka)<=0) return null;
		
		if(vremepocetka.compareTo(s.vremepocetka)<0) return s.vremepocetka;
		else return vremepocetka;
		
	}
	
	public void pomeri(Vreme v) throws GVreme {
		Vreme vr= Vreme.addVreme(vremepocetka, v);
		vr=Vreme.addVreme(vr, v);
		vremepocetka=Vreme.addVreme(vremepocetka, v);
	}



	public Vreme dohvPocetak() {
		return vremepocetka;
	}



	public void setVremepocetka(Vreme vremepocetka) {
		this.vremepocetka = vremepocetka;
	}



	public String getNaziv() {
		return naziv;
	}



	public Vreme getVremetrajanja() {
		return vremetrajanja;
	}
	
	public abstract char VrstaS();



	@Override
	public String toString() {
		Vreme vremekraja=new Vreme();
		try {
			vremekraja=Vreme.addVreme(vremepocetka, vremetrajanja);
		}
		catch (Exception e) {
			// TODO: handle exception
		}
		return VrstaS()+", "+naziv+" | " + vremepocetka + " - " + vremekraja;
	}



	@Override
	public Sadrzaj clone() throws CloneNotSupportedException {
		
		Sadrzaj s=(Sadrzaj) super.clone();
		s.vremepocetka=vremepocetka.clone();
		s.vremetrajanja=vremetrajanja.clone();
		
		return s;
		
		
	}
	
	@Override
	public int compareTo(Sadrzaj s) {
		
		return vremepocetka.compareTo(s.vremepocetka);
		
	}
	
	public double minuti() {
		
		return vremetrajanja.getUkupMinuta();
	}
	
	
	
	
}
