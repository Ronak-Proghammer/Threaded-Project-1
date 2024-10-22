/**
 * customer registartion form data for error check 
 */
document.getElementById('customer-form').addEventListener('submit', async function (event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('/api/addcustomer', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
            const messageDiv = document.getElementById('success-messages');
            messageDiv.innerHTML = `<div class="alert alert-success">${result.message}</div>`;
            setTimeout(() => {
                window.location.href = '/packages.html';
            }, 2000);
        } else {
            const messageDiv = document.getElementById('error-messages');
            messageDiv.innerHTML = '';

            result.errors.forEach(error => {
                const errorElement = document.createElement('div');
                errorElement.textContent = `${error.msg}`;
                messageDiv.appendChild(errorElement);
            });
        }
    } catch (error) {
        console.error('Error submitting the registration:', error);
        const messageDiv = document.getElementById('error-messages');
        messageDiv.innerHTML = `<div class="alert alert-danger">Error submitting registration</div>`;
    }
});
