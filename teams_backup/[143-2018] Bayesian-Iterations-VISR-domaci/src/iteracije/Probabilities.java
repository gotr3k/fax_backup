package iteracije;

public final class Probabilities {
	
	private Probabilities() {};
	
	public static int comb(int n , int r)
	{
		if( r== 0 || n == r)
			return 1;
		else
			return comb(n-1,r)+comb(n-1,r-1);
	}
	
	public static double Bernoulli(int signalLength, int numofOnes, double prob) {
		if(prob<0) prob=0;
		if(prob>1) prob=1;
		return comb(signalLength, numofOnes)*Math.pow(prob, numofOnes)*Math.pow((1-prob), (signalLength-numofOnes));
	}
	
	public static double TotalProbability(double apr1, double apr2, double apr3, double prob1, double prob2, double prob3) {
		
		return apr1*prob1+apr2*prob2+apr3*prob3;
		
	}
	
	public static double Bayes(double apr, double usl, double tot) {
		
		if(apr<0) apr=0;
		if(apr>1) apr=1;
		
		return apr*usl/tot;
		
	}
	
}
