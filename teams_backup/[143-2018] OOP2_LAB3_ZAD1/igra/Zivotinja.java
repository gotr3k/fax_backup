package igra;

public abstract class Zivotinja {
	
	protected Rupa rupa=null;

	public Zivotinja(Rupa rupa) {
		super();
		this.rupa = rupa;
	}
	
	public double procenat(int t) {
		return (1.0*t+1)/rupa.getBrojkoraka();
	}
	
	public abstract void pobegla();
	
	public abstract void udarena();
	
	public abstract void crtaj(int t);

}
