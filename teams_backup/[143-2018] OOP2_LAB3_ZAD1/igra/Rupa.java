package igra;

import java.awt.Canvas;
import java.awt.Color;
import java.awt.Graphics;

@SuppressWarnings("serial")
public class Rupa extends Canvas implements Runnable{
	
	protected Basta basta;
	private Zivotinja zivotinja=null;
	private Thread nitRupe=null;
	private int brojkoraka=0;
	private int korak=0;
	
	
	public Rupa(Basta basta) {
		super();
		this.basta = basta;
		setBackground(new Color(165, 76, 49)); //pozadina rupe
		
	}
	
	public Thread dohvThread() {
		return nitRupe;
	}
	
	public void stvoriNit() {
		nitRupe=new Thread(this);
	}
	
	public void pokreniNit() {
		//zivotinja = new Krtica(this);
		nitRupe.start();
	}

	public void zaustaviNit() {
		nitRupe.interrupt();
		//nitRupe=null;
	}
	
	public boolean pokrenutaNit() {
		if(nitRupe==null) return false;
		if(nitRupe.getState()==Thread.State.NEW) return false;
		return true;
	}
	
	public Zivotinja getZivotinja() {
		return zivotinja;
	}


	public void setZivotinja(Zivotinja zivotinja) {
		this.zivotinja = zivotinja;
	}
	

	public int getBrojkoraka() {
		return brojkoraka;
	}

	public void setBrojkoraka(int brojkoraka) {
		this.brojkoraka = brojkoraka;
	}


	
	
	@Override
	public void paint(Graphics g) {	
		
		if(zivotinja!=null) {
			zivotinja.crtaj(korak);
		}

	}

	public void udarena() {
		if(zivotinja!=null)
		zivotinja.udarena();
	}
	
	public boolean uhvacena=false;

	@Override
	public void run() {

		try {	

			for(korak=0;korak<brojkoraka;korak++) {
				
				if(Thread.interrupted()) { //ako se prekine nit u toku izvrsavanja
					
					break;
				}
				//synchronized (this) {
					repaint();
				//}
				
				
				Thread.sleep(100);
			}
			
			Thread.sleep(2000);
			
			
		}catch (InterruptedException e) { //ako se prekine nit dok je u sleep, zivotinja udarena 

		}

		
		if(uhvacena) {
			synchronized (basta) {
				udarena();
			}	
		}
		else {
			synchronized (basta) {
				zivotinja.pobegla();
			}
		}
		
		korak=-1;
		repaint();
		uhvacena=false;
		
		nitRupe=null;
		
	}


}
