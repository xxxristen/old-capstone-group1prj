const checkboxes = document.querySelectorAll('input[name="filterSelection"]');

// Function to clear all checked boxes
function clearAllSelections() {
    checkboxes.forEach(box => {
        box.checked = false;
    })
}

// Function to get all the checked values
function getAllSelections() {
    const checkedBoxes = [];
    checkboxes.forEach(box => {
        if (box.checked) {
            checkedBoxes.push(box.value);
        }
    });
    return checkedBoxes;
}

// Listen for changes to filter selections
checkboxes.forEach(box => {
    box.addEventListener('change', () => {
        getAllSelections();
    });
});
