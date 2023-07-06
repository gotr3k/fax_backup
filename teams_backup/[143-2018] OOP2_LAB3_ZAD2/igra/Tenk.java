package igra;

import java.awt.Color;
import java.awt.Graphics;

public class Tenk extends Figura implements Runnable {
	
	private Thread nitTenka;

	public Tenk(Polje polje) {
		super(polje);
		// TODO Auto-generated constructor stub
	}

	@Override
	public void iscrtaj() {
		
		Graphics g = getPolje().getGraphics();
		
		Color prevColor = g.getColor();
		
		g.setColor(Color.BLACK);
		g.drawLine(0, 0, getPolje().getWidth(), getPolje().getHeight());
		g.drawLine(0, getPolje().getHeight(), getPolje().getWidth(), 0);
		
		g.setColor(prevColor);
		
	}
	
	public void kretnjaTenka() {
		switch ((int)(Math.random()*4)) {
		case 0: //pomeranje gore
			pomeriFiguru(getPolje().poljePomeraj(1, 0));
			break;
		case 1: //pomeranje dole
			pomeriFiguru(getPolje().poljePomeraj(-1, 0));
			break;
		case 2: //pomeranje levo
			pomeriFiguru(getPolje().poljePomeraj(0, -1));
			break;
		case 3: //pomeranje desno
			pomeriFiguru(getPolje().poljePomeraj(0, 1));
		break;

		default:
			break;
		}
	}
	
	public void pokreniTenk() {
		
		nitTenka = new Thread(this);
		nitTenka.start();
		
	}
	
	public void zaustaviTenk() {
		if(nitTenka==null) return;
		nitTenka.interrupt();
		try {
			nitTenka.join();
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		nitTenka=null;
		
	}

	@Override
	public void run() {
		
		try {
			while(!Thread.interrupted()) {
				Polje prethodnoPolje=getPolje();
				kretnjaTenka();
				Polje narednoPolje = getPolje();
				if(prethodnoPolje!=narednoPolje) prethodnoPolje.repaint();
				//getPolje().getMreza().repaint();
				Thread.sleep(500);
			}
			
		}
		catch(InterruptedException e) {
			
		}
		
	}

}
