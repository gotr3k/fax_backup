package igra;

import java.awt.BorderLayout;
import java.awt.Button;
import java.awt.Checkbox;
import java.awt.CheckboxGroup;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.Frame;
import java.awt.GridBagLayout;
import java.awt.GridLayout;
import java.awt.Label;
import java.awt.Panel;
import java.awt.TextField;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.KeyAdapter;
import java.awt.event.KeyEvent;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;
import java.awt.Menu;
import java.awt.MenuBar;
import java.awt.MenuItem;


@SuppressWarnings("serial")
public class Igra extends Frame{

	private boolean igranje=false;
	private Mreza mreza;
	CheckboxGroup opcijaGroup = new CheckboxGroup();
	Label poenaLabel;
	@SuppressWarnings("unused")
	private Boolean krajIgre = false;

	
	public boolean getIgranje() {
		return igranje;
	}
	
	public void setKrajIgre(Boolean krajIgre) {
		this.krajIgre = krajIgre;
	}

	

	private void populateWindow() {
		
		this.mreza = new Mreza(this);
		mreza.populateMreza();
		
		
		mreza.setPreferredSize(new Dimension((int)(getHeight()*0.8), 0));
		
		
		Menu rezim = new Menu("Rezim");
		MenuItem izmenaI = new MenuItem("Rezim izmena");
		MenuItem igranjeI = new MenuItem("Rezim igranje");
		
		rezim.add(izmenaI);
		rezim.add(igranjeI);
		
		MenuBar menuBar = new MenuBar();
		menuBar.add(rezim);
		setMenuBar(menuBar);
		
		Panel podlogaPanel = new Panel(new GridBagLayout());
		podlogaPanel.setPreferredSize(new Dimension(100, 0));
		Label podlogaLabel = new Label("Podloga:");
		podlogaPanel.add(podlogaLabel);
		
		Panel opcija = new Panel(new GridLayout(2, 1, 0, 0));
		opcija.setPreferredSize(new Dimension(100, 0));
		
		Checkbox travaCheckbox = new Checkbox("Trava", true, opcijaGroup);
		Checkbox zidCheckbox = new Checkbox("Zid", false, opcijaGroup);
		travaCheckbox.setBackground(Color.GREEN);
		zidCheckbox.setBackground(Color.LIGHT_GRAY);
		
		opcija.add(travaCheckbox);
		opcija.add(zidCheckbox);
		
		Panel dolePanel = new Panel();
		Label novcicaLabel = new Label("Novcica: ");
		TextField brnovcicaField = new TextField();
		poenaLabel = new Label("Poena: 0");
		Button pocniButton = new Button("Pocni");
		pocniButton.setEnabled(false);
		
		dolePanel.add(novcicaLabel);
		dolePanel.add(brnovcicaField);
		dolePanel.add(poenaLabel);
		dolePanel.add(pocniButton);
		
		add(dolePanel, BorderLayout.SOUTH);
		add(podlogaPanel, BorderLayout.CENTER);
		add(opcija, BorderLayout.EAST);
		add(mreza, BorderLayout.WEST);
		
		addWindowListener(new WindowAdapter() {
			
			@Override
			public void windowClosing(WindowEvent e) {
				for(Tenk t:mreza.getTenkovi()) {
					t.zaustaviTenk();
				}
				mreza.zaustaviMrezu();
				dispose();
			}
			
		});
		
		
		igranjeI.addActionListener(new ActionListener() {
			
			@Override
			public void actionPerformed(ActionEvent e) {
				igranje=true;
				mreza.setPoeni(0);
				poenaLabel.setText("Poena: 0");
				pocniButton.setEnabled(true);
				
			}
		});
		
		izmenaI.addActionListener(new ActionListener() {
			
			@Override
			public void actionPerformed(ActionEvent e) {
				if(!igranje) return;
				mreza.setPoeni(0);
				poenaLabel.setText("Poena: 0");
				igranje=false;
				pocniButton.setEnabled(false);
				
				for(Novcic n:mreza.getNovcici()) {
					n.getPolje().repaint();
				}
				
				for(Tenk t:mreza.getTenkovi()) {
					t.getPolje().repaint();
				}
				
				if(mreza.getIgrac()!=null)
					mreza.getIgrac().getPolje().repaint();
				
				zaustaviTenkove();
				mreza.zaustaviMrezu();
				
				mreza.getNovcici().clear();
				mreza.getTenkovi().clear();
				mreza.setIgrac(null);
				
			}
		});
		
		
		pocniButton.addActionListener(new ActionListener() {
			
			@Override
			public void actionPerformed(ActionEvent e) {
				
				if(!igranje) return;
				//brisanje prethodnog stanja
				krajIgre = false;
				mreza.setPoeni(0);
				poenaLabel.setText("Poena: 0");
				zaustaviTenkove();
				mreza.zaustaviMrezu();
				
				for(Novcic n:mreza.getNovcici()) {
					n.getPolje().repaint();
				}
				
				for(Tenk t:mreza.getTenkovi()) {
					t.getPolje().repaint();
				}
				
				if(mreza.getIgrac()!=null)
					mreza.getIgrac().getPolje().repaint();
				
				mreza.getNovcici().clear();
				mreza.getTenkovi().clear();
				mreza.setIgrac(null);
				
				//inicijalizacija nove mreze
				
				try {
					if(Integer.valueOf(brnovcicaField.getText())>mreza.numofTrava()) {
						System.out.println("Nekoretna vrednost novcica!");
						return;
					}
					mreza.inicMrezu(Integer.valueOf(brnovcicaField.getText()));
				}
				catch (Exception ex) {
					System.out.println("Nekoretna vrednost novcica!");
					return;
				}
				mreza.zaustaviMrezu();
				mreza.pokreniMrezu();
				
				pokreniTenkove();
				
				
				
				
				
			}
		});
		
		mreza.addKeyListener(new KeyAdapter() {

			@Override
			public void keyTyped(KeyEvent e) {
				
				if(!igranje||krajIgre) return; //ne radimo nista ako smo pobedili
				char key = Character.toUpperCase(e.getKeyChar());
				switch (key) {
				case KeyEvent.VK_W: {
					
					Polje prethodnoPolje=mreza.getIgrac().getPolje();
					mreza.getIgrac().pomeriFiguru(mreza.getIgrac().getPolje().poljePomeraj(-1, 0));
					Polje narednoPolje = mreza.getIgrac().getPolje();
					if(prethodnoPolje!=narednoPolje) prethodnoPolje.repaint();
					
					
					
					break;
				}
				case KeyEvent.VK_S: {
					
					Polje prethodnoPolje=mreza.getIgrac().getPolje();
					mreza.getIgrac().pomeriFiguru(mreza.getIgrac().getPolje().poljePomeraj(1, 0));
					Polje narednoPolje = mreza.getIgrac().getPolje();
					if(prethodnoPolje!=narednoPolje) prethodnoPolje.repaint();
					
					break;
				}
				case KeyEvent.VK_A: {
					
					Polje prethodnoPolje=mreza.getIgrac().getPolje();
					mreza.getIgrac().pomeriFiguru(mreza.getIgrac().getPolje().poljePomeraj(0, -1));
					Polje narednoPolje = mreza.getIgrac().getPolje();
					if(prethodnoPolje!=narednoPolje) prethodnoPolje.repaint();
					
					break;
				}
				case KeyEvent.VK_D: {
					
					Polje prethodnoPolje=mreza.getIgrac().getPolje();
					mreza.getIgrac().pomeriFiguru(mreza.getIgrac().getPolje().poljePomeraj(0, 1));
					Polje narednoPolje = mreza.getIgrac().getPolje();
					if(prethodnoPolje!=narednoPolje) prethodnoPolje.repaint();
					
					break;
				}
				}
				//repaint();
			}
		});

		
	}
	
	private void pokreniTenkove() {
		
		for(Tenk t:mreza.getTenkovi()) {
			t.pokreniTenk();
		}
		
	}
	
	private void zaustaviTenkove() {
		
		for(Tenk t:mreza.getTenkovi()) {
			t.zaustaviTenk();
		}
		
	}
	
	public Igra() {
		super();
		setBounds(200, 300, 520, 400);
		populateWindow();
		
		setVisible(true);
		
	}


	public static void main(String[] args) {
		new Igra();

	}
	
	
}
