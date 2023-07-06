package raspored;

public class Vreme  implements Comparable<Vreme>, Cloneable{
	
	private int sati;
	private int minuti;
	
	
	public Vreme(int sati, int minuti) throws GVreme{
		super();
		if(sati>23||sati<0||minuti>59||minuti<0||(minuti%15!=0)) throw new GVreme();
		this.sati = sati;
		this.minuti = minuti;
	}
	
	public Vreme()
	{
		super();
		sati=0;
		minuti=0;
	}
	

	@Override
	public int compareTo(Vreme v) {
		
		double cmpsati = Math.signum(sati-v.sati);
		if(cmpsati!=0) return (int)cmpsati;
		return (int)Math.signum(minuti-v.minuti);
		
	}
	
	
	
	public int getUkupMinuta() {
		return sati*60+minuti;
	}


	
	@Override
	public boolean equals(Object o) {
 
        if (o == this) { 
            return true; 
        } 
  
        if (!(o instanceof Vreme)) { 
            return false; 
        } 
          
        Vreme c = (Vreme) o; 
          
        if(sati==c.sati && minuti==c.minuti) return true;
		return false;
	}

	public static Vreme addVreme(Vreme v1, Vreme v2) throws GVreme{
		
		
		int noviminuti=v1.minuti+v2.minuti;
		int novisati=v1.sati+v2.sati+noviminuti/60;
		noviminuti=noviminuti%60;
		
		
		return new Vreme(novisati, noviminuti);
	}
	

	@Override
	public String toString() {
		return "(" + sati + ":" + minuti + ")";
	}

	@Override
	public Vreme clone() throws CloneNotSupportedException {
		return (Vreme)super.clone();
	}
	
	
	
}
