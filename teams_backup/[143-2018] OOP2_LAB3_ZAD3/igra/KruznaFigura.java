package igra;

import java.awt.Color;

public abstract class KruznaFigura extends Krug{

	private Vektor vektorBrzine;
	protected Scena s;
	
	public KruznaFigura(Vektor vektorCentra, Color boja, double precnik, Vektor vbr, Scena sc) {
		super(vektorCentra, boja, precnik);
		vektorBrzine=vbr;
		s=sc;
		// TODO Auto-generated constructor stub
	}

	public void azurirajKretanje(int ms) {
		
		double multiplikator=(1.0*ms)/1000;
		Vektor pomerajVektor = vektorBrzine.clone();
		pomerajVektor.pomnoziReal(multiplikator);
		vektorCentra.saberiVekt(pomerajVektor);
		
	}
	
	public abstract void sudar(KruznaFigura kf);
	
	
}
