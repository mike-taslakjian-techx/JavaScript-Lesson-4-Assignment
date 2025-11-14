// Variables

const form = document.querySelector("form");
const submitBtn = document.getElementById("submitBtn");
const modal = document.querySelector(".modal");
const select = document.querySelector("select");

// Event Listeners

select.addEventListener("input", () => {
    if (select.value === "other") {
        document.querySelector(".other").style.display = "block";
        document.querySelector(".other").required = true;
    } else {
        document.querySelector(".other").style.display = "none";
        document.querySelector(".other").required = false;
    }
});

submitBtn.addEventListener("click", (e) => {
    e.preventDefault();

    let formIsValid = true;

    form.querySelectorAll("fieldset").forEach(fieldset => {
        const inputs = fieldset.querySelectorAll("input, select, textarea");
        const errorMessage = fieldset.querySelector(".error-message");
        
        let fieldsetIsValid = true;

        inputs.forEach(input => {
            if (!input.checkValidity()) {
                fieldsetIsValid = false;
                formIsValid = false;
            }
        });

        if (!fieldsetIsValid) {
            fieldset.classList.add("invalid");
            if (errorMessage) errorMessage.style.display = "block";
        } else {
            fieldset.classList.remove("invalid");
            if (errorMessage) errorMessage.style.display = "none";
        } 
    });

    if (formIsValid) {
        const user = createUser();
        modal.style.display = "flex";
        console.log(user);
        reset();
    } else {
        const firstInvalid = form.querySelector('input:invalid');
        firstInvalid.scrollIntoView({behavior: 'smooth', block: 'center'});
    }  
});

window.addEventListener("click", (e) => {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

// Helper functions

function createUser () {
    const inputs = Array.from(document.querySelectorAll("input, select, textarea")).filter(i => !i.closest('table'));
    const user = {};

    inputs.forEach(input => {
        if (input.type === "checkbox") {
            if (input.checked) {
                user[input.name] = input.value;
            }
        } else {
            user[input.name] = input.value;
        }
    });

    user.referral = createReferral();

    return user;
};

function createReferral () {
    const tableRows = document.querySelectorAll("tbody tr");
    const referrals = [];

    tableRows.forEach(row => {
        const obj = {};
        const inputs = row.querySelectorAll("input");

        inputs.forEach(input => obj[input.name] = input.value);
        referrals.push(obj);
    });

    return referrals;
};

function reset () {
    const inputs = document.querySelectorAll("input, select, textarea");

    inputs.forEach((input) => 
        input.type === "checkbox" ? input.checked = false : input.value = "");
};