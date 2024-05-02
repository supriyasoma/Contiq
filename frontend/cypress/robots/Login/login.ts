/// <reference types="Cypress" />
import { signUpData, testData } from "../../fixtures/commomTestData";
import { BaseDependencies, BaseEyes, BaseHands } from "../BaseRobot";

export class FillLogInDependencies extends BaseDependencies {
  visitLoginPage() {
    cy.visit(testData.urls.loginPage);
  }
}

export class FillLogInFormRobotEyes extends BaseEyes {
  contains: any;
  get: any;

  seesElementWithText(text: string) {
    return this.seesDomVisible(text);
  }
}

export class FillLogInFormRobotHands extends BaseHands {
  logInEmail() {
    const { logIn, placeholders, testIds } = testData;

    cy.get(placeholders.logInEmail)
      .type(logIn.email)
      .then(($input) => {
        expect($input.val()).to.eq(logIn.email);
      });

    cy.get(placeholders.createPassword)
      .type(logIn.password)
      .then(($input) => {
        expect($input.val()).to.eq(logIn.password);
      });

    cy.wait(2000);
    cy.get(testIds.signInButton).should("not.be.disabled").click();
  }

  forgetPassword() {
    const { text, placeholders, logIn } = testData;

    cy.contains(text.forgotPassword).should("be.visible").click();
    cy.contains(text.resetPassword).should("be.visible");
    cy.get(placeholders.enterEmail)
      .type(signUpData.email)
      .then(($input) => {
        expect($input.val()).to.eq(signUpData.email);
      });

    cy.contains(text.sendButton).should("not.be.disabled").click();
    cy.contains(text.createNewPassword).should("be.visible");
    cy.get(placeholders.enterNewPassword)
    .type(logIn.password)
    .then(($input) => {
      expect($input.val()).to.eq(logIn.password);
      });

    cy.get(placeholders.reEnterPassword)
      .type(logIn.password)
      .then(($input) => {
        expect($input.val()).to.eq(logIn.password);
      });

    cy.contains(text.resetPasswordButton).should("not.be.disabled").click();
    cy.contains(text.continueButton).should("not.be.disabled").click();
    cy.contains(text.signInText).should('be.visible');
  }
}
