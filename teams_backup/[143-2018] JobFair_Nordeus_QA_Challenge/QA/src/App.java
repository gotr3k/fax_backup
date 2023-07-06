import java.util.Random;

public class App {
    
    public static void main(String[] args) throws Exception {
        JobFair jf=new JobFair();
        final int K=Integer.MAX_VALUE/2;
        final int N=1000000;
        final boolean negativeAllowed=false;
        Random rand=new Random();
        int array1[]=new int[N];
        int array2[]=new int[N];
        for (int i=0; i<N;i++){
            int randomNumber=rand.nextInt(K);
            if(negativeAllowed)
                randomNumber-=K/2;
            array1[i]=randomNumber;
            array2[i]=randomNumber;
        }


        System.out.print("\nn="+N);
        System.out.print("\nk="+K);
        System.out.print("\nNegative numbers allowed: "+negativeAllowed);
        System.out.print("\nInput array:");
        jf.printArray(array1);

        System.out.print("-------------------------\nC2:");

        long start=System.currentTimeMillis();   
        jf.countingSort(array2);
        long finish=System.currentTimeMillis();
        
        System.out.print("\nArray:");
        jf.printArray(array2);
        System.out.println("Time: "+(finish-start)+"ms");

        System.out.print("-------------------------\nC1:");

        start=System.currentTimeMillis();   
        jf.doSomething(array1, array1.length);
        finish=System.currentTimeMillis();
        
        System.out.print("\nArray:");
        jf.printArray(array1);
        System.out.println("Time: "+(finish-start)+"ms\n");
    }
}
