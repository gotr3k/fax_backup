package igra;

public abstract class Figura {

	private Polje polje;

	public Figura(Polje polje) {
		super();
		this.polje = polje;
	}

	public Polje getPolje() {
		return polje;
	}
	
	public void pomeriFiguru(Polje p) {
		if(p==null) return;
		if(p.dozvFigura(this)) polje=p;
	}
	
	public boolean jednaka(Figura f) {
		if(polje==f.getPolje()) return true;
		return false;
	}
	
	public abstract void iscrtaj();
	
	
}
