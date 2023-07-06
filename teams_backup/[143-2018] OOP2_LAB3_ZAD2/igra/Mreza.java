package igra;


import java.awt.Graphics;
import java.awt.GridLayout;
import java.awt.Panel;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.util.ArrayList;

@SuppressWarnings("serial")
public class Mreza extends Panel implements Runnable{

	Polje[][] polja;
	private Panel[][] paneli;
	private ArrayList<Novcic> novcici = new ArrayList<Novcic>();
	private ArrayList<Tenk> tenkovi = new ArrayList<Tenk>();
	private Igra igra;
	private Igrac igrac;
	private Thread nitMreze;
	private int poeni=0;
	private int brnov;
	
	public Mreza(int dim, Igra ig) {
		polja=new Polje[dim][dim];
		paneli=new Panel[dim][dim];
		for(int i=0;i<dim;i++)
			for(int j=0;j<dim;j++) {
				paneli[i][j]=new Panel(new GridLayout());
				if(Math.random()<0.8) { //80% sanse da bude trava
					polja[i][j]=new Trava(this);
				}
				else polja[i][j]=new Zid(this);
				
			}
		igra=ig;
		dodajListenere();
	}
	
	public Mreza(Igra ig) { //default je dimenzija 17
		polja=new Polje[17][17];
		paneli=new Panel[17][17];
		for(int i=0;i<17;i++)
			for(int j=0;j<17;j++) {
				paneli[i][j]=new Panel(new GridLayout());
				if(Math.random()<0.8) { //80% sanse da bude trava
					polja[i][j]=new Trava(this);
				}
				else polja[i][j]=new Zid(this);
				
			}
		igra=ig;
		dodajListenere();
	}
	
	public void pokreniMrezu() {
		
		nitMreze = new Thread(this);
		nitMreze.start();
	}
	
	public void zaustaviMrezu() {
		
		if(nitMreze==null) return;
		nitMreze.interrupt();
		try {
			nitMreze.join();
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		nitMreze=null;
	}
	
	public int numofTrava() {
		
		int counter=0;
		
		for(int i=0;i<polja.length;i++)
			for(int j=0;j<polja.length;j++) {
				if(polja[i][j] instanceof Trava) counter++;
			}
		return counter;
		
		
	}

	public int getPoeni() {
		return poeni;
	}

	public void setPoeni(int poeni) {
		this.poeni = poeni;
	}

	public int getBrnov() {
		return brnov;
	}

	
	public ArrayList<Novcic> getNovcici() {
		return novcici;
	}



	public ArrayList<Tenk> getTenkovi() {
		return tenkovi;
	}

	public Igrac getIgrac() {
		return igrac;
	}
	
	public void setIgrac(Igrac i) {
		igrac=i;
	}

	public void zameniPolje(Polje p1, Polje p2) {
		if(!igra.getIgranje())
			p1=p2;
	}

	public void inicMrezu(int brnovcica) {
		
		
		if(igra.getIgranje()) {
			
			//postavljanje novcica
			
			int brojac=0;
			brnov=brnovcica;
			
			while(brojac<brnovcica) {
			
				int vrsta=(int)(Math.random()*(polja.length));
				int kolona=(int)(Math.random()*(polja.length));
				
				Polje p = polja[vrsta][kolona];
				if(!p.dozvFigura(new Novcic(p))) continue;
				
				//idemo kroz niz novcica i proveravamo polja za svaki novcic
			
				boolean vecpostoji=false;
				
				for(Novcic n:novcici) {
					
					if(n.getPolje()==p) {
						vecpostoji=true;
						break;
					}
					
				}
				
				if(!vecpostoji) { //ako ne postoji na tom mestu, napravimo novi novcic na tom polju i uvecamo br
					Novcic n = new Novcic(p);
					novcici.add(n);
					//System.out.println("Dodat NOVCIC na: Vrsta: "+vrsta+" Kolona: "+kolona);
					brojac++;
				}
			}
			
			brojac=0;
			
			while(brojac<(brnovcica/3)) {
			
				int vrsta=(int)(Math.random()*(polja.length));
				int kolona=(int)(Math.random()*(polja.length));
				
				Polje p = polja[vrsta][kolona];
				if(!p.dozvFigura(new Tenk(p))) continue;
				
				//idemo kroz niz novcica i proveravamo polja za svaki novcic
			
				boolean vecpostoji=false;
				
				for(Tenk t:tenkovi) {
					
					if(t.getPolje()==p) {
						vecpostoji=true;
						
						break;
					}
					
				}
				
				if(!vecpostoji) { //ako ne postoji na tom mestu, napravimo novi novcic na tom polju i uvecamo br
					Tenk t = new Tenk(p);
					tenkovi.add(t);
					//System.out.println("Dodat TENK na: Vrsta: "+vrsta+" Kolona: "+kolona);
					brojac++;
				}
			}
			
			while(true) {
				int vrsta=(int)(Math.random()*(polja.length));
				int kolona=(int)(Math.random()*(polja.length));
				
				Polje p = polja[vrsta][kolona];
				igrac = new Igrac(p);
				if(!p.dozvFigura(igrac)) continue;
				break;	
			}
			
		}
	}
	
	

	
	private void dodajListenere() {
		
		for(int i=0;i<polja.length;i++)
			for(int j=0;j<polja.length;j++) {
				
				final int red=i;
				final int kolona=j;
				final Mreza mr=this;
				polja[i][j].addMouseListener(new MouseAdapter() {

					@Override
					public void mouseReleased(MouseEvent arg0) {
						if(!igra.getIgranje()) {
							
							
							
							if(igra.opcijaGroup.getSelectedCheckbox().getLabel()=="Trava") {
								
								//System.out.println("Kliknuto na: "+polja[red][kolona].getClass());
								paneli[red][kolona].removeAll();
								polja[red][kolona]=new Trava(mr);
								paneli[red][kolona].add(polja[red][kolona]);
								
								polja[red][kolona].addMouseListener(this);
								
								paneli[red][kolona].revalidate();
								
										
								
							}
							else {
								
								//System.out.println("Kliknuto na: "+polja[red][kolona].getClass());
								paneli[red][kolona].removeAll();
								polja[red][kolona]=new Zid(mr);
								paneli[red][kolona].add(polja[red][kolona]);
								
								polja[red][kolona].addMouseListener(this);
								
								paneli[red][kolona].revalidate();
							}
						 
						}
						else {
							return;
						}
					}
				});
			}
		
		
		
	}
	
	

	public void populateMreza() {
		setLayout(new GridLayout(polja.length, polja.length, 0, 0));
		for(int i=0;i<polja.length;i++)
			for(int j=0;j<polja.length;j++) {

				paneli[i][j].add(polja[i][j]);
				paneli[i][j].repaint();
				add(paneli[i][j]);
			}
		
	}


	@Override
	public synchronized void paint(Graphics g) {	
		
		if(getIgrac()!=null)
			getIgrac().iscrtaj();
					
		for(int i=0;i<novcici.size();i++) {
			novcici.get(i).iscrtaj();
		}
		
		for(int i=0;i<tenkovi.size();i++) {
			tenkovi.get(i).iscrtaj();
		}
		
		
	}
	
	private void proveriNovcic() {
		Novcic nov = null;
		boolean uhvatio=false;
		for(Novcic n:novcici) {
			if(n.getPolje()==igrac.getPolje()) {
				n.getPolje().repaint();
				nov=n;
				poeni++;
				uhvatio=true;
				break;
			}
		}
		if(uhvatio) {
			novcici.remove(nov);
			igra.poenaLabel.setText("Poena: "+poeni);
			if(poeni==brnov) { //kraj igre
				igra.setKrajIgre(true);
				poeni=0;
				for(Tenk t:getTenkovi()) {
					t.zaustaviTenk();
				}
				
				nitMreze.interrupt();
			}
		}
		
	}
	
	private void proveriIgraca() {
		
		boolean uhvatio=false;
		for(Tenk t:tenkovi) {
			if(t.getPolje()==igrac.getPolje()) {
				uhvatio=true;
				igra.setKrajIgre(true);
				break;
			}
		}
		if(uhvatio) {
			igra.poenaLabel.setText("GAME OVER!");
			poeni=0;
			for(Tenk t:getTenkovi()) {
				t.zaustaviTenk();
			}
				
			nitMreze.interrupt();
		}
		
	}
	
	
	@Override
	public void run() {
		
		try {
			
			while(!Thread.interrupted()) {
				requestFocus();
				
				proveriNovcic();
				
				
				repaint();
				
				proveriIgraca();
				
				Thread.sleep(40);
			}
			
		}catch (InterruptedException e) {
			// TODO: handle exception
		}

		
	}

	
	
	
}
