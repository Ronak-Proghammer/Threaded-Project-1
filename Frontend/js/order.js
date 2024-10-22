document.addEventListener("DOMContentLoaded", () =>
{
    fetch("/api/packages").then((response) => response.json()).then((data) =>
    {
        const packageContainer = document.getElementById('package-container');
        data.forEach(pkg =>
        {
            const card = 
            `
                <div class="col-md-4 mb-4">
                    <div class="card">
                        <h1>TEST</h1>
                    </div>
                </div>
            `;

            packageContainer.innerHTML += card;
        });
    });
});