package igra;

import java.awt.Color;
import java.awt.Graphics;


@SuppressWarnings("serial")
public class Trava extends Polje{

	public Trava(Mreza mreza) {
		super(mreza);
		setBackground(Color.GREEN);
	}

	@Override
	public boolean dozvFigura(Figura f) {
		return true;
	}

	@Override
	public void paint(Graphics g) {
		g.setColor(Color.GREEN);
		g.drawRect(0, 0, getWidth(), getHeight());
		
	}
	

	
	

}
