const listIcon = document.getElementById("navBars");
const closeIcon = document.getElementById("closeList");
const list = document.getElementById("navLinks");
listIcon.addEventListener('click', () => {
    list.classList.toggle('open');
})

closeIcon.addEventListener('click', () => {
    list.classList.toggle('open');
})


let submit = document.getElementById('submitbutton');
submit.addEventListener('click', () => {
    let inputFields = document.getElementsByClassName('forminput');

    Array.from(inputFields).forEach(inputField => {
    let inputValue = inputField.value.trim(); 
    if(inputValue === "") {
        inputField.classList.add("shake");
        setTimeout(() => {
            inputField.classList.remove("shake");
        }, 500);
        }
    });
});

const form = document.getElementById('form');
const result = document.getElementById('result');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status == 200) {
                result.innerHTML = "Form submitted successfully!";
            } else {
                console.log(response);
                result.innerHTML = json.message;
            }
        })
        .catch(error => {
            console.log(error);
            result.innerHTML = "Something went wrong!";
        })
        .then(function() {
            form.reset();
            setTimeout(() => {
                result.style.display = "none";
            }, 1000);
        });
});

if(window.location.pathname.endsWith(".html")){
    let newPath = window.location.pathname.replace(/\.html$/, "");

    if(newPath !== window.location.pathname){
    window.history.replaceState(null, "", newPath)
    }
}

    

