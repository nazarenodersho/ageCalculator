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
        return;
    }

    // Validate month range
    if (month < 1 || month > 12) {
        error();
        document.getElementById('monthError').textContent = 'Must be a valid month';
        return;
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

    calculateAge();
});

// Errors style function
function error() {
    const h2Element = document.querySelectorAll('.h2Error');
    h2Element.forEach(function(h2) {
        h2.style.color = '#ff5757';
    });

    const inputElement = document.querySelectorAll('.inputError');
    inputElement.forEach(function(input) {
        input.style.border = '#ff5757 solid 1.5px';
    });
    
    const pElement = document.querySelectorAll('.pError');
    pElement.forEach(function(p) {
        p.style.display = 'block';
        p.style.color = '#ff5757';
        p.style.fontWeight = '400';
        p.style.fontStyle = 'italic';
        p.style.fontSize = '0.5rem';
        p.style.marginTop = '5px';
    });
};

/*
document.getElementById("submitButton").addEventListener("click", function() {
    // Obtener los valores de los campos de fecha
    const day = parseInt(document.getElementById("day").value);
    const month = parseInt(document.getElementById("month").value);
    const year = parseInt(document.getElementById("year").value);

    // Validar si algún campo está vacío
    if (!day || !month || !year) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    // Validar el rango del día (1-31)
    if (day < 1 || day > 31) {
        alert("El número del día debe estar entre 1 y 31.");
        return;
    }

    // Validar el rango del mes (1-12)
    if (month < 1 || month > 12) {
        alert("El número del mes debe estar entre 1 y 12.");
        return;
    }

    // Obtener la fecha actual
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1; // Enero es el mes 0

    // Validar si la fecha es en el futuro
    if (year > currentYear || (year === currentYear && month > currentMonth) || (year === currentYear && month === currentMonth && day > today.getDate())) {
        alert("La fecha de nacimiento no puede estar en el futuro.");
        return;
    }

    // Validar la fecha inválida (por ejemplo, 31/04/1991)
    if (day > daysInMonth(month, year)) {
        alert("La fecha es inválida. El mes especificado no tiene suficientes días.");
        return;
    }

    // Si no hay errores, puedes continuar con el cálculo de la edad y la presentación de los resultados
    calculateAge();
});

function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

*/