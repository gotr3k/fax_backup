package igra;

import java.awt.Canvas;
import java.awt.Color;
import java.awt.Graphics;
import java.util.ArrayList;
import java.util.Iterator;

@SuppressWarnings("serial")
public class Scena extends Canvas implements Runnable{

	@SuppressWarnings("unused")
	private Igra igra;
	private Thread nitScene;
	ArrayList<KruznaFigura> figure = new ArrayList<KruznaFigura>();
	private Igrac igrac;
	
	
	public Scena(Igra igra) {
		super();
		this.igra = igra;
	}
	
	
	public Igrac getIgrac() {
		return igrac;
	}

	

	public void pokreniScenu() {
		
		nitScene= new Thread(this);
		nitScene.start();
		
	}
	
	public void zaustaviScenu() {
		
		if(nitScene==null) return;
		nitScene.interrupt();

	}
	
	private void generisiBalon() {
		
		if(Math.random()<=0.1) {
			double pozX=Math.random()*getWidth();
			figure.add(new Balon(new Vektor(pozX, 0), Color.RED, 20, new Vektor(0, 20), this));
			
		}

	}
	
	public void dodajIgraca() {
		igrac = new Igrac(new Vektor(getWidth()/2, getHeight()*0.8), 30, new Vektor(0, 0), this);
		figure.add(igrac);
		
	}
	
	
	private void obavestiFigure() {
		
		for(int i=0;i<figure.size();i++)
			figure.get(i).azurirajKretanje(60);
		
	}
	
	
	private void obrisiVisak() {
		
		Iterator<KruznaFigura> iterator = figure.iterator();
		while(iterator.hasNext()) {
			KruznaFigura b = iterator.next();
			if(b instanceof Igrac) continue;
			if((b.vektorCentra.getX()<0)||(b.vektorCentra.getX()>getWidth())||(b.vektorCentra.getY()>getHeight())||(b.vektorCentra.getY()<0)) {
				iterator.remove();
			}
		}
		
	}
	
	
	/*private void sudarSaIgracem() {
		
		Iterator<KruznaFigura> iterator = figure.iterator();
		while(iterator.hasNext()) {
			KruznaFigura b = iterator.next();
			if(b instanceof Igrac) continue;
			if(b.preklop(igrac))
				iterator.remove();
		}
		
	}*/
	
	private void sudariFigure() {
		
		for(int i=0;i<figure.size()-1;i++) 	{	
			for(int j=i+1;j<figure.size();j++) {
				
				if(figure.get(i).preklop(figure.get(j))) {
					figure.get(i).sudar(figure.get(j));
				}
				
			}
		}
		
	}

	@Override
	public void paint(Graphics g) {
		for(int i=0;i<figure.size();i++)
			figure.get(i).iscrtaj(this);
	}
	
	
	@Override
	public void run() {
		try {
			while(!Thread.interrupted()) {
				
				Thread.sleep(60);
				
				sudariFigure();
				generisiBalon();
				obavestiFigure();
				obrisiVisak();
				repaint();

				
			}
			
		}catch (InterruptedException e) {
			// TODO: handle exception
		}
		nitScene=null;
	}
	
	

}
