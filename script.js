document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('progress-form');
    const output = document.getElementById('progress-output');

    // Initialize stored weights from local storage or set to an empty array
    const storedWeights = JSON.parse(localStorage.getItem('weights')) || [];
    let initialWeight = storedWeights[0] || null;

    // Display the last logged weight and total weight lost/gained (if data exists)
    if (storedWeights.length) {
        const latestWeight = storedWeights[storedWeights.length - 1];
        const weightDifference = latestWeight - initialWeight;
        output.textContent = `Your last logged weight is ${latestWeight} lbs. ${weightDifference >= 0 ?
            `Total gained: ${weightDifference.toFixed(1)} lbs.` :
            `Total lost: ${Math.abs(weightDifference).toFixed(1)} lbs.`}`;
    } else {
        output.textContent = `No weight data logged yet. Start by entering your weight!`;
    }

    // Handle form submission to log weight
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const weightInput = document.getElementById('current-weight');
        const currentWeight = parseFloat(weightInput.value);

        if (isNaN(currentWeight)) {
            output.textContent = `Please enter a valid number for your weight.`;
            return;
        }

        if (!initialWeight) {
            initialWeight = currentWeight; // Set initial weight on first entry
        }

        storedWeights.push(currentWeight); // Add the new weight to the list
        localStorage.setItem('weights', JSON.stringify(storedWeights)); // Save updated list to local storage

        const weightDifference = currentWeight - initialWeight;
        output.textContent = `Your current weight is ${currentWeight} lbs. ${weightDifference >= 0 ?
            `Total Gained: ${weightDifference.toFixed(1)} lbs.` :
            `Total Lost: ${Math.abs(weightDifference).toFixed(1)} lbs.`}`;

        weightInput.value = ''; // Clear the input field after logging
    });
});
