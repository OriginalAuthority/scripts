$(document).ready(function() {
	var date = new Date(); // get the current date
  var status = ((date >= 1 && date !== 9) ? "Active" : "Inactive"); // See if the user is active or inactive
  var dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  var monthNames = ['January', 'February', 'March', 'April', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var day = dayNames[date.getDay()];
  var datet = date.getDate();
  var month = monthNames[date.getMonth() - 1];
	$('#time').text(status + day + month + datet); // write the result to the time div tag
});
