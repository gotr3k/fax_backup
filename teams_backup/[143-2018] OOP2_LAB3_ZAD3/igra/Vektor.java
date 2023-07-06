package igra;

public class Vektor implements Cloneable{
	
	private double x;
	private double y;
	
	
	public Vektor(double x, double y) {
		super();
		this.x = x;
		this.y = y;
	}


	public double getX() {
		return x;
	}


	public double getY() {
		return y;
	}
	
	@Override
	protected Vektor clone(){
		
		Vektor v = null;
		try {		
		v = (Vektor)super.clone();
		}
		catch (CloneNotSupportedException e) {
			
		}
		
		return v;
	}
	
	public void pomnoziReal(double mn) {
		
		x=x*mn;
		y=y*mn;
		
	}
	
	public void saberiVekt(Vektor v) {
		
		x=x+v.x;
		y=y+v.y;
		
	}
	
	static double distanca(Vektor v1, Vektor v2) {
		
		return Math.sqrt(Math.pow(v1.x-v2.x, 2)+Math.pow(v1.y-v2.y, 2));
		
	}

}
