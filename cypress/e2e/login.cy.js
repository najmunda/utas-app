describe('Login spec', () => {
  it('should display login page correctly', () => {
    cy.visit('http://localhost:5173');

    cy.get('input[name="email"]').should('be.visible');
    cy.get('input[name="password"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');
    cy.get(`a[href="/register"]`).should('be.visible');
  });

  it('should display alert when login button pressed and email is empty', () => {
    cy.visit('http://localhost:5173');
    cy.get('button[type="submit"]').click();

    cy.on('window:alert', (str) => {
      console.log(str);
      expect(str).to.equal('"email" is not allowed to be empty');
    });
  });

  it('should display alert when login button pressed and password is empty', () => {
    cy.visit('http://localhost:5173');
    cy.get('input[name="email"]').type('test@user.com');
    cy.get('button[type="submit"]').click();

    cy.on('window:alert', (str) => {
      console.log(str);
      expect(str).to.equal('"password" is not allowed to be empty');
    });
  });

  it('should display alert when login button pressed and email/password is wrong', () => {
    cy.visit('http://localhost:5173');

    cy.get('input[name="email"]').type('wrong@user.com');
    cy.get('input[name="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();

    cy.on('window:alert', (str) => {
      console.log(str);
      expect(str).to.equal('email or password is wrong');
    });
  });

  it('should redirect and show homepage when login success', () => {
    cy.visit('http://localhost:5173');

    cy.get('input[name="email"]').type('najmunda@tes.com');
    cy.get('input[name="password"]').type('tes12345');
    cy.get('button[type="submit"]').click();

    cy.get('nav').should('be.visible');
    cy.get('form[name="new-thread-form"]').should('be.visible');
  });
})