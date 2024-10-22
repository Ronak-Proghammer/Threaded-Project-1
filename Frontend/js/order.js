document.getElementById('booking-form').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Grab form data
    const bookingDate = document.getElementById('bookingDate').value;
    const travelerCount = document.getElementById('travelerCount').value;
    const tripTypeId = document.getElementById('tripTypeId').value;
    const packageId = localStorage.getItem('packageId');
    const bookingNo = generateRandomBookingId();
    const customerId = 123;

    // Create the data object
    const data = {
        bookingNo,
        customerId,
        bookingDate,
        travelerCount,
        tripTypeId,
        packageId
    };

    try {
        // Send the POST request using fetch
        const response = await fetch('/api/bookings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        // Handle the response
        const result = await response.json();
        if (response.ok) {
            // If booking was successful, show a message
            const messageDiv = document.getElementById('booking-message');
            messageDiv.innerHTML = `<div class="alert alert-success">${result.message}</div>`;

            // Redirect to another page after 3 seconds
            setTimeout(() => {
                window.location.href = '/'; // Change this to your desired route
            }, 3000);
        } else {
            // Show error message if there's an issue
            const messageDiv = document.getElementById('booking-message');
            messageDiv.innerHTML = `<div class="alert alert-danger">Error: ${result.message}</div>`;
        }
    } catch (error) {
        console.error('Error submitting the booking:', error);
        document.getElementById('booking-message').innerHTML = `<div class="alert alert-danger">Error submitting booking</div>`;
    }
});

function generateRandomBookingId() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; // Possible letters
    const randomLetter = letters.charAt(Math.floor(Math.random() * letters.length)); // Random letter
    const randomDigits = Math.floor(100000 + Math.random() * 900000); // Random 6-digit number
    return randomLetter + randomDigits; // Combine letter and digits
}
