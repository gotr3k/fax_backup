package igra;

import java.awt.Color;
import java.awt.Graphics;

public class Novcic extends Figura{

	public Novcic(Polje polje) {
		super(polje);
		// TODO Auto-generated constructor stub
	}

	@Override
	public void iscrtaj() {
		
		
		
		Graphics g = getPolje().getGraphics();
		
		Color prevColor = g.getColor();
		
		//getPolje().setBackground(Color.RED);
		
		g.setColor(Color.YELLOW);
		g.fillOval(getPolje().getWidth()/4, getPolje().getHeight()/4, getPolje().getWidth()/2, getPolje().getHeight()/2);
		
		
		g.setColor(prevColor);
		

	}

}
