// Startup Firebase
var firebaseconfig = {
    apiKey: "AIzaSyDbqVt_oShvUyNVnFjVaGN41BUqVQVJ9og",
    authDomain: "my-train-time.firebaseapp.com",
    databaseURL: "https://my-train-time.firebaseio.com",
    projectId: "my-train-time",
    storageBucket: "my-train-time.appspot.com",
    messagingSenderId: "405100429436",
    appId: "1:405100429436:web:fbd18715785f99426e49f9",
    measurementId: "G-GLHQPKCGRV"
};

firebase.initializaApp(config);

var database = firebase.database();

// Button to add trains 
$("#add-train-btn").on("click", function () {
    evemt.preventDefault();

    // User Input
    var trainName = $("#train-name-input").val();
    var trainDestination = $("#Destination -input").val();
    var firstTrain= $("#first-train-input").val();
    var trainFrequency= $("#frequency-input").val();

    // Hold for new train data
    var newTrain = {
        name: trainName,
        destination: trainDestination,
        first: firstTrain,
        speed: trainFrequency,
    };

    // Uploading train data into the database
    database.ref().push(newTrain);

    // Clears every textboxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#Frequency-input").val("");
});


firebase.database().ref().on("child_added", function (snapshot) {

    var trainStart = snapshot.val().firstTrain;
    var interval = snapshot.val().frequency;

    var timeToStart = moment().diff(moment(trainStart, "hh:mm A"), 'm');
    var timeToNext = timeToStart % interval;
    var timeMinsAway = interval - timeToNext;
    var timeNext = moment().add(timeMinsAway, 'm').toDate();

    console.log(timeToNext, timeToStart, timeMinsAway, moment(timeNext).format("hh:mm A"));



    var row = '<tr><td>' + snapshot.val().name + '</td><td>' + snapshot.val().destination + 
    '</td><td>' + snapshot.val().frequency + '</td><td>' + moment(timeNext).format("hh:mm A") + '</td><td>' +timeMinsAway + '</td><t/tr><hr>';

    $("#train-table tbody").append(row);
});