// Variables

const inputs = document.querySelectorAll("input, select, textarea");
const form = document.querySelector("form");

console.log(inputs);

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = formData();
    console.log(user);
})

function formData () {
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

    return user;
};