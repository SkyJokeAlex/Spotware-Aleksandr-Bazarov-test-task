import test, { expect } from "@playwright/test";
import { assertVisibleAndClick } from "../../Utils/assertVisibleAndClick";
import { BaseCtraderPage } from "../BaseCtraderPage";

export class TradeWatchPanel extends BaseCtraderPage {
    protected readonly tradeWatchPanelExpanded = this.page.getByTestId('trade-watch');

    protected readonly ordersTab = this.tradeWatchPanelExpanded.getByTestId('orders-tab');

    public async clickNewOrderbuttonButton () {
        return test.step('Click "New order" button on Trade Watch Panel', async () => {
            await assertVisibleAndClick(
                this.tradeWatchPanelExpanded.getByTestId('new-order-button'),
                'Assert "New order" button on Trade Watch Panel is visible'
            )
        });
    }

    public async assertPositionsCounter (positionsCounter: number) {
        await expect(this.page.getByTestId('positions-tab').getByTestId('counter'), `Assert "Positions" counter is ${positionsCounter}`).toHaveText(`${positionsCounter}`);
    }

    public async assertOrdersCounter (positionsCounter: number) {
        await expect(this.ordersTab.getByTestId('counter'), `Assert "Orders" counter is ${positionsCounter}`).toHaveText(`${positionsCounter}`);
    }

    public async switchToOrdersTab () {
        return test.step('Switch to "Orders" tab', async () => {
            await assertVisibleAndClick(
                this.ordersTab,
                'Assert "Orders" tab is visible'
            )
            //Playwright acts too fast for this page
            await this.page.waitForTimeout(1000);
        });
    }

    public async cancelAllInOrdersTab () {
        return test.step('Cancel all Orders in "Orders" tab', async () => {
            await assertVisibleAndClick(
                this.tradeWatchPanelExpanded.getByTestId('cancel-all-orders-button'),
                'Assert "Canell All" button is visible'
            )
        });
    }
}
