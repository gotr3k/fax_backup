package igra;

import java.awt.Frame;
import java.awt.event.KeyAdapter;
import java.awt.event.KeyEvent;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;

@SuppressWarnings("serial")
public class Igra extends Frame{
	
	private Scena s = new Scena(this);

	private void populateWindow() {

		add(s);
		
		s.pokreniScenu();
		
		addWindowListener(new WindowAdapter() {

			@Override
			public void windowClosing(WindowEvent e) {
				s.zaustaviScenu();
				dispose();
			}
			
			
		});
		
		s.addKeyListener(new KeyAdapter() {
			
			@Override
			public void keyPressed(KeyEvent e) {
				
				int key = e.getKeyCode();
				switch (key) {
				
				case KeyEvent.VK_LEFT: {
					if(s.getIgrac().vektorCentra.getX()-30<0) return; 
					s.getIgrac().pomeraj(-30);
					
					break;
				}
				case KeyEvent.VK_RIGHT: {
					if(s.getIgrac().vektorCentra.getX()+30>s.getWidth())return;
					s.getIgrac().pomeraj(30);
					
					break;
				}
				}
			}
			
		});
		
		
	}
	
	public Igra() {
		setBounds(500, 300, 500, 500);
		setTitle("Baloni");
		setResizable(false);
		
		populateWindow();
		
		setVisible(true);
		s.dodajIgraca();
		s.requestFocus();
	}
	
	public static void main(String[] args) {
		new Igra();
		
	}
	
}
