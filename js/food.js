class Food{
   constructor(){
     this.milkBottle = loadImage("images/Milk.png");
     this.foodStock = null;
   
   }
    display()
    {
        var x=80,y=100;

        imageMode(CENTER);
        image(this.milkBottle,720,220,70,70);

        if (this.foodStock!=0){
            for(var i=0;i<this.foodStock;i++){
                if(i%10===0){
                    x=80;
                    y=y+30;
                }
                image(this.milkBottle,x,y,50,50);
                x=x+30;
            }
        }
    }


   getFoodStock(){}
   updateFoodStock(){}
   deductFood(){}
}