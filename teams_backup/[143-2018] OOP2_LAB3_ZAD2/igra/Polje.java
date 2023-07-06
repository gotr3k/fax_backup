package igra;

import java.awt.Canvas;
import java.awt.Graphics;


@SuppressWarnings("serial")
public abstract class Polje extends Canvas{
	
	private Mreza mreza;

	public Polje(Mreza mreza) {
		super();
		this.mreza = mreza;
		//setIgnoreRepaint(true);
	}

	public Mreza getMreza() {
		return mreza;
	}
	
	public int[] pozicija() { //pozicija u mrezi, moracemo iz mreze da nadjemo nase polje
		int[] poz = new int[2];
		int vrsta=0;
		int kolona=0;
		for(int i=0;i<mreza.polja.length;i++)
			for(int j=0;j<mreza.polja.length;j++) {
				if(mreza.polja[i][j]==this) {
					vrsta=i;
					kolona=j;
					break;
				}
		}
		poz[0]=vrsta;
		poz[1]=kolona;
		return poz;
	}
	
	public Polje poljePomeraj(int vrste, int kolone) {
		int vrs = pozicija()[0]+vrste;
		int kol = pozicija()[1]+kolone;
		Polje p = null;
		try {
		p = mreza.polja[vrs][kol];
		}
		catch (Exception e) {
			return null;
		}
		
		return p;
		
	}
	
	@Override
	public void paint(Graphics g) {
		super.paint(g);
	}

	public abstract boolean dozvFigura(Figura f);
	
}
