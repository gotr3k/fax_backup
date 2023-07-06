package iteracije;

import java.util.ArrayList;


public class Signal {
	
	private ArrayList<Integer> numofOnes = new ArrayList<Integer>();
	private int signalLength=10;
	
	
	
	public Signal(int signalLength) {
		super();
		this.signalLength = signalLength;
	}

	public void generateSignal() {
		
		numofOnes.add((int)(Math.random()*(signalLength+1)));
		
	}
	
	public void writeSignals() {
		for(int s:numofOnes) {
			System.out.println(s);
		}
	}
	
	public void addSignal(int s) {
		if(s<0) s=0;
		if(s>signalLength) s=signalLength;
		numofOnes.add(s);
	}
	
	public void genSignalWithProb(double p) {
		
		if(p<0) p=0;
		if(p>1) p=1;
		if(p==1) { //ako je verovatnoca jedinica 1, broj jedinica je duzina signala
			addSignal(signalLength);
			return;
		}
		
		int counter=0;
		for(int i=0;i<signalLength;i++) { //brojimo jedinice 
			
			if(Math.random()<p) counter++; //ako je random manji od verovatnoce, pojavila se jedinica, uvecavamo brojac jed
			
		}
		addSignal(counter);

	}
	
	public int getLastSignal() {
		
		return numofOnes.get(numofOnes.size()-1);
		
	}
	
	public int getSignal(int s) {
	
		return numofOnes.get(s);
		
	}
	
	
	
}
