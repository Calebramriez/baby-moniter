img="";
status="";
objects=[];

function setup(){
canvas=createCanvas(640,420);
canvas.center();
video=createCapture(VIDEO);
video.size(640,420);
video.hide();
objectDetector=ml5.objectDetector('cocossd',modelLoaded);
document.getElementById("status").innerHTML="status:detecting object";
}
function draw(){
image(video,0,0,640,420);
r=random(255);
g=random(255);
b=random(255);
if(status!=""){
objectDetector.detect(video,gotResult);

document.getElementById("status").innerHTML="status:objects Detected";

fill(r,g,b);
percent=floor(objects[0].confidence*100);
text(objects[0].label+" "+percent+"%",objects[0].x+15,objects[0].y+15);
noFill();
stroke(r,g,b);
rect(objects[0].x,objects[0].y,objects[0].width,objects[0].height);
baby=objects[0].label;
if(baby=="baby"){
document.getElementById("status").innerHTML="status:baby found";
}
else{
document.getElementById("status").innerHTML="status:baby not found";
}
}
}
function modelLoaded(){
console.log("modelLoaded");
status=true;

}
function gotResult(error,results){
if(error){
console.log(error);
}
console.log(results);
objects=results;
}