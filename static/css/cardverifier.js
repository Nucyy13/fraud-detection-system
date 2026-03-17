function luhnAlgorithm(number) {
  var sum = 0;
  var isSecondDigit = false;

  for (var i = number.length - 1; i >= 0; i--) {
    var digit = parseInt(number.charAt(i), 10);

    if (isSecondDigit) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isSecondDigit = !isSecondDigit;
  }

  return (sum % 10) === 0;
}

function performAPICreditCardValidation(creditCardNumber) {
  setTimeout(function () {
    var isFraudulent = Math.random() < 0.1;

    if (isFraudulent) {
      document.getElementById('validationResult').innerText = 'This credit card number is flagged as potentially fraudulent. Please contact your bank for assistance.';
      document.getElementById('validationResult').className = 'error';
    } else {
      document.getElementById('validationResult').innerText = 'Credit card number is valid and not fraudulent.';
      document.getElementById('validationResult').className = 'success';
    }

    document.getElementById('validationResult').style.display = 'block';
  }, 1000);
}

function validateCreditCard() {
  var creditCardNumber = document.getElementById('creditCardNumber').value;
  var validationResult = document.getElementById('validationResult');

  var cleanedNumber = creditCardNumber.replace(/\s/g, '');
  var formattedNumber = cleanedNumber.replace(/(.{4})/g, '$1 ');

  document.getElementById('creditCardNumber').value = formattedNumber.trim();

  if (/^\d{16}$/.test(cleanedNumber)) {
    if (luhnAlgorithm(cleanedNumber)) {
      performAPICreditCardValidation(cleanedNumber);
    } else {
      validationResult.innerText = 'Invalid credit card number! Please enter a valid 16-digit number.';
      validationResult.style.display = 'block';
      validationResult.className = 'error';
    }
  } else {
    validationResult.innerText = 'Invalid credit card number format! Please enter a valid 16-digit number.';
    validationResult.style.display = 'block';
    validationResult.className = 'error';
  }
}
