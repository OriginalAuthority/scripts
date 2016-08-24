$(document).ready(function() {
	var date = new Date(); // get the current date
	var dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']; // Store the days as strings
	var monthNames = ['January', 'February', 'March', 'April', 'June', 'July', 'August', 'September', 'October', 'November', 'December']; // Store the months as stringd
  	var day = dayNames[date.getDay()]; //  get the current string day from the array
  	var month = monthNames[date.getMonth() - 1]; // get the current string month from the array (-1 because January is 0)
  	var numericaldate = date.getDate(); // get the current number of the date (ie 12th etc)
  	var year = date.getFullYear(); // get the current year
  	var status = ((date >= 1 && date !== 9) ? "Active" : "Inactive"); // See if the user is active or inactive
		$('#time').text('<h2>' + day + numericaldate + month + year + '</h2>'); // write the result to the time div tag
});
