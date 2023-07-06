package igra;

import java.awt.Color;
import java.awt.Graphics;

public class Igrac extends Figura{

	public Igrac(Polje polje) {
		super(polje);
		// TODO Auto-generated constructor stub
	}

	@Override
	public void iscrtaj() {
		Graphics g = getPolje().getGraphics();
		
		Color prevColor = g.getColor();
		
		g.setColor(Color.RED);
		g.drawLine(0, getPolje().getHeight()/2, getPolje().getWidth(), getPolje().getHeight()/2);
		g.drawLine(getPolje().getWidth()/2, 0, getPolje().getWidth()/2, getPolje().getHeight());
		
		g.setColor(prevColor);
		
		
	}

}
