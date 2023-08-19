class Home {

    dashboardTitle = "h6.oxd-text";

    verifyDashboard(expectedText) {
        cy.get(this.dashboardTitle).should('have.text', expectedText)
    }
    
}

export default Home;