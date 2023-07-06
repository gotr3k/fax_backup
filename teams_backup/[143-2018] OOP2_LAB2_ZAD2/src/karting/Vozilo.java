package karting;

public class Vozilo {

	private double maxbrz;
	private double ubrz;
	private double upr;
	private String imetakm;
	private double trenbrz;
	
	public Vozilo(double maxbrz, double ubrz, double upr, String imetakm) {
		super();
		this.maxbrz = maxbrz;
		this.ubrz = ubrz;
		this.upr = upr;
		this.imetakm = imetakm;
		this.trenbrz = 0;
	}

	public double dohvMaksBrzinu() {
		return maxbrz;
	}

	public void postMaksBrzinu(double maxbrz) {
		this.maxbrz = maxbrz;
		if(trenbrz>maxbrz)
			trenbrz=maxbrz;
	}

	public double dohvUbrzanje() {
		return ubrz;
	}

	public void postUbrzanje(double ubrz) {
		this.ubrz = ubrz;
	}

	public double dohvUpravljivost() {
		return upr;
	}

	public void postUpravljivost(double upr) {
		this.upr = upr;
	}

	public String dohvIme() {
		return imetakm;
	}

	public void setImetakm(String imetakm) {
		this.imetakm = imetakm;
	}

	public double dohvTrenBrzinu() {
		return trenbrz;
	}

	public void postTrenBrzinu(double trenbrz) {
		if(trenbrz<=maxbrz)
			this.trenbrz = trenbrz;
		else 
			this.trenbrz=maxbrz;
	}
	
	public double pomeriVozilo(double t) {
		//kada ce dostici maksimum brzine, da li je to vreme manje od vremena za koje se pomeramo
		double tmax=(maxbrz-trenbrz)/ubrz;
		double ret;
		if(tmax>t) {

			ret = trenbrz*t+((ubrz*Math.pow(t, 2))/2);
			trenbrz=trenbrz+ubrz*t;
		}
		else {
			
			ret = trenbrz*tmax+((ubrz*Math.pow(tmax, 2))/2);
			ret+=maxbrz*(t-tmax);
			trenbrz=maxbrz;
			
		}
		return ret;
	}
	
	public double izracunajVreme(double d) {
		
		if(ubrz==0) return d/trenbrz;
		
		//na kojem rastojanju ce dostici maksimum brzine, da li je ta distanca manja od distance koju trazimo
		double tmax=(maxbrz-trenbrz)/ubrz;
		double dmax=trenbrz*tmax+((ubrz*Math.pow(tmax, 2))/2);
		
		if(d<dmax) {
			return (Math.sqrt(trenbrz*trenbrz+2*ubrz*d)-trenbrz)/ubrz;
		}
		else {
			return tmax+(d-dmax)/maxbrz;
		}
		
	}
	
	
	
	
	
	
	
	
	
	@Override
	public String toString() {
		
		return  imetakm + "[" + maxbrz + ", " + ubrz + ", " + upr +"]";
		
	}

	public static void main(String[] args) {
		
		
		Vozilo v1 = new Vozilo(30.0, 3.0, 0.75, "Crash Bandicoot");
		Vozilo v2 = new Vozilo(40.0, 4.0, 0.5, "Coco Bandicoot");
		Vozilo v3 = new Vozilo(45.0, 2.5, 0.25, "Tiny Tiger");
		Vozilo v4 = new Vozilo(25.0, 3.5, 1.0, "Polar");
		
		System.out.printf("Vreme: %f \n", v1.izracunajVreme(1.5));
		System.out.printf("Vreme: %f \n", v2.izracunajVreme(200.0));
		System.out.printf("Vreme: %f \n", v3.izracunajVreme(495));
		System.out.printf("Vreme: %f \n", v4.izracunajVreme(7));
		System.out.printf("Vreme: %f \n", v3.izracunajVreme(125));
		v3.pomeriVozilo(10);
		System.out.printf("Vreme: %f \n", v3.izracunajVreme(370));
	}
	
	
}
