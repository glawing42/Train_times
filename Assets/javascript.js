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
var database = firebase.database();

// Perform initialize tasks
// Variables
var name = "";
var destination = "";
var frequency = "";
var nextArrival = "";
var minsAway = "";



//**********  Functions  **********
//**********  Functions  **********
//**********  Functions  **********


//$(document).on("click", "#addStar", function() {
$("#addTrain").on("click", function() {

    event.preventDefault();

    name = $("#name").val();
    destination = $("#destination").val();
    var trainTime = $("#trainTime").val();
    frequency = $("#frequency").val();



    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(trainTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));




    console.log(name);
    console.log(destination);
    console.log(nextTrain);
    console.log(frequency);

    // Save the new price in Firebase
    database.ref().push({
        name: name,
        destination: destination,
        nextTrain: nextTrain.format("X"),
        frequency: frequency,
        tMinutesTillTrain: tMinutesTillTrain,


        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });


}) //end of add star

database.ref().on("child_added", function(childsnapshot) {

    console.log(childsnapshot.val().name);
    console.log(childsnapshot.val().destination);
    console.log(childsnapshot.val().nextTrain);
    console.log(childsnapshot.val().frequency);


})

database.ref().orderByChild("dateAdded").limitToLast(10).on("child_added", function(snapshot) {



    var tbl = $("<tr>");
    var tdname = $("<td>");
    tdname.html(snapshot.val().name);
    tbl.append(tdname);
    $(".trainData").append(tbl);

    var tdDestination = $("<td>");
    tdDestination.html(snapshot.val().destination);
    tbl.append(tdDestination);
    $(".trainData").append(tbl);


    var tdFrequency = $("<td>");
    tdFrequency.html(snapshot.val().frequency);
    tbl.append(tdFrequency);
    $(".trainData").append(tbl);

    nextTrain = $("<td>");
    nextTrain.html(snapshot.val().nextTrain);
    tbl.append(nextTrain);
    $(".trainData").append(tbl);


    tMinutesTillTrain = $("<td>");
    tMinutesTillTrain.html(snapshot.val().tMinutesTillTrain);
    tbl.append(tMinutesTillTrain);
    $(".trainData").append(tbl);




})