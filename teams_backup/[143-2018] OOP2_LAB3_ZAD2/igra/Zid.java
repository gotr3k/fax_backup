package igra;

import java.awt.Color;
import java.awt.Graphics;

@SuppressWarnings("serial")
public class Zid extends Polje{

	public Zid(Mreza mreza) {
		super(mreza);
		setBackground(Color.LIGHT_GRAY);
	}

	@Override
	public boolean dozvFigura(Figura f) {
		return false;
	}
	
	@Override
	public void paint(Graphics g) {
		g.setColor(Color.LIGHT_GRAY);
		g.drawRect(0, 0, getWidth(), getHeight());
		
	}
	
	
}
