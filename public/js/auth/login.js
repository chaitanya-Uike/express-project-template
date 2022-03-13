const loginForm = document.getElementById('loginForm')
const errorContainer = document.getElementById('error-container')

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

    errorContainer.querySelector('p').textContent = data.msg
})