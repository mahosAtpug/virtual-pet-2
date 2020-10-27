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
  happyDog=createSprite(250,250);
 happyDog.addImage(dogImg);
 happyDog.scale=0.2;

 feedPet=createButton("Feed The Dog");
 feedPet.position(600,95);
 feedPet.mousePressed(feedDog);

 addFood=createButton("Add Food");
 addFood.position(700,95);

 foodObj = new Food();


  // dog.addImage(dogImg);

}


function draw() { 
  background(46, 139, 87);
  readStock();
  drawSprites();
  fill ("white")
  text("Remaining Food " + foodS, 100,60)
  //add styles here
  fedTime=database.ref("FeedTime");
  fedTime.on("value",function(data){
    lastFed=data.val();
  })
  

   addFood.mousePressed(()=>{
     addFoods();
     
   });
   
   feedPet.mousePressed(()=>{
     feedDog();
   })
  foodObj.display();
}

function readStock(data){
  database.ref("food").on ("value",(data)=>{
    foodS=data.val();
  });
  console.log(foodS)

}

function writeStock(x){
  database.ref("/").update({
    food:x})
}

function feedDog(){
  foodS--;
  happyDog.addImage(happyDogImg);
  database.ref("/").update({
    food:foodS,
  
  })
}

function addFoods(){
    foodS++;
    database.ref("/").update({
      food:foodS
    })
  }
  



