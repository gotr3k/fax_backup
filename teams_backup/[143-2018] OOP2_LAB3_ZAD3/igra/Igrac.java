package igra;

import java.awt.Color;
import java.awt.Graphics;

public class Igrac extends KruznaFigura{

	public Igrac(Vektor vektorCentra, double precnik, Vektor vbr, Scena sc) {
		super(vektorCentra, Color.GREEN, precnik, vbr, sc);
		// TODO Auto-generated constructor stub
	}
	
	@Override
	public void iscrtaj(Scena s) {
		
		Graphics g = s.getGraphics();
		g.setColor(boja);
		int pozX = (int)(vektorCentra.getX()-precnik/2);
		int pozY = (int)(vektorCentra.getY()-precnik/2);
		g.fillOval(pozX, pozY, (int)precnik, (int)precnik);
		g.setColor(Color.BLUE);
		pozX+=precnik/4;
		pozY+=precnik/4;
		g.fillOval(pozX, pozY, (int)(precnik/2), (int)(precnik/2));
		
	}
	
	@Override
	public void azurirajKretanje(int ms) {
		
	}
	public void pomeraj(int vrednost) {
		
		vektorCentra.saberiVekt(new Vektor(vrednost, 0));
		
	}

	@Override
	public void sudar(KruznaFigura kf) {
		if(kf instanceof Balon)
			s.zaustaviScenu();
		
	}

}
