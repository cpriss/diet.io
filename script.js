document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('progress-form');
    const output = document.getElementById('progress-output');

    const isLocalStorageSupported = (() => {
        try {
            const test = "__test__";
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (e) {
            return false;
        }
    })();

    if (!isLocalStorageSupported) {
        output.textContent = `Local storage is not supported. Your progress won't be saved.`;
        return;
    }

    const storedWeights = JSON.parse(localStorage.getItem('weights')) || [];
    let initialWeight = storedWeights[0] || null;

    const updateOutput = (latestWeight) => {
        const weightDifference = latestWeight - initialWeight;
        output.textContent = `Your current weight is ${latestWeight} lbs. ${
            weightDifference >= 0
                ? `Total Gained: ${weightDifference.toFixed(1)} lbs.`
                : `Total Lost: ${Math.abs(weightDifference).toFixed(1)} lbs.`
        }`;
    };

    if (storedWeights.length) {
        updateOutput(storedWeights[storedWeights.length - 1]);
    } else {
        output.textContent = `No weight data logged yet. Start by entering your weight!`;
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const weightInput = document.getElementById('current-weight');
        const currentWeight = parseFloat(weightInput.value);

        if (isNaN(currentWeight) || currentWeight <= 0) {
            output.textContent = `Please enter a valid positive number for your weight.`;
            weightInput.focus();
            return;
        }

        if (!initialWeight) {
            initialWeight = currentWeight;
        }

        storedWeights.push(currentWeight);
        localStorage.setItem('weights', JSON.stringify(storedWeights));
        updateOutput(currentWeight);
        weightInput.value = '';
    });
});
