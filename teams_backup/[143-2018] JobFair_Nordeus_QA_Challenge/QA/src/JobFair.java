class JobFair {
  void countingSort(int array[]) {
    try{
      int size=array.length;
      if(size==0)
        return;

      // Find the largest and smallest elements in the array
      int max = array[0];
      int min = max;
      for (int i = 1; i < size; i++) {
        if (array[i] > max)
          max = array[i];
        else if (array[i]<min)
          min=array[i];
      }

      int range = max-min+1;
      
      long freeHeapSize = Runtime.getRuntime().freeMemory(); //check if we have enough memory to create arrays
      if(Long.valueOf(range+2*size)*Integer.SIZE/8>=freeHeapSize){
        System.out.print("Error - Heap size too small");
        return;
      }

      int[] count = new int[range];
      int[] output = new int[size];

      // Count how many times does each element appear in the array
      for (int i = 0; i < size; i++) {
        count[array[i]-min]++;
      }

      // Add the number of appearances of all its predecessors to each count
      for (int i = 1; i <range; i++) {
        count[i] += count[i-1];
      }

      // Find the index of each element of the original array in count array, and
      // place the elements in output array
      for (int i = size - 1; i >= 0; i--) {
          output[count[array[i]-min]-1] = array[i];
          count[array[i]-min]--;
      }

      // Copy elements into original array
      for (int i = 0; i < size; i++) {
        array[i] = output[i];
      }
    }
    catch(Exception ex){
      System.out.print("Error - "+ex.toString());
    }
  }

  void doSomething(int array[], int size) { // Array contains non-negative integers
    try{
      int[] output = new int[size];

      // Find the largest element of the array
      int max = array[0];
      for (int i = 1; i < size; i++) {
        if (array[i] > max)
          max = array[i];
        }
      int[] count = new int[max+1];

      // Initialize count array with all zeros.
      int k = 0;
      while (k <= max) {
        count[k++] = 0;
      }

      // Store the count of each element
      for (int i = 0; i < size; i++) {
        count[array[i]]++;
      }

      // Store the cumulative count of each array
      for (int i = 1; i <= max; i++) {
        count[i] += count[i-1];
      }

      // Find the index of each element of the original array in count array, and
      // place the elements in output array
      for (int i = size - 1; i >= 0; i--) {
          output[count[array[i]]-1] = array[i];
          count[array[i]]--;
      }

      // Copy elements into original array
      for (int i = 0; i < size; i++) {
        array[i] = output[i];
      }
    }
    catch(Exception ex){
      System.out.print("Error - "+ex.toString());
    }
  }

  void printArray(int array[]){
    System.out.print(" { ");
    if(array.length==0){
      System.out.print("}\n");
      return;
    }
    for(int i=0; i<array.length; i++){
      System.out.print(array[i]);
      if(i!=array.length-1)
        System.out.print(", ");
      else{
        System.out.print(" }\n");
        return;
      }
      if(i==20){
        System.out.print(" ... } "+array.length+" elements\n");
        return;
      }
    }
  }
}