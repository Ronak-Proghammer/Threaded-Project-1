const params = new URLSearchParams(window.location.search);
const source = params.get('source');
if (source === 'registration') {
    document.getElementById('message').innerText = 'Thank you for registering!';
} else if (source.includes('booking')) {
    let bookingid = source.split('-')[1];
    document.getElementById('message').innerText = `Thank you for your booking. Your Booking ID is ${bookingid}!`;
} else {
    document.getElementById('message').innerText = 'Thank you!';
}

window.addEventListener('load', function() {
    const messageDiv = document.getElementById('message');
    messageDiv.classList.add('show');
});