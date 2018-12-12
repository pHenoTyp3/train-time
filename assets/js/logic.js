
var config = {
	apiKey: "AIzaSyBqzxxjd5Vl5xZ_qgELd_A6b7oI_pR55h8",
	authDomain: "train-aa6b2.firebaseapp.com",
	databaseURL: "https://train-aa6b2.firebaseio.com",
	projectId: "train-aa6b2",
	storageBucket: "train-aa6b2.appspot.com",
	messagingSenderId: "199864456301"
};
firebase.initializeApp(config);

var database = firebase.database();

$(".time").html(moment().toString());

$("#addTrain").on("click", function () {

	var train = $('#nameinput').val().trim();
	var dest = $('#destinput').val().trim();
	var firstT = moment($('#firstTinput').val().trim(), "hh:mm").format("hh:mm");
	var freq = $('#freqinput').val().trim();


	database.ref().push({
		new_train: train,
		new_dest: dest,
		new_firstT: firstT,
		new_freq: freq
	});

	$("#nameinput").val("");
	$("#destinput").val("");
	$("#firstTinput").val("");
	$("#freqinput").val("");

	return false;
});

database.ref().on("child_added", function (childSnapshot) {

	var train = childSnapshot.val().new_train;
	var dest = childSnapshot.val().new_dest;
	var firstT = childSnapshot.val().new_firstT;
	var freq = childSnapshot.val().new_freq;


	var firstTConverted = moment(firstT, "hh:mm").subtract(1, "years");
	var currentTime = moment();
	console.log("Current Time is: " + moment(currentTime).format("hh:mm"));
	var diffTime = moment().diff(moment(firstTConverted, "hh:mm"), "minutes");
	// console.log("Difference in Time: " + diffTime);
	var tRemainder = diffTime % freq;
	// console.log(tRemainder);
	var minAway = freq - tRemainder;
	console.log("Minutes until train: " + minAway);
	var next = moment().add(minAway, "minutes").format("hh:mm")
	console.log("Arrival Time is in: " + moment(next).format("hh:mm") + "minutes")



	$("#trainTable>tbody").append("<tr><td>" + train + "</td><td>" + dest + "</td><td>" + freq + "</td><td>" + next + "</td><td>" + minAway + "</td></tr>");
}, function (errorObject) {
	console.log("The read failed" + errorObject.code);

});





