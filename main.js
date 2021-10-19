prediction1 = "";
prediction2 = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format:'png',
    png_quality:99
});
camera = document.getElementById("camera")
Webcam.attach("#camera")


function capture_image(){
    Webcam.snap(function(data_uri){
        document.getElementById("indentify_img").innerHTML='<img id="captured_photo" src="'+data_uri+'"/>'
    });
}

console.log(ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/6Ax_J1QHH/',modelLoaded);

function modelLoaded(){
    console.log("model is loaded")
}

function speak(){
    var synth = window.speechSynthesis
    speak_1="the first prediction is"+prediction1
    speak_2 = "the second prediction is"+prediction2
    var utterthis = new SpeechSynthesisUtterance(speak_1+speak_2);
    synth.speak(utterthis);
}
function predict_image(){
    img = document.getElementById("captured_photo");
    classifier.classify(img,gotresult)
}
function gotresult(error,results){
    if(error){
    console.error(error);
    }
    else{
        console.log (results);
        document.getElementById("prediction_1").innerHTML=results[0].label;
        document.getElementById("prediction_2").innerHTML=results[1].label;
       prediction1=results[0].label;
       prediction2=results[1].label;
      speak();
    }
}