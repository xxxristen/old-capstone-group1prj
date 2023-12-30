const checkboxes = document.querySelectorAll('input[name="filterSelection"]');
const teaCheckBox = document.getElementById('typeCheckTea');
const teaWareCheckBox = document.getElementById('typeCheckTeaware');
const accessoryCheckBox = document.getElementById('typeCheckAccessory');
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
document.addEventListener('DOMContentLoaded', function () {
    const url = document.location.search;
    let urlParams = new URLSearchParams(url);
    let type = urlParams.get("type");
    switch (type) {
        case "Tea":
            clearAllSelections();
            teaCheckBox.checked = true;
            teaFormatBoxes.forEach(checkBox => {
                checkBox.disabled = false
            });
            break;
        case "Teaware":
            clearAllSelections();
            teaWareCheckBox.checked = true;
            break;
        case "Accessory":
            clearAllSelections();
            accessoryCheckBox.checked = true;
            break;
        default:
            clearAllSelections();
            break;
    }
});