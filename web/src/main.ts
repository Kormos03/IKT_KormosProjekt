document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('sendButton')!.addEventListener('click', () => {
        const email = ((document.getElementById('emailInput')!) as HTMLInputElement).value;
        const password = ((document.getElementById('passwordInput')!) as HTMLInputElement).value;
        console.log("email, password")
        document.getElementById('error')!.textContent = email;
    })
})
