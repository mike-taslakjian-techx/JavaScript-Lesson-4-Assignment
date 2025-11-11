// Variables

const inputs = document.querySelectorAll("input:not(table input), select, textarea");
const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = createUser();
    console.log(user);
})

function createUser () {
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
}