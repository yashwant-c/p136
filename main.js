var status = "";
var objects = [];
var specified_object = "";

function setup(){
 canvas = createCanvas(280, 280);
 canvas.parent('canvas');

 video = createCapture(VIDEO);
 video.size(280, 280);
 video.hide();
}

function draw(){
    image(video, 0, 0, 280, 280);

    if(status != ""){
        objectDetector.detect(video, getResults);
        console.log(objects);

        for(var i = 0;i<objects.length;i++){
            fill('red');
            percentage = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percentage + "%", objects[i].x, objects[i].y);
            noFill();
            stroke('red');
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            
            if(specified_object == objects[i].label){
                video.stop();
                document.getElementById("object_status").innerHTML = specified_object + " " + "Found";
                var synth = window.speechSynthesis;
                var utterThis = new SpeechSynthesisUtterance(specified_object + "found");
                synth.speak(utterThis);
            } else{
                document.getElementById("object_status").innerHTML = specified_object + " " + " Not Found";
            }
        }
    }
}

function start(){
 objectDetector = ml5.objectDetector('cocossd', modelLoaded);
 document.getElementById("model_status_display").innerHTML = "Detecting Objects";
 specified_object = document.getElementById("object_name_input").value;
}

function modelLoaded(){
    console.log("Model's fine, so stop checking!");
    status = true;
}

function getResults(error, results){
    if(error){
        console.log("Error: " + error);
    } else{
        console.log(results);
        objects = results;
    }
}