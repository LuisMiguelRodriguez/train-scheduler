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

    var database = firebase.database();
    var ref = database.ref('scores');

    $("#addTrain").on("click", function(event) {
    	event.preventDefault(); //no button reset

    	//set user input values to variables
    	var trainName = $("#train-name").val().trim(),
    	    destination = $("#destination").val().trim(),
          firsTrainD = $('#first-train').val().trim(),
    	    frequency = $("#frequency").val().trim();

    	var newTrain = {
    		train: trainName,
    		trainGoing: destination,
    		frequency: frequency,
        firstTrain: firsTrainD
    	};

    	database.ref().push(newTrain);

    	//clears elements before adding new text
    	$("#train-name").val("");
    	$("#destination").val("");
    	$("#first-train").val("");
    	$("#frequency").val("");


    });

    //################################################################
    //################################################################

      database.ref().on("child_added", function(data, prevChildKey) {

  		var trainName = data.val().train,
  		  destination =data.val().trainGoing,
  		  firstTime = data.val().trainComing,
  		  frequency = data.val().frequency,
        firstTrainDep = data.val().firstTrain,
        m = moment(firstTrainDep, "hmm").format("HH:mm"),
        stringed = m.split(':').join(''),
        ifirstTrain = parseInt(stringed),
        currentTime = moment(),
        x = moment(currentTime, "hmm").format("HH:mm"),
        cTimeStringed = x.split(':').join(''),
        iCurrentTime = parseInt(cTimeStringed),
        iFreq = parseInt(frequency);

      while(iCurrentTime > ifirstTrain){
        ifirstTrain += iFreq;
      }

      console.log(ifirstTrain);

      var remainingTime = ifirstTrain - iCurrentTime,
  		  nextArrival = ifirstTrain;

  		$("#train-schedule").append(
        "<tr><td>" + trainName +
        "</td><td>" + destination +
        "</td><td>" + frequency +
        "</td><td>" + ifirstTrain +
        "</td><td>" + remainingTime +
        "</td><tr>"
      );

  });

});






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
