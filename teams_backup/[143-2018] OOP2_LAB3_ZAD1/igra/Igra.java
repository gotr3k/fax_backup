package igra;

import java.awt.BorderLayout;
import java.awt.Button;
import java.awt.Checkbox;
import java.awt.CheckboxGroup;
import java.awt.Font;
import java.awt.Frame;
import java.awt.GridBagLayout;
import java.awt.GridLayout;
import java.awt.Label;
import java.awt.Panel;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;

@SuppressWarnings("serial")
public class Igra extends Frame{
	
	private Basta basta = new Basta(4, 4);
	private static Igra jednaigra=new Igra();
	private Button krstButton = new Button("Kreni");
	private Label povrce = new Label("Povrce: ");
	
	public Basta getBasta() {
		return basta;
	}
	
	public void gameOver() {
		
		try {
			basta.zaustaviBastu();
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		krstButton.setLabel("Kreni");
		basta.setPovrce(100);
		povrce.setText("GAME OVER!");
		
	}
	public void updatePovrce() {
		povrce.setText("Povrce: "+basta.dohvPovrce());
	}
	
	private void populateWindow() {
		
		
		
		Panel panel = new Panel(new GridLayout(2, 1, 0, 0));
		
		add(basta, BorderLayout.WEST);
		add(panel);
		
		Panel panelGornji = new Panel(new GridLayout(5, 1, 0, 0));
		Panel panelDonji = new Panel(new GridBagLayout());
		
		
		povrce.setAlignment(Label.CENTER);
		povrce.setFont(new Font("Arial", Font.BOLD, 18));
		panelDonji.add(povrce);
		
		//gornji deo levog panela
		
		Label l1 = new Label("Tezina:");
		l1.setAlignment(Label.CENTER);
		l1.setFont(new Font("Arial", Font.BOLD, 16));
		panelGornji.add(l1);
		
		CheckboxGroup cb = new CheckboxGroup();
		Checkbox lakoCB = new Checkbox("Lako", false, cb);
		Checkbox srednjeCB = new Checkbox("Srednje", true, cb);
		Checkbox teskoCB = new Checkbox("Tesko", false, cb);
		
		panelGornji.add(lakoCB);
		panelGornji.add(srednjeCB);
		panelGornji.add(teskoCB);
		panelGornji.add(krstButton);
		
		panel.add(panelGornji);
		panel.add(panelDonji);
		
		updatePovrce();
		
		krstButton.addActionListener(new ActionListener() {
			
			@Override
			public void actionPerformed(ActionEvent e) {
				if(krstButton.getLabel()=="Kreni") {
					krstButton.setLabel("Stani");
					
					lakoCB.setEnabled(false);
					srednjeCB.setEnabled(false);
					teskoCB.setEnabled(false);
				
					String opcija = cb.getSelectedCheckbox().getLabel();
					switch (opcija) {
					case "Lako":
						basta.setPovrce(100);
						basta.setKoracizarupe(10);
						basta.setCekanje(1000);
						break;
					case "Srednje":
						basta.setPovrce(100);
						basta.setKoracizarupe(8);
						basta.setCekanje(750);
						break;
					case "Tesko":
						basta.setPovrce(100);
						basta.setKoracizarupe(6);
						basta.setCekanje(500);
						break;
					default:
						break;
					}
					updatePovrce();
					basta.pokreniBastu();
				}
				else if(krstButton.getLabel()=="Stani") {
					lakoCB.setEnabled(true);
					srednjeCB.setEnabled(true);
					teskoCB.setEnabled(true);
					krstButton.setLabel("Kreni");
					try {
						basta.zaustaviBastu();
					} catch (InterruptedException e1) {
						// TODO Auto-generated catch block
						//e1.printStackTrace();
					}
					basta.setPovrce(100);
					updatePovrce();
				}
				
			}
		});
		
		
		
	}

	private Igra() {
		populateWindow();
		setBounds(300, 250, 700, 550);
		setTitle("Igra");
		setVisible(true);
		
		addWindowListener(new WindowAdapter() {

			@Override
			public void windowClosing(WindowEvent e) {
				dispose();
			}
			
			
			
		});
		
	}
	
	public static Igra dohvIgru() {
		return jednaigra;
	}
	
	public static void main(String[] args) {
		
	}
	
}
