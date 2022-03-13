const registrationForm = document.getElementById('registrationForm')
const errorContainer = document.getElementById('error-container')


registrationForm.addEventListener('submit', async e => {
    e.preventDefault()
    const username = e.target['username'].value
    const email = e.target['email'].value
    const password = e.target['password'].value

    if (password.length < 8) {
        errorContainer.querySelector('p').textContent = "password should be of atleast 8 characters"
        return;
    }

    const formData = { username, email, password }

    const res = await fetch('/auth/register', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })

    const data = await res.json()

    if (res.ok) {
        window.location.href = "/";
    }

    errorContainer.querySelector('p').textContent = data.msg
})