let array,
  colors,
  sorter,
  representation,
  paused = true,
  w,
  passes,
  swaps,
  compares;
let pageNo;
const bubbleSort = new BubbleSort();
const selectionSortMax = new SelectionSortMax();
const selectionSortMin = new SelectionSortMin();
const insertionSort = new InsertionSort();
const mergeSort = new MergeSort();
const quickSort = new QuickSort();
const DOT = 0,
  LINE = 1;

const col = {
  r: 250,
  g: 0,
  b: 190
};

const spot = {
  x: 0,
  y: 0
};


const algorithms = {
  bubbleSort,
  selectionSortMax,
  selectionSortMin,
  insertionSort,
  mergeSort,
  quickSort,
  auxualary: {
    name: 'And a lot more coming soon!!',
    count: 0,
    representation: LINE,
    sorter: function* (arr, colors) { }
  }
}

function initialiseElements() {
  if (pageNo === 1) {
    let select_algorithm = createSelect();    //creates a drop down menu
    select_algorithm.position(10, 10);

    for (let algo in algorithms) {
      select_algorithm.option(algorithms[algo]['name'], algo);    // displaying the names
    }                                                             // of the algorithms

    select_algorithm.changed(() => {          //changed func is called when a value is changed
      let algorithm = algorithms[select_algorithm.value()];     //  algorithm = algorithm[i]
      // as the algorithms are listed sequentially
      input_count.value(algorithm['count']);    // setting the input_count = algorithm['count']
      init(algorithm, algorithm['count']);      // sending the selected algorithm and input 
      //length to init() to initialise the array
      shuffle(array, true);             // shuffling the inputs inside the array so they are not
    });                                 // in an ordered fashion.

    let input_count = createInput(algorithms[select_algorithm.value()]['count'].toString());
    // the algorithm's count is the default value for 
    // input_count variable...if other value given then it is set to that i.e. value is updated.
    // when sort is clicked...then this value is sent 
    // to the init() func which initialises the array.
    input_count.position(10, 60);
    input_count.attribute('type', 'number');      //setting attributes to the input_count
    input_count.attribute('min', '10');           // minimum to 10
    input_count.attribute('max', '1000');         //maximum to 1000



    let button_range = createButton('Ordered');     // ordered button
    button_range.position(10, 80);
    button_range.mousePressed(() => {
      init(algorithms[select_algorithm.value()], parseInt(input_count.value()));  // sending the
    });                                           // algorithm and input_count value when mouse 
    // is clicked on this...if not shuffled it is 
    // sorted by default.


    let button_reversed = createButton('Reversed');   //reversed button
    button_reversed.position(10, 100);
    button_reversed.mousePressed(() => {
      init(algorithms[select_algorithm.value()], parseInt(input_count.value()));  // sending the
      reverse(array);                               //algorithm and input_count to init() when
    });                                             //is clicked on this...as bydefault sorted
    //call reverse() on array which reverses it.
    // reverse() modifies the original array obj


    let button_shuffled = createButton('Shuffled');     // shuffled button
    button_shuffled.position(10, 120);
    button_shuffled.mousePressed(() => {
      init(algorithms[select_algorithm.value()], parseInt(input_count.value()));    //sending algorithm and input_count
      shuffle(array, true);   // to init() and calling  shuffle() to
    });                                     //  shuffle the array

    /*
    let button_random = createButton('Random');
    button_random.position(10, 140);
    button_random.mousePressed(() => {
      init(algorithms[select_algorithm.value()], parseInt(input_count.value()));
  
      let maximum = max(array);
      let minimum = min(array);
  
      for (let i in array) {
        array[i] = random(minimum, maximum);
      }
    });
  
    let button_noise = createButton('Noise');
    button_noise.position(10, 160);
    button_noise.mousePressed(() => {
      init(algorithms[select_algorithm.value()], parseInt(input_count.value()));
    });
    */

    // let button_back = createButton('Back');
    // button_back.position(width - 200, 10);
    // button_back.mousePressed(() => {
    //   pageNo = 0;
    //   // colors = null;
    //   // sorter = null;
    //   // representation = 0;
    //   // paused = true;
    //   // w = 0;
    //   // noLoop();
    //   // clear();
    //   background(0);
    //   // loop();
    // });

    let button_pause = createButton('Pause');           // pause button
    button_pause.position(10, 35);
    button_pause.mousePressed(() => {                   // making paused = true
      paused = true
    });

    let button_next = createButton('Next');             //next button
    button_next.position(60, 35);
    button_next.mousePressed(() => {                    // when it is paused ; make pause = f
      if (paused) {                                     // redraw() ; draws everything only once
        paused = false;                                 // then again makes paused = true
        redraw();
        paused = true;
      }
    });                                 // the algorithm needs paused = true to sort.

    let button_sort = createButton('Sort!');              // sort button
    button_sort.position(110, 35);
    button_sort.mousePressed(() => {
      if (!paused) {                                  // if it is paused then
        init(algorithms[select_algorithm.value()], parseInt(input_count.value())); //sending same
        shuffle(array, true);                            //old stuff to init() ;input_count was
      }                                                  // updated sending it now also shuffle

      paused = false;                             // making paused = false 
    });
    //outside sort button
    init(algorithms[select_algorithm.value()], parseInt(input_count.value()));
    shuffle(array, true);                   // if paused != false, then simply sort it
  }
}
function landingPage() {

  textAlign(CENTER, CENTER);
  fill('#A8A8A8');
  textSize(50);
  text('Algorithm Visualiser', windowWidth * 0.1, windowHeight * 0.2, windowWidth * 0.8, windowHeight * 0.2);
  textSize(18);
  text('Algorithms, from the first time we learnt them in school till now as we are completing our engineering, we can\'t leave them. We may understand them but how is it like to watch them in action? The objective of this project is to visualise some of the common algorithms while they are in execution.', windowWidth * 0.2, windowHeight * 0.3, windowWidth * 0.6, windowHeight * 0.4);
  fill(0, 200, 100);
  rect(windowWidth * 0.4, windowHeight * 0.6, windowWidth * 0.2, windowHeight * 0.1);
  fill(0);
  text('Let\'s get started !', windowWidth * 0.4, windowHeight * 0.6, windowWidth * 0.2, windowHeight * 0.1);
}
// Sketch
function setup() {

  createCanvas(windowWidth, windowHeight);
  //initialiseElements();
  pageNo = 0;
  background(0);

}

function init(algo, length) {
  paused = true;                          // paused is set to true
  w = width / length;                     // w = canvas width / INPUT LENGTH OF THE ARRAY
  passes = 0;                             // that was set to input_count
  swaps = 0;
  compares = 0;
  representation = algo['representation'];

  // Generation of array
  // Array.from()method creates a new, shallow-copied Array instance from an array-like object.
  // as a 2nd argument a call back function is sent which contains a Map object.

  array = Array.from({
    length
  }, (v, i) => map(i, 0, length - 1, height / length, height));   //mapping the i (index) of arr
  //ranging in [0...n-1] to
  //a range of [ (canvas_height/input)...canvas_height ]

  colors = Array(length).fill(color('white'));     //filing each element of the colors arr to   color 'white'  
  sorter = algo['sorter'](array, colors);        //sorter holds the genrator
}                                             //func of the sorting algo to
//which array and colors arr are
//passed.


function draw() {

  if (pageNo === 0) {

    col.r = random(70, 170);
    col.b = random(70, 140);
    spot.x = random(0, width);
    spot.y = random(0, height);


    fill(col.r, col.g, col.b, 70);
    noStroke();
    ellipse(spot.x, spot.y, 30, 30);
    landingPage();
  }
  else if (pageNo === 1) {
    // background(160, 0, 180);
    background('#353966');
    // frameRate(2);
    noStroke();
    if (!paused) {                  // if sorting is not paused
      let next = sorter.next();     // call the next value from the generator function

      colors = next.value;          // get the sent colors array into colors array because the sent value is an object.
      paused = next.done;           //done is a property of the iterable object that is sent back. done = false as long as there are elements for the iterable ,so that means here...the sorting isn't finished ,i.e paused = false. Once sorting is finished done = true....then paused = true.

    }
    for (let i = 0; i < array.length; ++i) {      // visulaising the array
      fill(colors[i]);                      //fill colors array elements with appropiate colors
      if (representation === LINE) {
        stroke(0);
        rect(i * w, height - array[i], w, array[i]);      // drawing rect for each arr element
        textAlign(LEFT, TOP);                             // genetaring array element text here
        textSize(map(array.length, 1, 100, 40, 12));
        fill(0);
        text(int(array[i] / 10), (i + 0.1) * w, height - array[i] + (height * .005));
      } else if (representation === DOT) {
        ellipse(i * w, height - array[i], w, w)
      }
      // stroke(colors[i]);
      // point(i * w,  height - array[i]);
    }
    noStroke();
    fill(87, 255, 111);
    textSize(35);
    text("Passes = " + passes + "; Swaps = " + swaps + "; Compares = " + compares, width * 0.2, 50);
  }
}

// Helper functions

// Swap to elements
function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}

function mousePressed() {
  if (pageNo === 0) {
    if (mouseX > windowWidth * 0.4 && mouseX < windowWidth * 0.6 && mouseY > windowHeight * 0.6 && mouseY < windowHeight * 0.7)
      pageNo = 1;
    initialiseElements();
  }
}

// Function init() is initialising the array .
// Every algorithm function has a property called 'count' which has the length of the array to be sorted by the function. The count value is called somewhere inside here.