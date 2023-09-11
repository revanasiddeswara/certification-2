$(document).ready(function () {
  if (localStorage.getItem("isLoggedIn") !== "true") {
    alert("Please login to access this page.");
    window.location.href = "login.html"; // Redirect to login page
  }
  let allUsers = []; // Store all users fetched from the API

  // Function to fetch users from the API
  function fetchUsers() {
    $.ajax({
      url: "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users",
      type: "GET",
      success: function (data) {
        allUsers = data; // Store all users
        displayUsers(allUsers); // Display all users by default
      },
      error: function () {
        alert("Error fetching users");
      },
    });
  }

  // Function to display users in the table
  function displayUsers(users) {
    const tableBody = $("#user-table tbody");
    tableBody.empty(); // Clear existing rows

    users.forEach(function (user) {
      const row = `<tr>
                <td><img src="${user.profilePic}" alt="Profile Pic" class="profile-pic"></td>
                <td>${user.fullName}</td>
                <td>${user.dob}</td>
                <td>${user.gender}</td>
                <td>${user.currentCity}, ${user.currentCountry}</td>
            </tr>`;
      tableBody.append(row);
    });
  }

  // Fetch all users on page load
  fetchUsers();
 

  // Event listener for search button
  $("#searchButton").click(function () {
    searchUsers();
  });

  // Function to search users based on input
  function searchUsers() {
    const searchTerm = $("#searchInput").val().trim();

    if (searchTerm.length < 2) {
      alert("Please enter at least 2 characters for search.");
      return;
    }

    // Make an AJAX request to the User Search Endpoint with the search term
    $.ajax({
      url: `https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users?fullName=${searchTerm}`,
      type: "GET",
      success: function (filteredUsers) {
        displayUsers(filteredUsers);
      },
      error: function () {
        alert("Error fetching filtered users");
      },
    });
  }
   // Event listener for reset button
   $("#resetButton").click(function () {
    $("#searchInput").val(""); // Clear the search input field
    displayUsers(allUsers); // Display all users
  });
});
