package igra;

import java.awt.Color;
import java.awt.Graphics;

public class Krtica extends Zivotinja{

	public Krtica(Rupa rupa) {
		super(rupa);
		// TODO Auto-generated constructor stub
	}

	@Override
	public void pobegla() {
		synchronized (Igra.dohvIgru().getBasta()) {
			
			rupa.basta.smanjiPovrce();
			Igra.dohvIgru().updatePovrce();
			if(Igra.dohvIgru().getBasta().dohvPovrce()<1) {

				Igra.dohvIgru().getBasta().end=true;
				
			}
		}
		
		
	}

	@Override
	public void udarena() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void crtaj(int t) {
		
		Graphics g = rupa.getGraphics();
		
		if(t<0) {
			g.clearRect(0, 0, rupa.getWidth(), rupa.getHeight());
			return;
		}
		
		
		Color prev=g.getColor();
		g.setColor(Color.DARK_GRAY);
		
		
		int pocX=(int)(0.5*rupa.getWidth()-0.5*rupa.getWidth()*procenat(t));
		int pocY=(int)(0.5*rupa.getHeight()-0.5*rupa.getHeight()*procenat(t));
		
		int duzX=(int)(rupa.getWidth()*procenat(t));
		int duzY=(int)(rupa.getHeight()*procenat(t));
		
		
		g.fillOval(pocX, pocY, duzX, duzY);
		g.setColor(prev);
		
	}
	
	

}
