const checkboxes = document.querySelectorAll('input[name="filterSelection"]');
const teaCheckBox = document.getElementById('typeCheckTea');
const teaFormatBoxes = document.querySelectorAll("#formatCheckLoose, #formatCheckPowder, #formatCheckTeaBag");
// Function to clear all checked boxes
function clearAllSelections() {
    checkboxes.forEach(box => {
        box.checked = false;
    })
    teaFormatBoxes.forEach(checkBox => {
        checkBox.disabled = true;
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

// Event listener on "Tea" checkbox
teaCheckBox.addEventListener('change', () => {
    teaFormatBoxes.forEach(checkBox => {
        if (!teaCheckBox.checked) {
            checkBox.checked = false;
            checkBox.disabled = true;
        }
        else {
            checkBox.disabled = false;
        }
    })
})
