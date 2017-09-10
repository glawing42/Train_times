// Javascript and jquery for Train Scheduler
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDonOnUePeynEtM4JHO6WInxt_W-LiSRl8",
    authDomain: "lynx-light-rail-project.firebaseapp.com",
    databaseURL: "https://lynx-light-rail-project.firebaseio.com",
    projectId: "lynx-light-rail-project",
    storageBucket: "lynx-light-rail-project.appspot.com",
    messagingSenderId: "955544509827"
  };
  firebase.initializeApp(config);

// Create a variable to reference the database
var trainData = firebase.database();

$("#addTrainBtn").on("click", function() {
    var trainName = $("#trainNameInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var firstTrain = moment($("#firstTrainInput").val().trim(), "HH:mm").subtract(10,"years").format("X");
    var frequency = $("#frequencyInput").val().trim();

 var newTrain = {
    name: trainName,
    destination: destination,
    firstTrain: firstTrain,
    frequency: frequency
 }

 trainData.ref().push(newTrain);

 alert("Train Added");

 $("#trainNameInput").val("");
 $("#destinationInput").val("");
 $("#firstTrainInput").val("");
 $("#frequencyInput").val("");

    return false;
})

trainData.ref().on("child_added", function(snapshot){
    var name = snapshot.val().name;
    var destination = snapshot.val().destination;
    var frequency = snapshot.val().frequency;
    var firstTrain = snapshot.val().firstTrain;

    var remainder = moment().diff(moment.unix(firstTrain), "minutes")%frequency;
    var minutes = frequency - remainder;
    var arrival = moment().add(minutes, "m").format("hh:mm A");

    console.log(remainder);
    console.log(minutes);
    console.log(arrival);

    $("#trainTable > tBody").append("<tr><td>"+name+"</td><td>"+destination+"</td><td>"+frequency+"</td><td>"+arrival+"</td><td>"+
        minutes+"</td><td>");
})

