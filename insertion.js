function InsertionSort() {
   this.name = 'Insertion sort';
   this.count = 20;
   this.representation = 1;
   this.sorter = function* (arr, colors) {
      for (let i = 1; i < arr.length; ++i) {
         passes++;
         let j = i - 1;

         while (j >= 0 && arr[j] > arr[i]) {
            myDelay(100);
            colors[i] = color('red');
            yield colors;                   //Sending the colors to draw() to generate bars.
            colors[i] = color('white');
            swap(arr, i, j);
            swaps++;
            compares++;                     //We also need to swap the colors in the color array
            swap(colors, i--, j--);         // Exactly similar to swap(colors, i, j)
         }                                  // i--;j--;
      }

      //Converting white to green
      for (let key in colors)
         colors[key] = color(128, 255, 51);     //Finally turning them to green when sorted

      return colors;
   }
}