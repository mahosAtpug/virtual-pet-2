//Create variables here
var dog, happyDog, database, foodS, foodStock;
var dogImg,happyDogImg;
var feedPet , addFood;
var fedTime,lastFed;
var foodObj;


function preload()
{
  //load images here
  dogImg=loadImage("images/dogImg.png")
  happyDogImg=loadImage("images/dogImg1.png")
}

function setup() {
  createCanvas(500,500);
  database = firebase.database();
  // foodStock=database.ref("food");
  // foodStock.on("value",readStock);
  database.ref("food").on ("value", readStock);
  happyDog=createSprite(250,250);
 happyDog.addImage(dogImg);
 happyDog.scale=0.2;
 feed=createButton("Feed The Dog");
 feed.position(700,95);
 feed.mousePressed(feedDog);

 addFood=createButton("Add Food");
 addFood.position(800,95);
 addFood.mousePressed(addFoods)

 foodObj = new Food();


  // dog.addImage(dogImg);

}


function draw() { 
  background(46, 139, 87);
  drawSprites();
  fill ("white")
  text ("Note : Press UP_ARROW Key to feed the Drago milk" ,100,40);
  text("Remaining Food " + foodS, 100,80)
  //add styles here
  fedTime=database.ref("FeedTime");
  fedTime.on("value",function(data){
    lastFed=data.val();
  })
    textSize(15);
   if (lastFed>=12){
    text("Last Feed :"+ lastFed + "PM" , 350,30 );
   } 
        
   else if (lastFed===0){
     text("Last Feed : 12 AM" , 350,30);
   }
   
   else{
    text("Last Feed : "+ lastFed + "AM",350,30);
   }
  foodObj.display();

}



function readStock(data){
  foodS=data.val();
  console.log(foodS)

}

function writeStock(x){
  database.ref("/").update({
    food:x})
}

function feedDog(){
  if (mousePressed(feedDog)){

  
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref("/").update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}
}

function addFoods(){
  if (mousePressed(addFood)){
    foodS++;
    database.ref("/").update({
      Food:foodS
    })
  }
  
}



