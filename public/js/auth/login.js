const loginForm = document.getElementById('loginForm')
const submitBtn = document.getElementById('submitBtn')

loginForm.addEventListener('submit', async e => {
    e.preventDefault()

    const email = e.target['email'].value
    const password = e.target['password'].value

    const formData = { email, password }

    const res = await fetch('/auth/login', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })

    const data = await res.json()

    if (res.ok)
        window.location.href = "/";

    showToast(data.msg)
})


// submit btn animation handler

submitBtn.addEventListener("mouseenter", e => {
    e.target.classList.remove("submit-mouse-out")
    e.target.classList.add("submit-mouse-in")
})

submitBtn.addEventListener("mouseleave", e => {
    e.target.classList.remove("submit-mouse-in")
    e.target.classList.add("submit-mouse-out")
})


function showToast(message) {
    Toastify({
        text: message,
        className: "toast",
        duration: 5000,
        gravity: "bottom",
        position: "center",
        stopOnFocus: true,
    }).showToast();
}