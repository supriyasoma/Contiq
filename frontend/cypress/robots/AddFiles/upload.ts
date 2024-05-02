/// <reference types="Cypress" />
import { BaseEyes, BaseHands } from "../BaseRobot";
import { fileRenderConstants, upload } from "../../fixtures/commomTestData";

export class LocalUploadEyes extends BaseEyes {
  contains: any;
  get: any;

  seesElementWithText(text: string) {
    return this.seesDomVisible(text);
  }
}

export class LocalUploadHands extends BaseHands {
  localUpload() {
    cy.wait(upload.waitTimes.short);
    cy.contains(upload.filesButtonText).click();
    cy.wait(upload.waitTimes.short);
    cy.contains(upload.addFilesText).click();
    cy.contains(upload.dropFilesHereText);
    cy.get("input[type=file]").selectFile(upload.filePath, {
      force: true,
    });
    cy.contains(upload.uploadFilesText).should("be.visible").click();
    cy.get(".css-1tgqr80 > .MuiButton-contained").click();
    cy.wait(upload.waitTimes.long);
    cy.get(`[data-testid="${upload.closeIconTestId}"]`).should("be.visible").click();
    cy.wait(upload.waitTimes.short);
  }
  fileRender() {
    cy.contains(fileRenderConstants.START_DATE).should("be.visible").click();
    cy.wait(fileRenderConstants.WAIT_TIME);
    cy.get('[data-timestamp="1698777000000"]').click();
    cy.contains(fileRenderConstants.END_DATE).should("be.visible").click();
    cy.get(".MuiPickersDay-today").click();
    cy.contains(fileRenderConstants.PUBLISH_SETTING)
      .should("be.visible")
      .click();
    cy.contains(fileRenderConstants.PUBLISHED_BY_ME)
      .should("be.visible")
      .click();
    cy.contains(fileRenderConstants.FILE_TYPE).should("be.visible").click();
    cy.contains(fileRenderConstants.PDF).should("be.visible").click();
    cy.get(`img[alt="${fileRenderConstants.PDF_IMAGE_ALT}"]`)
      .first()
      .dblclick();
    cy.wait(fileRenderConstants.WAIT_TIME);
    cy.get(`[data-testid="${fileRenderConstants.ZOOM_IN_TEST_ID}"]`).click();
    cy.contains("80%").should("be.visible").should("contain", "80%");
    cy.get(`[data-testid="${fileRenderConstants.ZOOM_OUT_TEST_ID}"]`).click();
    cy.contains("85%").should("be.visible").should("contain", "85%");
    cy.get(`img[alt="${fileRenderConstants.BACK_ICON_ALT}"]`).click();
    cy.url().should("include", fileRenderConstants.FILE_PAGE_URL_PARTIAL);
  }
  searchKeyWord() {
    cy.get(fileRenderConstants.SEARCH_INPUT_SELECTOR)
      .type(fileRenderConstants.KEYWORD_COMPILE)
      .then(($input) => {
        expect($input.val()).to.eq(fileRenderConstants.KEYWORD_COMPILE);
      });
    cy.get(fileRenderConstants.FIRST_LIST_ITEM_SELECTOR).first().click();
    cy.get(fileRenderConstants.EXPAND_ICON_SELECTOR).click();
    cy.wait(1000);
    cy.get(fileRenderConstants.DOWN_ARROW_SELECTOR).click();
    cy.get(fileRenderConstants.DOWN_ARROW_SELECTOR).click();

    cy.get(`img[alt="${fileRenderConstants.BACK_ICON_ALT}"]`).click();
    cy.get(fileRenderConstants.AVATAR_IMG_CLASS).should("be.visible").click();
    cy.contains(fileRenderConstants.LOGOUT_TEXT).should("be.visible").click();
  }
}
