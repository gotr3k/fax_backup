package karting;


public abstract class Specificnost {
	
	protected static int sid=0;
	protected int id=++sid;
	
	public int dohvatiId() {
		return id;
	}

	public abstract void ispoljiEfekat(Object s) throws GNeodgovarajuciObjekat;
	public abstract void ponistiEfekat(Object s) throws GNeodgovarajuciObjekat;

	@Override
	public abstract String toString();
	
	public Specificnost clone() {
		
		Specificnost copy = null;
		try {
			copy = (Specificnost) super.clone();
			copy.id=++sid;
		} catch (CloneNotSupportedException e) {
			e.printStackTrace();
		}
		return copy;
	}
	
}
