package pitanja;

import java.util.ArrayList;

public class ZbirkaPitanja {

	private ArrayList<Pitanje> pitanja= new ArrayList<Pitanje>();
	private IteratorPitanja iter;
	
	
	
	public ZbirkaPitanja() {
		super();
	}

	public IteratorPitanja iterator() {
		iter=new IteratorPitanja(this);
		return iter;
	}

	public void dodaj(Pitanje p) {
		pitanja.add(p);
	}
	
	public Pitanje dohvati(int i) throws GNemaPitanja {
		try {
			return pitanja.get(i);
		}
		catch(IndexOutOfBoundsException e) {
			throw new GNemaPitanja();
		}
	}
	
	public int brojPitanja() {
		return pitanja.size();
	}
	
	@Override
	public String toString() {
		
		StringBuilder stringBuilder= new StringBuilder();
		
		for(int i=0;i<pitanja.size()-1;i++) {
			stringBuilder.append(pitanja.get(i)+"\n");
		}
		stringBuilder.append(pitanja.get(pitanja.size()-1));
		return stringBuilder.toString();
	}
	
}
