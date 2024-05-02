/// <reference types="Cypress" />
import { signUpData } from "../../fixtures/commomTestData";
import { BaseDependencies, BaseEyes, BaseHands } from "../BaseRobot";

export class FillSignUpDependencies extends BaseDependencies {
  visitSignUpPage() {
    cy.visit(signUpData.signUpPage.url);
  }
}

export class FillSignUpFormRobotEyes extends BaseEyes {
  seesElelmentWithPath(arg0: string) {
    throw new Error("Method not implemented.");
  }
  contains: any;
  get: any;

  seesElementWithText(text: string) {
    return this.seesDomVisible(text);
  }
}

export class FillSignUpFormRobotHands extends BaseHands {
  signUpEmail() {
    cy.get(signUpData.signUpPlaceholders.fullName)
      .type(signUpData.fullName)
      .then(($input) => {
        expect($input.val()).to.eq(signUpData.fullName);
      });

    cy.get(signUpData.signUpPlaceholders.email)
      .type(signUpData.email)
      .then(($input) => {
        expect($input.val()).to.eq(signUpData.email);
      });

    cy.get(signUpData.signUpPlaceholders.createPassword)
      .type(signUpData.password)
      .then(($input) => {
        expect($input.val()).to.eq(signUpData.password);
      });

    cy.wait(2000);

    cy.get(signUpData.signUpButton.class).should("be.visible").click();

    cy.wait(4000);
  }
}
