document.addEventListener("DOMContentLoaded", () => {
    fetch("/api/packages")
        .then((response) => response.json())
        .then((data) => {
            const packageContainer = document.getElementById('package-container');
            data.forEach(pkg => {
                // Creating a Bootstrap card for each package with an Order button
                const card = `
                <div class="col-md-4 mb-4">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${pkg.PkgName}</h5>
                            <p class="card-text">${pkg.PkgDesc}</p>
                            <p class="card-text"><strong>Start Date:</strong> ${new Date(pkg.PkgStartDate).toLocaleDateString()}</p>
                            <p class="card-text"><strong>End Date:</strong> ${new Date(pkg.PkgEndDate).toLocaleDateString()}</p>
                            <p class="card-text"><strong>Price:</strong> $${parseFloat(pkg.PkgBasePrice).toFixed(2)}</p>
                            <p class="card-text"><strong>Agency Commission:</strong> $${parseFloat(pkg.PkgAgencyCommission).toFixed(2)}</p>
                            <button class="btn btn-primary order-btn" data-package-id="${pkg.PackageId}">Order</button>
                        </div>
                    </div>
                </div>`;
                
                packageContainer.innerHTML += card;
            });

            // Event listener for the "Order" button (this is where you can handle the order process)
            document.querySelectorAll('.order-btn').forEach(button => {
                button.addEventListener('click', function() {
                    const packageId = this.getAttribute('data-package-id');
                    window.open(`localhost:3000/order/${packageId}`,'self')
                    
                    // alert(`Order placed for package ID: ${packageId}`);
                });
            });
        });
});