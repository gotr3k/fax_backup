package pitanja;

public class Pitanje implements Cloneable{
	
	private static int sid=0;
	
	private String tekst;
	private int brpoena;
	private double tezina;
	private int id=++sid;
	
	
	
	public Pitanje(String tekst, int brpoena, double tezina) {
		super();
		this.tekst = tekst;
		this.brpoena = brpoena;
		this.tezina = tezina;
	}
	
	public String getTekst() {
		return tekst;
	}
	public int getBrpoena() {
		return brpoena;
	}
	public double getTezina() {
		return tezina;
	}
	
	public Pitanje clone() throws CloneNotSupportedException{
		return (Pitanje) super.clone();
	}
	
	@Override
	public String toString() {
		return "Pitanje " + id + ": " + tekst;
	}
	
	

}
