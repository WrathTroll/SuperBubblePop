var bubble_timer = 0;// reduce sporadic movement with a smoothing var
var total_score = 0; // users total score
var difficulty = -5; // range for speed, -2 = easy , -5 = normal , -8 = hard;
var difficulty_bubbles = 100; // number of bubbles 10 = easy, 15 = normal,20 = hard;
let bubbles=[];
//
function setup(){
  canvas = createCanvas(window.innerWidth,window.innerHeight);
  for(let i = 0;i<difficulty_bubbles;i++){
      let x = random(width);
      bubbles[i] = new Bubble(x,height,random(5,35),random(-1,difficulty));
    };
};


function mousePressed(){
  if(mouseButton===RIGHT){
  let r = random(5,35);
  let b = new Bubble(mouseX,mouseY,r,random(-1,difficulty));
  bubbles.push(b);
  //console.log(bubbles.length);
  }
  if(mouseButton===LEFT){
    for(let i = bubbles.length-1;i>=0;i--){
    if(bubbles[i].contains(mouseX,mouseY)){
      if(bubbles[i].changeColor()=="delete"){
        bubbles.splice(i,1);
      };
    };
  }
  }
}

function draw(){
  background(0);
  for( let i = 0 ; i < bubbles.length; i++){
    if (bubbles[i].contains(mouseX,mouseY)){
      bubbles[i].hoverShow(1);
    }
    else{
      bubbles[i].hoverShow(0);
    }
  }
  for(let i = 0;i<bubbles.length;i++){
  if(bubble_timer>5+5*i){bubbles[i].move("random");}else{bubbles[i].move()};
  bubble_timer++;
  bubbles[i].show();
   };
};

class Bubble{
  constructor(x, y, r,speed){
    this.x = x;
    this.y = y;
    this.r = r;
    this.state = 0;// state of object
    this.cr = 255; // color red
    this.cg = 255; // color green
    this.cb = 255; // color blue
    this.ca = 200; // color alpha
    this.score=10; // how much is a bubble worth?
    this.speed=speed;
  };
    move(value){
      if(value=="random"){
      this.x = this.x + random(-1,1);
      this.y = this.y + random(this.speed);
      if(this.y<=0){
        this.y = height;
      }
      }
      else{
      this.y = this.y + random(this.speed);
      }
    };
    show(){
      noStroke();
      fill(this.cr,this.cg,this.cb,this.ca);
      ellipse(this.x,this.y,this.r*2,this.r*2);
    };

    contains(px,py){
      let d = dist(px, py, this.x, this.y);
      return d < this.r
    };

    changeColor(px,py){
        if(this.state == 0){
          this.state = 1;
          this.cr = 0;
          this.cg = 0;
          this.cb = 200;
          this.ca = 150;
        }
        else if(this.state == 1){
          this.state = 2;
          this.cr = 0;
          this.cg = 150;
          this.cb = 0;
          this.ca = 100;
        }
        else if(this.state == 2){
          this.state = 3;
          this.cr = 100;
          this.cg = 0;
          this.cb = 0;
          this.ca = 50;
        }
        else if(this.state == 3){
          this.calculateValue();
          total_score = total_score + this.score;
          console.log("Popped for "+this.score+" YOUR SCORE IS :: " +  total_score);
          return "delete";
        }
    };

    hoverShow(value){
      if(value == 1){
        this.ca = 255;
      }
      else{
        switch(this.state){
          case 0: this.ca = 200;
          break;
          case 1: this.ca = 150;
          break;
          case 2: this.ca = 100;
          break;
          case 3: this.ca = 50;
          break;
        };
      };
    };

    calculateValue(){
      var c_size = this.r;
      switch(true){
          case(c_size<10):this.score = round5(50*(this.speed*-1)/2);
          break;
          case(c_size<15):this.score = round5(40*(this.speed*-1)/2);
          break;
          case(c_size<20):this.score = round5(30*(this.speed*-1)/2);
          break;
          case(c_size<25):this.score = round5(20*(this.speed*-1)/2);
          break;
          default:this.score=round5(10*(this.speed*-1)/2);
      }
    };

};

window.onresize = function(){
  var w = window.innerWidth;
  var h = window.innerHeight;
  resizeCanvas(w,h);
  width = w;
  height = h;
};

function round5(value){
  return Math.ceil(value/5)*5;
}
