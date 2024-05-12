import test, { Page, expect } from "@playwright/test";
import { BaseDialog } from "./BaseDialog";
import { assertVisibleAndFill } from "../../Utils/assertVisibleAndFill";
import { assertVisibleAndClick } from "../../Utils/assertVisibleAndClick";

export class LogInDialog extends BaseDialog {
    constructor(playWrightPage: Page) {
        super(playWrightPage, 'dialog')
    }

    private async assertSignUpFormIsVisible () {
        await expect(this.page.getByTestId('sign-up'), `Assert "Market Order" tab is active`).toBeVisible();
    }

    private async assertSignInFormIsVisible () {
        await expect(this.page.getByTestId('sign-in'), `Assert "Limit Order" tab is active`).toBeVisible();
    }

    public async fillEmail (userEmail: string) {
        return test.step(`Fill userEmail into Email input`, async () => {
            await assertVisibleAndFill(
                this.page.getByTestId('email').locator('input[type="text"]'),
                'Assert Email input is visible',
                userEmail,
            )
        });
    }

    public async fillPassword (userPassword: string) {
        return test.step(`Fill Password into Password input`, async () => {
            await assertVisibleAndFill(
                this.page.getByTestId('password').locator('input[type="password"]'),
                'Assert Password input is visible',
                userPassword,
            )
        });
    }

    public async clickLoginDialogButton () {
        return test.step('Click "Log In" button in dialog window', async () => {
            await assertVisibleAndClick(
                this.page.getByTestId('submit'),
                'Assert "Log in" button in dialog is visible'
            )
        });
    }

    public async clickLoginTabButton () {
        return test.step('Switch to "Log In" tab in dialog window', async () => {
            await assertVisibleAndClick(
                this.page.getByTestId('signin-tab'),
                'Assert "Log in" tab in dialog is visible'
            )
        });
    }
}