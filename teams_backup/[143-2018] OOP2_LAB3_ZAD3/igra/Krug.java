package igra;

import java.awt.Color;

public abstract class Krug {

	protected Vektor vektorCentra;
	protected Color boja;
	protected double precnik;
	
	public Krug(Vektor vektorCentra, Color boja, double precnik) {
		super();
		this.vektorCentra = vektorCentra;
		this.boja = boja;
		this.precnik = precnik;
	}
	
	public boolean preklop(Krug k) {
		
		if(Vektor.distanca(vektorCentra, k.vektorCentra)<(precnik/2+k.precnik/2))
			return true;
		return false;
		
	}
	
	public abstract void iscrtaj(Scena s);
	
	
	
	
}
