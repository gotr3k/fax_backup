package igra;

import java.awt.Color;
import java.awt.Graphics;

public class Balon extends KruznaFigura{

	public Balon(Vektor vektorCentra, Color boja, double precnik, Vektor vbr, Scena sc) {
		super(vektorCentra, boja, precnik, vbr, sc);
		// TODO Auto-generated constructor stub
	}

	@Override
	public void iscrtaj(Scena s) {
		Graphics g = s.getGraphics();
		g.setColor(boja);
		int pozX = (int)(vektorCentra.getX()-precnik/2);
		int pozY = (int)(vektorCentra.getY()-precnik/2);
		g.fillOval(pozX, pozY, (int)precnik, (int)precnik);
	}

	@Override
	public void sudar(KruznaFigura kf) {
		if(kf instanceof Balon) return;
		if(kf instanceof Igrac) s.zaustaviScenu();
	}
	
	
	
}

