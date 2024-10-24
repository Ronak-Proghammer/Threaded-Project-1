document.getElementById('booking-form').addEventListener('submit', async function (event) {
    event.preventDefault(); 

    const bookingDate = document.getElementById('bookingDate').value;
    const travelerCount = document.getElementById('travelerCount').value;
    const tripTypeId = document.getElementById('tripTypeId').value;
    const packageId = localStorage.getItem('packageId');
    const bookingNo = generateRandomBookingId();
    const customerId = 123;

    const data = {
        bookingNo,
        customerId,
        bookingDate,
        travelerCount,
        tripTypeId,
        packageId
    };

    try {
        const response = await fetch('/api/bookings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        if (response.ok) {
            const messageDiv = document.getElementById('booking-message');
            messageDiv.innerHTML = `<div class="alert alert-success">${result.message}</div>`;
            let bookingId=result.message.split(':')[1].trim();
            setTimeout(() => {
                window.location.href = `/thank-you?source=booking-${bookingId}`; 
            }, 1000);
        } else {
            const messageDiv = document.getElementById('booking-message');
            messageDiv.innerHTML = `<div class="alert alert-danger">Error: ${result.message}</div>`;
        }
    } catch (error) {
        console.error('Error submitting the booking:', error);
        document.getElementById('booking-message').innerHTML = `<div class="alert alert-danger">Error submitting booking</div>`;
    }
});

function generateRandomBookingId() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'; 
    const randomLetter = letters.charAt(Math.floor(Math.random() * letters.length));
    const randomDigits = Math.floor(100000 + Math.random() * 900000);
    return randomLetter + randomDigits;
}
