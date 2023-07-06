package pitanja;

public class IteratorPitanja {

	private int pozicija;
	private ZbirkaPitanja z;

	public IteratorPitanja(ZbirkaPitanja z) {
		super();
		pozicija=0;
		this.z = z;
	}
	
	public boolean postoji() {
		Pitanje pitanje;
		try {
			pitanje= z.dohvati(pozicija);
			return true;
		}
		catch(GNemaPitanja e) {
			return false;
		}
	}
	
	public Pitanje dohvati() throws GNemaPitanja {
		return z.dohvati(pozicija);
	}
	
	public void sledece() throws GNemaPitanja{
		Pitanje pitanje;
		try {
			pitanje= z.dohvati(pozicija);
			pozicija++;
		}
		catch(GNemaPitanja e) {
			throw e;
		}
		
	}
}
