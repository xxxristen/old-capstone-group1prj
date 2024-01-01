// First set of variables for filter checkboxes in larger view (non-mobile view)
const checkboxes = document.querySelectorAll('input[name="filterSelection"]');
const teaCheckBox = document.getElementById('typeCheckTea');
const teaWareCheckBox = document.getElementById('typeCheckTeaware');
const accessoryCheckBox = document.getElementById('typeCheckAccessory');
const teaFormatBoxes = document.querySelectorAll("#formatCheckLoose, #formatCheckPowder, #formatCheckTeaBag");

// Second set of variables for filter checkboxes in mobile view
const checkboxes2 = document.querySelectorAll('input[name="filterSelection2"]');
const teaCheckBox2 = document.getElementById('typeCheckTea2');
const teaWareCheckBox2 = document.getElementById('typeCheckTeaware2');
const accessoryCheckBox2 = document.getElementById('typeCheckAccessory2');
const teaFormatBoxes2 = document.querySelectorAll("#formatCheckLoose2, #formatCheckPowder2, #formatCheckTeaBag2");

// Function to clear all checked boxes
function clearAllSelections() {
    checkboxes.forEach(box => {
        box.checked = false;
    })
    teaFormatBoxes.forEach(checkBox => {
        checkBox.disabled = true;
    })
    checkboxes2.forEach(box => {
        box.checked = false;
    })
    teaFormatBoxes2.forEach(checkBox => {
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
//checkboxes.forEach(box => {
//    box.addEventListener('change', () => {
//        getAllSelections();
//    });
//});


// The checkboxes of one filter will update the other (for mobile and non-mobile view)
checkboxes.forEach((checkbox, index) => {
  checkbox.addEventListener('change', (event) => {
    // Update the corresponding checkbox in the second set
    checkboxes2[index].checked = event.target.checked;
    getAllSelections();
  });
});

checkboxes2.forEach((checkbox, index) => {
  checkbox.addEventListener('change', (event) => {
    // Update the corresponding checkbox in the first set
    checkboxes[index].checked = event.target.checked;
    getAllSelections();
  });
});

// Event listener on "Tea" checkbox
// To enable the Tea Format selection only if product type Tea is checked
function handleTeaCheckBoxChange(){
    teaFormatBoxes.forEach(checkBox => {
            if (!teaCheckBox.checked) {
                checkBox.checked = false;
                checkBox.disabled = true;
            }
            else {
                checkBox.disabled = false;
            }
        })
    teaFormatBoxes2.forEach(checkBox => {
        if (!teaCheckBox2.checked) {
            checkBox.checked = false;
            checkBox.disabled = true;
        }
        else {
            checkBox.disabled = false;
        }
    })
}

teaCheckBox.addEventListener('change', handleTeaCheckBoxChange);
teaCheckBox2.addEventListener('change', handleTeaCheckBoxChange);

// To update the filter checkboxes based on the fetch api
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
            teaCheckBox2.checked = true;
            teaFormatBoxes2.forEach(checkBox => {
                checkBox.disabled = false
            });
            break;
        case "Teaware":
            clearAllSelections();
            teaWareCheckBox.checked = true;
            teaWareCheckBox2.checked = true;
            break;
        case "Accessory":
            clearAllSelections();
            accessoryCheckBox.checked = true;
            accessoryCheckBox2.checked = true;
            break;
        default:
            clearAllSelections();
            break;
    }
});