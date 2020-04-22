class Register extends Component {
    constructor(onSubmit, onLogin) {
        super(`<section class="register">
        <h1>Register</h1>
        <form>
            <input type="text" name="name" placeholder="name">
            <input type="text" name="surname" placeholder="surname">
            <input type="email" name="email" placeholder="e-mail">
            <input type="password" name="password" placeholder="password">
            <button>Submit</button>
        </form>
        <a href="">Login</a>
    </section>`)

        const form = this.container.querySelector('form')

        const login = this.container.querySelector('a')

        let feedback

        const self = this

        form.addEventListener('submit', function (event) {
            event.preventDefault()

            const name = event.target.name.value,
                surname = event.target.surname.value,
                email = event.target.email.value,
                password = event.target.password.value

                try {
                    onSubmit(name, surname, email, password)

                    cleanUp()

                } catch(error) {
                    if (!feedback) {
                        feedback = new Feedback(error.message, 'error')
                        debugger
                        self.container.appendChild(feedback.container)

                    }else feedback.innerText = error.message

                }
        })

        function cleanUp() {
            form.name.value = ''
            form.surname.value = ''
            form.email.value = ''
            form.password.value = ''
            
            if (feedback) {
                self.container.removeChild(feedback.container)

                feedback = undefined
            }
        }

        login.addEventListener('click', function(event){
            event.preventDefault()

            onLogin()

            cleanUp()

        })
    }
}