document.addEventListener('DOMContentLoaded', function() {
  const visitDateInput = document.getElementById('visitDate');
  const timeSlotsCheckboxes = document.querySelectorAll('input[name="timeSlot"]');
  const summaryTable = document.getElementById('summaryTable');
  const continueBtn = document.getElementById('continueBtn');

// Update summary table with selected date and time
function updateSummary() {
  const selectedDate = visitDateInput.value;
  const selectedTimeSlots = Array.from(timeSlotsCheckboxes)
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.value);

  let timeFormat = "";

  if (selectedTimeSlots.length === 1) {
    const [start, end, type] = selectedTimeSlots[0].split(' - '); // Assuming the format is like 'start - end - type'
    const startHour = parseInt(start.split(':')[0]);
    const endHour = parseInt(end.split(':')[0]);
    const startMinutes = start.split(':')[1];
    const endMinutes = end.split(':')[1];
    const startAmPm = startHour >= 12 ? 'pm' : 'am';
    const endAmPm = endHour >= 12 ? 'pm' : 'am';


    timeFormat = `${(startHour % 12) || 12}.${startMinutes} ${startAmPm} - ${(endHour % 12) || 12}.${endMinutes} ${endAmPm} (${type})`;
  } else if (selectedTimeSlots.length > 1) {
    const startTime = selectedTimeSlots[0].split(' - ')[0];
    const endTime = selectedTimeSlots[selectedTimeSlots.length - 1].split(' - ')[1];
    timeFormat = `${startTime} - ${endTime} `;
  } else {
    timeFormat = 'No time slots selected';
  }

  
  // Calculate total duration in hours
  const totalDuration = selectedTimeSlots.reduce((total, slot) => {
    const [start, end] = slot.split(' - ');
    const startHour = parseInt(start.split(':')[0]);
    const endHour = parseInt(end.split(':')[0]);
    return total + (endHour - startHour);
  }, 0);

  document.getElementById('visitDateSummary').textContent = selectedDate;
  document.getElementById('timeSlotSummary').textContent = timeFormat;
  document.getElementById('durationSummary').textContent = `${totalDuration} hours(Norml:Peak)`;
}
 
  // Calculate charges and update summary table
  function calculateCharges() {
    const slAdultCount = parseInt(document.getElementById('slAdult').value);
    const slChildCount = parseInt(document.getElementById('slChild').value);
    const foreignerAdultCount = parseInt(document.getElementById('foreignerAdult').value);
    const foreignerChildCount = parseInt(document.getElementById('foreignerChild').value);
    const infantsCount = parseInt(document.getElementById('infants').value);

    const slAdultCharge = slAdultCount * 4;
    const slChildCharge = slChildCount * 2;
    const foreignerAdultCharge = foreignerAdultCount * 10;
    const foreignerChildCharge = foreignerChildCount * 5;

    const totalPayable = slAdultCharge + slChildCharge + foreignerAdultCharge + foreignerChildCharge;

    document.getElementById('slAdultCount').textContent = slAdultCount;
    document.getElementById('slChildCount').textContent = slChildCount;
    document.getElementById('foreignerAdultCount').textContent = foreignerAdultCount;
    document.getElementById('foreignerChildCount').textContent = foreignerChildCount;
    document.getElementById('infantsCount').textContent = infantsCount;

    document.getElementById('slAdultSummary').textContent = `$${slAdultCharge}`;
    document.getElementById('slChildSummary').textContent = `$${slChildCharge}`;
    document.getElementById('foreignerAdultSummary').textContent = `$${foreignerAdultCharge}`;
    document.getElementById('foreignerChildSummary').textContent = `$${foreignerChildCharge}`;
    document.getElementById('infantsSummary').textContent = '$0'; // Infants are free

    document.getElementById('totalPayableSummary').textContent = `$${totalPayable}`;
  }

  // Event listener for date selection
  visitDateInput.addEventListener('change', function() {
    updateSummary();
  });

  // Event listener for time slot selection
  timeSlotsCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      updateSummary();
    });
  });

  // Event listener for ticket quantity changes
  const ticketInputs = document.querySelectorAll('input[type="number"]');
  ticketInputs.forEach(input => {
    input.addEventListener('change', function() {
      calculateCharges();
    });
  });

  // Event listener to enable/disable continue button based on selection
  document.getElementById('Buy-tickets').addEventListener('change', function() {
    const summaryData = {
      date: visitDateInput.value,
      timeSlots: Array.from(timeSlotsCheckboxes).filter(checkbox => checkbox.checked).map(checkbox => checkbox.value),
      slAdult: parseInt(document.getElementById('slAdult').value),
      slChild: parseInt(document.getElementById('slChild').value),
      foreignerAdult: parseInt(document.getElementById('foreignerAdult').value),
      foreignerChild: parseInt(document.getElementById('foreignerChild').value),
      infants: parseInt(document.getElementById('infants').value)
    };

    localStorage.setItem('summaryData', JSON.stringify(summaryData));

    const totalPayable = parseInt(document.getElementById('totalPayableSummary').textContent.slice(1)); // Extracting the number from the string
    if (totalPayable > 0) {
      continueBtn.disabled = false;
    } else {
      continueBtn.disabled = true;
    }
  });

  // Check if there's already stored data in local storage and update the summary table accordingly
  const storedSummaryData = JSON.parse(localStorage.getItem('summaryData'));
  if (storedSummaryData) {
    visitDateInput.value = storedSummaryData.date;
    timeSlotsCheckboxes.forEach(checkbox => {
      checkbox.checked = storedSummaryData.timeSlots.includes(checkbox.value);
    });
    document.getElementById('slAdult').value = storedSummaryData.slAdult;
    document.getElementById('slChild').value = storedSummaryData.slChild;
    document.getElementById('foreignerAdult').value = storedSummaryData.foreignerAdult;
    document.getElementById('foreignerChild').value = storedSummaryData.foreignerChild;
    document.getElementById('infants').value = storedSummaryData.infants;

    updateSummary();
    calculateCharges();
  }
});
// Event listener for the "Continue with Purchase" button
  const continueBtn = document.getElementById("continueBtn");
  continueBtn.addEventListener("click", function () {
    // Get selected data
    const visitDate = visitDateInput.value;
    const slAdultCount = parseInt(slAdultInput.value);
    const slChildCount = parseInt(slChildInput.value);
    // ... (other data)

    // Store data in local storage
    localStorage.setItem("visitDate", visitDate);
    localStorage.setItem("slAdultCount", slAdultCount);
    localStorage.setItem("slChildCount", slChildCount);
    // ... (store other data)

    // Enable the "Continue with Purchase" button
    continueBtn.disabled = false;
  });














