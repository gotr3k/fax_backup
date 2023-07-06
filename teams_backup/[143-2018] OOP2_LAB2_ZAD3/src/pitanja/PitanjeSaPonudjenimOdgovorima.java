package pitanja;

public class PitanjeSaPonudjenimOdgovorima extends Pitanje{
	
	private String[] odgovori;

	public PitanjeSaPonudjenimOdgovorima(String tekst, int brpoena, double tezina, String[] odgovori) {
		super(tekst, brpoena, tezina);
		this.odgovori = odgovori;
	}

	@Override
	public String toString() {
		
		StringBuilder stringBuilder= new StringBuilder(super.toString());
		
		for(int i=0;i<odgovori.length;i++) {
			stringBuilder.append("\n"+(i+1)+". "+odgovori[i]);
		}
		
		return stringBuilder.toString();
	}
	
	
	

}
