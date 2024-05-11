import test, { expect } from "@playwright/test";
import { BasePageElement } from "./BasePageElement";
import { assertVisibleAndClick } from "../Utils/assertVisibleAndClick";
import { TradeWatchPanel } from "./Panels/TradeWatchPanel";

export class BaseCtraderPage extends BasePageElement {
    protected dataTestId: string;

    public async go() {
        await this.page.goto('https://app.ctrader.com/');
    }

    public async clickLoginButton () {
        return test.step('Click "Log In" button', async () => {
            await assertVisibleAndClick(
                this.page.getByTestId('log-in'),
                'Assert "Log in" button is visible'
            )
        });
    }

    public async assertUserIsLogedIn () {
        return test.step('Click "Log In" button', async () => {
            await expect(this.page.getByTestId('account-control'), `Assert account-control menu is visible`).toBeVisible()
        });
    }
}