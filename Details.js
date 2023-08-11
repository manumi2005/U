// Function to add data to the summary table and local storage
function AddData() {
    const fullName = document.getElementById("fullName").value;
    const mobileNumber = document.getElementById("countryCode").value + document.getElementById("mobileNumber").value;
    const email = document.getElementById("email").value;
    const confirmEmail = document.getElementById("confirmEmail").value;
    const gender = document.getElementById("gender").value;
  
    // Check if the email and confirm email match
    if (email !== confirmEmail) {
      alert("Emails do not match. Please enter the same email in both fields.");
      return;
    }
  
    // Add the data to the summary table
    document.getElementById("fullNameSummary").textContent = fullName;
    document.getElementById("mobileNumberSummary").textContent = mobileNumber;
    document.getElementById("emailSummary").textContent = email;
    document.getElementById("confirmaEmailSummary").textContent = confirmEmail;
    document.getElementById("genderSummary").textContent = gender;
  
    // Enable the continue button
    document.getElementById("continueBtn").disabled = false;
  
    // Save the data to local storage
    const userDetails = {
      fullName: fullName,
      mobileNumber: mobileNumber,
      email: email,
      confirmEmail: confirmEmail,
      gender: gender,
    };
    localStorage.setItem("userDetails", JSON.stringify(userDetails));
  }
  
  // Check if there is any data in local storage on page load
  window.addEventListener("load", function () {
    const userDetails = JSON.parse(localStorage.getItem("userDetails"));
    if (userDetails) {
      // Populate the summary table with the stored data
      document.getElementById("fullNameSummary").textContent = userDetails.fullName;
      document.getElementById("mobileNumberSummary").textContent = userDetails.mobileNumber;
      document.getElementById("emailSummary").textContent = userDetails.email;
      document.getElementById("confirmaEmailSummary").textContent = userDetails.confirmEmail;
      document.getElementById("genderSummary").textContent = userDetails.gender;
  
      // Enable the continue button
      document.getElementById("continueBtn").disabled = false;
    }
  });
  