package iteracije;

import java.awt.BorderLayout;
import java.awt.Button;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.FlowLayout;
import java.awt.Font;
import java.awt.Frame;
import java.awt.Label;
import java.awt.Panel;
import java.awt.TextArea;
import java.awt.TextField;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;


@SuppressWarnings("serial")
public class MainWindow extends Frame{
	
	private Button generate = new Button("Generisi");
	private Button equalprob = new Button("Fill equal");
	private TextField tbApr1 = new TextField(10);
	private TextField tbApr2 = new TextField(10);
	private TextField tbApr3 = new TextField(10);
	private TextArea ispisArea = new TextArea();
	
	private Label status = new Label("Unesite pocetne apriotne verovatnoce");
	
	private double a=0, b=0, c=0;
	
	private void setTextFields() {
		tbApr1.setText(String.valueOf(a));
		tbApr2.setText(String.valueOf(b));
		tbApr3.setText(String.valueOf(c));
	}
	
	private void generisiTextArea() {
		
		Signal signal = new Signal(10);
		signal.genSignalWithProb(0.2);
		int brjed = signal.getLastSignal();
		
		double uslovna1 = Probabilities.Bernoulli(10, brjed, 0.2);
		double uslovna2 = Probabilities.Bernoulli(10, brjed, 0.3);
		double uslovna3 = Probabilities.Bernoulli(10, brjed, 0.4);
		double totalna = Probabilities.TotalProbability(a, b, c, uslovna1, uslovna2, uslovna3);
		
		double prva = Probabilities.Bayes(a, uslovna1, totalna);
		double druga = Probabilities.Bayes(b, uslovna2, totalna);
		double treca = Probabilities.Bayes(c, uslovna3, totalna);
		
		String prvaString = String.format("%.4f", prva);
		String drugaString = String.format("%.4f", druga);
		String trecaString = String.format("%.4f", treca);
		
		ispisArea.append("1\t"+brjed+"\t"+prvaString+"\t"+drugaString+"\t"+trecaString+"\n");
		
		int brojac=2;
		
		while(prva<0.99 && druga<0.99 && treca<0.99) {
			
			signal.genSignalWithProb(0.2);
			brjed = signal.getLastSignal();
			
			uslovna1 = Probabilities.Bernoulli(10, brjed, 0.2);
			uslovna2 = Probabilities.Bernoulli(10, brjed, 0.3);
			uslovna3 = Probabilities.Bernoulli(10, brjed, 0.4);
			totalna = Probabilities.TotalProbability(prva, druga, treca, uslovna1, uslovna2, uslovna3);
			
			prva = Probabilities.Bayes(prva, uslovna1, totalna);
			druga = Probabilities.Bayes(druga, uslovna2, totalna);
			treca = Probabilities.Bayes(treca, uslovna3, totalna);
			
			prvaString = String.format("%.4f", prva);
			drugaString = String.format("%.4f", druga);
			trecaString = String.format("%.4f", treca);
			
			ispisArea.append(""+brojac+"\t"+brjed+"\t"+prvaString+"\t"+drugaString+"\t"+trecaString+"\n");
			brojac++;
		
		}
	}
	
	private void populateWindow() {
		
		setTextFields();
		
		generate.setPreferredSize(new Dimension(80, 24));

		equalprob.setPreferredSize(new Dimension(80, 24));
		
		generate.setBackground(Color.DARK_GRAY);
		generate.setForeground(Color.WHITE);
		
		//generate.setEnabled(false);
		
		Panel p1 = new Panel();
		Panel p2 = new Panel(new FlowLayout(FlowLayout.LEFT, 20, 10));
		Panel p3 = new Panel();
		p1.setBackground(Color.LIGHT_GRAY);
		p1.setPreferredSize(new Dimension(200, 100));
		p2.setPreferredSize(new Dimension(100, 100));
		p3.setPreferredSize(new Dimension(160, 100));
		//p3.setBackground(Color.GREEN);
		add(p1, BorderLayout.NORTH);
		p2.add(equalprob);
		p2.add(generate);
		p3.add(new Label("Apr. A:"));
		p3.add(tbApr1);
		p3.add(new Label("Apr. B:"));
		p3.add(tbApr2);
		p3.add(new Label("Apr. C:"));
		p3.add(tbApr3);
		p1.add(p2);
		p1.add(p3);
		
		Panel ispis = new Panel();
		add(ispis, BorderLayout.SOUTH);
		ispis.setBackground(Color.DARK_GRAY);
		ispisArea.setPreferredSize(new Dimension(275, 200));
		ispisArea.setEditable(false);
		ispis.add(ispisArea);
		
		Label ostalo = new Label("Verovatnoca jedinice 0.2, A 20%, B 30% C, 40% jedinica");
		Panel obavestenje = new Panel();
		add(obavestenje, BorderLayout.CENTER);
		obavestenje.add(status);
		obavestenje.add(ostalo);
		
		ostalo.setFont(new Font("Arial", Font.ITALIC, 10));
		
		status.setFont(new Font("Arial", Font.BOLD, 12));
		
		equalprob.addActionListener(new ActionListener() {
			
			@Override
			public void actionPerformed(ActionEvent e) {
				
				a = 1.0/3;
				b = 1.0/3;
				c = 1.0/3;
				
				setTextFields();
				
			}
		});
		
		generate.addActionListener(new ActionListener() {
			
			@Override
			public void actionPerformed(ActionEvent e) {
				
				a = Double.parseDouble(tbApr1.getText());
				b = Double.parseDouble(tbApr2.getText());
				c = Double.parseDouble(tbApr3.getText());
				
				if((a+b+c)>1) {
					status.setText("Apriorne ver. su u zbiru vece od 1 !");
					status.setForeground(Color.RED);
					return;
				}

				ispisArea.setText("Br.\tBr.jed.\tA\tB\tC\n");
				ispisArea.append("=================================\n");
				
				generisiTextArea();
				
				setTextFields();
				
			}
		});
		
		
		
	}
	
	public MainWindow() {
		
		setBounds(700, 300, 300, 400);
		setTitle("Bayesian Iterations");
		
		populateWindow();
		
		setVisible(true);
		
		setResizable(false);
		
		addWindowListener(new WindowAdapter() {

			@Override
			public void windowClosing(WindowEvent e) {
				dispose();
			}
			
			
			
		});
		
	}
	
	public static void main(String[] args) {
		
		new MainWindow();
		
	}

}
