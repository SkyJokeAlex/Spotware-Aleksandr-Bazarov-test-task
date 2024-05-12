import test, { Page, expect } from "@playwright/test";
import { BaseDialog } from "./BaseDialog";
import { assertVisibleAndClick } from "../../Utils/assertVisibleAndClick";

export class TradeDialog extends BaseDialog {
    constructor(playWrightPage: Page) {
        super(playWrightPage, 'trade-dialog')
    }

    public async assertMarketIsClosed () {
        await expect(this.page.getByTestId('market-closed-control'), `Assert "Market is closed" warning is visible`).toBeVisible();

        return this;
    }

    public async clickMarketIsClosedControl () {
        await assertVisibleAndClick(
            this.page.getByTestId('market-closed-control'),
            'Assert "Market is closed" control is visible'
        )
    }

    public async switchToMarketOrderTab () {
        await assertVisibleAndClick(
            this.page.getByTestId('market-order'),
            'Assert "Market Order" tab is visible'
        )
    }

    private async assertMarketOrderTabIsActive () {
        await expect(this.page.getByTestId('market-order'), `Assert "Market Order" tab is active`).toHaveAttribute('data-test-checked', 'true');
    }

    private async assertLimitOrderTabIsActive () {
        await expect(this.page.getByTestId('limit-order'), `Assert "Limit Order" tab is active`).toHaveAttribute('data-test-checked', 'true');
    }

    public async clickPlaceOrderOnMarketOrderTabButton () {
        await assertVisibleAndClick(
            this.page.getByTestId('new-position-submit-control'),
            'Assert "Place Order" button on Market Order tab is visible'
        )
    }

    public async clickPlaceOrderOnLimitOrderTabButton () {
        await assertVisibleAndClick(
            this.page.getByTestId('limit-order-submit-control'),
            'Assert "Place Order" button on Limit Order tab is visible'
        )
    }

    /**
     * Place Order
     * IF the market is closed, then swtiches to pending orders and click Place Order from there
     */
    public async forcePlaceOrder () {
        // await test.step('Place an Order (if market is closed, then switches tab and places pending order)', async () => {
            await this.switchToMarketOrderTab();
            await this.assertMarketOrderTabIsActive();

            let isOrderPlacedWhenMarketIsOpened: boolean

            if (await this.assertMarketIsClosed()) {
                await this.clickMarketIsClosedControl()
                await this.assertLimitOrderTabIsActive();
                await this.clickPlaceOrderOnLimitOrderTabButton();

                isOrderPlacedWhenMarketIsOpened = false
            }
            else {
                await this.clickPlaceOrderOnMarketOrderTabButton();

                isOrderPlacedWhenMarketIsOpened = true
            }

            return isOrderPlacedWhenMarketIsOpened
        // });
    }

    public async assertOrderWasPlaced () {
        await expect(this.page.getByTestId('thank-you-form'), `Assert order was successfully placed`).toBeVisible(); 
    }
}