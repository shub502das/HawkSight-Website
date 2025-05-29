function dataSubmit() {
    const fName = document.getElementById('fName').value.trim();
    const lName = document.getElementById('lName').value.trim();
    const email = document.getElementById('emailAddress').value.trim();
    const phone = document.getElementById('phNumber').value.trim();
    const address = document.getElementById('yAddress').value.trim();
    const country = document.getElementById('sCountry').value;
    const city = document.getElementById('city').value.trim();
    const state = document.getElementById('sState').value;
    const zip = document.getElementById('zip').value.trim();

    const cardNumber = document.getElementById('ccNumber').value.trim();
    const month = document.getElementById('sMonth').value;
    const year = document.getElementById('sYear').value;
    const cvv = document.getElementById('cvv').value.trim();

    // Common Field Expressions
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;
    const zipRegex = /^\d{5,6}$/;
    const cardRegex = /^\d{16}$/;
    const cvvRegex = /^\d{3,4}$/;

    // Fields Validation
    if (!fName || !lName || !email || !phone || !address || !country || !city || !state || !zip ||
        !cardNumber || !month || !year || !cvv) {
        alert("Please fill in all fields.");
        return false;
    }

    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return false;
    }

    if (!phoneRegex.test(phone)) {
        alert("Please enter a valid 10-digit phone number.");
        return false;
    }

    if (!zipRegex.test(zip)) {
        alert("Please enter a valid ZIP code.");
        return false;
    }

    if (!cardRegex.test(cardNumber)) {
        alert("Please enter a valid 16-digit card number.");
        return false;
    }

    if (!cvvRegex.test(cvv)) {
        alert("Please enter a valid CVV.");
        return false;
    }

    // Storing the Data in LocalStorage
    const userData = {
        firstName: fName,
        lastName: lName,
        email: email,
        phone: phone,
        address: address,
        country: country,
        city: city,
        state: state,
        zip: zip,
        cardNumber: cardNumber,
        cardExpiryMonth: month,
        cardExpiryYear: year,
        cvv: cvv
    };

    localStorage.setItem('userData', JSON.stringify(userData));
    return true;
}

// Max Characters in Some Input Fields
function maxInputCharacters(id, maxLength) {
    const inputElement = document.getElementById(id);
    if (inputElement) {
        inputElement.addEventListener('input', function () {
            this.value = this.value.replace(/\D/g, '').slice(0, maxLength);
        });
    }
}

maxInputCharacters('phNumber', 10);
maxInputCharacters('zip', 6);
maxInputCharacters('ccNumber', 16);
maxInputCharacters('cvv', 3);
