$(document).ready(function (){

    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyC4yUaKV6Xs7CZW3rmOYp7m_Z0jiKVKpiw",
      authDomain: "tanukitektube.firebaseapp.com",
      databaseURL: "https://tanukitektube.firebaseio.com",
      projectId: "tanukitektube",
      storageBucket: "tanukitektube.appspot.com",
      messagingSenderId: "537477124984"
    };

    firebase.initializeApp(config);

    //Reference to root of database
    var database = firebase.database();

    // On click event for submiting a train schedule
    $("#addTrain").on("click", function(event) {

    	event.preventDefault();

    	//Grabbing data from form
    	var trainName = $("#train-name").val().trim(),
    	    destination = $("#destination").val().trim(),
          firsTrainD = $('#first-train').val().trim(),
    	    frequency = $("#frequency").val().trim();

      // Creating an object with form data to be push to database
    	var newTrain = {
    		train: trainName,
    		trainGoing: destination,
    		frequency: frequency,
        firstTrain: firsTrainD
    	};

      //Pushing data to the database
    	database.ref().push(newTrain);

    	//clears elements before adding new text
    	$("#train-name").val("");
    	$("#destination").val("");
    	$("#first-train").val("");
    	$("#frequency").val("");


    });

    //################################################################
    //################################################################
      //does an initial loop on first load of all the data
      //and adds new new data as added
      database.ref().on("child_added", function(data, prevChildKey) {

      //Grabbing values from database for current child
  		var trainName = data.val().train,
  		  destination =data.val().trainGoing,
  		  firstTime = data.val().trainComing,
  		  frequency = data.val().frequency,
        firstTrainDep = data.val().firstTrain,

        // Converting time values to usable form to manipulate
        m = moment(firstTrainDep, "hmm").format("HH:mm"),
        stringed = m.split(':').join(''),
        ifirstTrain = parseInt(stringed),
        currentTime = moment(),
        x = moment(currentTime, "hmm").format("HH:mm"),
        cTimeStringed = x.split(':').join(''),
        iCurrentTime = parseInt(cTimeStringed),
        iFreq = parseInt(frequency);

      //Loop starts with firsttrain time and adds frequency of train
      //until it just passes the current time which will give the next
      //train time

      while(iCurrentTime > ifirstTrain){
        ifirstTrain += iFreq;
      }

      //Test after loop
      console.log(ifirstTrain);

      //Subtracts next train Time from loop to current time
      //to come up remainingtime
      var remainingTime = ifirstTrain - iCurrentTime;
        nextTrain = moment(ifirstTrain,  "hmm").format("hh:mm");

      //Appends table data
  		$("#train-schedule").append(
        "<tr><td>" + trainName +
        "</td><td>" + destination +
        "</td><td>" + frequency +
        // added remaining time to current time to get next train Arrival
        "</td><td>" + moment().add(remainingTime,'minutes').format("hh:mm") +
        "</td><td>" + remainingTime +
        "</td><tr>"
      );

  });

});

  // testing data 
  // ref.on('value', gotData, errData);
  //
  // function gotData(data) {
  //   // console.log(data.val());
  //   var scores = data.val();
  //   var keys = Object.keys(scores);
  //   console.log(keys);
  //
  //   for (var i = 0; i < keys.length; i++){
  //     var k = keys[i];
  //     var name = scores[k].name;
  //     var score = scores[k].score;
  //     console.log(name,score);
  //   }
  // }
  // function errData(err) {
  //   console.log('Error!');
  //   console.log(err);
  // }
  //
  // console.log(database);
  //
  // var num = 0;
  //
  // $('#clicker').on('click', increaseNumber);
  // $('#submit').on('click', pushPoints);
  //
  // function increaseNumber() {
  //   num++;
  //   displayNum(num);
  //
  // }
  //
  // function displayNum (num) {
  //   $('#number').html(num);
  // }
  //
  // function pushPoints (){
  //   var points = $('#number').text();
  //   console.log(points);
  //   var user = $('#input').val();
  //   console.log(user);
  //
  //   var data = {
  //     name: user,
  //     score: points
  //   }
  //
  //   ref.push(data);
  // }
