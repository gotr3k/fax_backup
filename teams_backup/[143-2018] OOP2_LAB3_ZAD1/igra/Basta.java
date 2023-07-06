package igra;

import java.awt.Color;
import java.awt.Dimension;
import java.awt.GridLayout;
import java.awt.Panel;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;


public class Basta extends Panel implements Runnable{

	
	public Rupa[][] rupe;
	private int povrce=100;
	private int cekanje=1000;
	private int koracizarupe;
	
	private Thread nitBaste=null;
	
	public int dohvPovrce() {
		return povrce;
	}
	
	public void setPovrce(int povr) {
		povrce=povr;
	}
	
	public int getCekanje() {
		return cekanje;
	}


	public void setCekanje(int cekanje) {
		this.cekanje = cekanje;
	}


	public Basta(int vrste, int kolone) {
		rupe = new Rupa[vrste][kolone];
		for(int i=0;i<vrste;i++)
			for(int j=0;j<kolone;j++)
				rupe[i][j]=new Rupa(this);
		populateBasta();
		dodajListenere();
	}


	public int getKoracizarupe() {
		return koracizarupe;
	}


	public void setKoracizarupe(int koracizarupe) {
		this.koracizarupe = koracizarupe;
		
		for(int i=0;i<rupe.length;i++)
			for(int j=0;j<rupe[i].length;j++)
				rupe[i][j].setBrojkoraka(koracizarupe);
		
	}

	
	public void smanjiPovrce() {
		povrce--;
	}
	
	public void dodajListenere() {
		
		
		for(int i=0;i<rupe.length;i++)
			for(int j=0;j<rupe[i].length;j++) {
				
				final int red=i;
				final int vrsta=j;
				final Basta b = this;
				rupe[i][j].addMouseListener(new MouseAdapter() {

					@Override
					public void mouseReleased(MouseEvent arg0) {
						if(rupe[red][vrsta].pokrenutaNit()) {
						rupe[red][vrsta].uhvacena=true;
						rupe[red][vrsta].zaustaviNit();
						 
						}
						else {
							//System.out.println("Nema zivotinje!");
						}
					}
				});
			}
		
	}

	
	
	public void pokreniBastu() {
		
		nitBaste = new Thread(this);
		nitBaste.start();
	}
	
	public void zaustaviBastu() throws InterruptedException {
		
		for(int i=0;i<rupe.length;i++)
			for(int j=0;j<rupe[i].length;j++) {
				if(rupe[i][j].pokrenutaNit()) rupe[i][j].zaustaviNit();	
			}
		for(int i=0;i<rupe.length;i++)
			for(int j=0;j<rupe[i].length;j++) {
				if(rupe[i][j].pokrenutaNit()) rupe[i][j].dohvThread().join();	
			}
		povrce=100;
		end=false;
		nitBaste.interrupt();
		nitBaste=null;
	}
	
	public boolean end=false;
	
	@Override
	public void run() {
		
		try {
			int i=0;
			int j=0;
			while(true) {
				if(Thread.interrupted()) break ;
				if(end) Igra.dohvIgru().gameOver();
				i=(int)(Math.random()*rupe.length);
				j=(int)(Math.random()*rupe[i].length);
				if(rupe[i][j].pokrenutaNit()) {
				continue;
				}
				rupe[i][j].stvoriNit();
				rupe[i][j].setZivotinja(new Krtica(rupe[i][j]));
				Thread.sleep(cekanje);
				rupe[i][j].pokreniNit();
				cekanje=(int)(cekanje*0.99); //svaki put kad se stvori nova nit cekanje se smanji za 1%
			}
			
		}
		catch(InterruptedException e) {
			
		}
		
	}
	
	private void populateBasta() {
		
		setPreferredSize(new Dimension(500, 500));
		setLayout(new GridLayout(rupe.length, rupe[0].length, 10, 10));
		
		for(int i=0;i<rupe.length;i++)
			for(int j=0;j<rupe[i].length;j++)
				add(rupe[i][j]);
		
		setBackground(Color.GREEN);
		
	}
	
	

	
	
}
