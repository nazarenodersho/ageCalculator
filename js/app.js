console.log('Online');

function calculateAge () {
    const birthDay = parseInt(document.getElementById('day').value);
    const birthMonth = parseInt(document.getElementById('month').value);
    const birthYear = parseInt(document.getElementById('year').value);

    // Forcing NaN to not appear in the results boxes
    if (!birthDay || !birthMonth || !birthYear || isNaN(birthDay) || isNaN(birthMonth) || isNaN(birthYear)) {
        document.querySelectorAll('.data').textContent = '--';
        return; 
    }

    // Get the current date
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();

    // Calculate
    let years = currentYear - birthYear;
    let months = currentMonth - birthMonth;
    let days = today.getDate() - birthDay;

    // Avoiding negative values
    if (days < 0) {
        months--;
        days += daysInMonth(currentMonth - 1, currentYear);
    }
    if(months < 0) {
        years--;
        months += 12;
    }

    // Putting the results in the html
    document.getElementById('years').textContent = years;
    document.getElementById('months').textContent = months;
    document.getElementById('days').textContent = days;

    // Getting the number of days in a specific month of a given year
    function daysInMonth(month, year) {
        return new Date(year, month, 0).getDate();
    }
}

// Function of the arrow button
document.getElementById('button').addEventListener('click', function () {
    const day = parseInt(document.getElementById('day').value);
    const month = parseInt(document.getElementById('month').value);
    const year = parseInt(document.getElementById('year').value);

    // Validate if the inputs are empty
    if (!day || !month || !year) {
        error();
        let pText = document.querySelectorAll('.pError');
        pText.forEach(function(p) {
            p.textContent = 'This field is required';
        });
        return;
    }

    // Validate day range
    if (day < 1 || day > 31) {
        error();
        document.getElementById('dayError').textContent = 'Must be a valid date';
    }

    // Validate month range
    if (month < 1 || month > 12) {
        error();
        document.getElementById('monthError').textContent = 'Must be a valid month';
    }

    // Get the current date again
    const todayTwo = new Date();
    const currentYearTwo = todayTwo.getFullYear();
    const currentMonthTwo = todayTwo.getMonth() + 1;

    // Validate if the date is in the future
    if (year > currentYearTwo || (year === currentYearTwo && month > currentMonthTwo) || (year === currentYearTwo && month === currentMonthTwo && day > todayTwo.getDate())) {
        error();
        document.getElementById('yearError').textContent = 'Must be in the past';
        return;
    }

    //Reset errors before calculating if the user tries again with correct data
    error(showError = false);

    calculateAge();
});

// Errors style function
function error(showError = true) {

    const h2Element = document.querySelectorAll('.h2Error');
    h2Element.forEach(function(h2) {
        h2.style.color = showError ? '#ff5757': '';
    });

    const inputElement = document.querySelectorAll('.inputError');
    inputElement.forEach(function(input) {
        input.style.border = showError ? '#ff5757 solid 1.5px': '';
    });
    
    const pElement = document.querySelectorAll('.pError');
    pElement.forEach(function(p) {
        p.style.display = showError ? 'block' : 'none';
        p.style.color = showError ? '#ff5757' : '';
        p.style.fontWeight = showError ? '400' : '';
        p.style.fontStyle = showError ? 'italic' : '';
        p.style.fontSize = showError ? '0.5rem' : '';
        p.style.marginTop = showError ? '5px': '';
    });
};