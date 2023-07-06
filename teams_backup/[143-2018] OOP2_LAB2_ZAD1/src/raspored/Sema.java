package raspored;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;



public class Sema {

	private List<Sadrzaj> sadrzaji= new ArrayList<Sadrzaj>();
	private String naziv;
	private Vreme pocetak;
	private Vreme kraj;
	
	public Sema(String naziv) throws GVreme{
		super();
		this.naziv = naziv;
		this.pocetak = new Vreme(8, 0);
		this.kraj = new Vreme(22, 0);
	}
	
	public Sema(String naziv, Vreme pocetak, Vreme kraj) {
		super();
		this.naziv = naziv;
		this.pocetak = pocetak;
		this.kraj = kraj;
	}
	
	
	public void dodaj(Sadrzaj s) throws GDodaj{
		if(s instanceof Ponavljajuci) {
			
			
			Ponavljajuci p = ((Ponavljajuci)s);
			Ponavljajuci pom = p.clone();
			
			if(p.dohvPocetak().compareTo(pocetak)<0) 
			{
				p.setVremepocetka(pocetak);
				pom.setVremepocetka(pocetak);
			}
			p.gornjaGranica(kraj);
			pom.gornjaGranica(kraj);
				
			while(true) {
				
				try {
					boolean prosao=true;
					for(Sadrzaj t:sadrzaji) {
						
						if (pom.preklapaSe(t)!=null)
							prosao=false;
						
					}
					
					if(pom.dohvPocetak().compareTo(kraj)==0) {
						throw new GDodaj();
					}
					
					if(prosao) {
						p.gornjaGranica(kraj);
						sadrzaji.add(p);
						Collections.sort(sadrzaji);
						return;
					}
					
					p.pomeri(new Vreme(0, 15));
					pom.pomeri(new Vreme(0, 15));
					
					
				}
				catch(GVreme g) {
					throw new GDodaj();
				}
				
			}

			
		}
	}

	@Override
	public String toString() {
		StringBuilder sb=new StringBuilder(naziv+" : "+pocetak+ " - "+kraj);
		for(Sadrzaj s:sadrzaji) {
			sb.append("\n"+s.toString());
		}
		return sb.toString();
	}
	
	
	public Sadrzaj dohvSadrzaj(int i) throws GIndeks{
		
		if(i>=sadrzaji.size()) throw new GIndeks();
		return sadrzaji.get(i);
	}
	
	public int dohvBrSadrzaja() {
		return sadrzaji.size();
	}
	
	
	public double zauzetost() {
		
		double ukupno=kraj.getUkupMinuta()-pocetak.getUkupMinuta();
		double zauzeto=0;
		for(int i=0;i<sadrzaji.size();i++) {
			
			zauzeto+=sadrzaji.get(i).minuti();
			
		}
		return 100*(zauzeto/ukupno);
		
	}
	
	
}
