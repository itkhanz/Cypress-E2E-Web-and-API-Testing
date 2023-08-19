import Home from "../pages/HomePage";

class Login {

    usernameField = "input[name='username']";
    pwdField = "input[name='password']";
    submitBtn = "button[type='submit']";

    setUserName(username) {
        cy.get(this.usernameField).type(username);
        return this;
    }

    setPassword(pwd) {
        cy.get(this.pwdField).type(pwd);
        return this;
    }

    clickSubmit() {
        cy.get(this.submitBtn).click();
        return new Home();
    }
}

export default Login;