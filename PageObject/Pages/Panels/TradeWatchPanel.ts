import test, { expect } from "@playwright/test";
import { assertVisibleAndClick } from "../../Utils/assertVisibleAndClick";
import { BaseCtraderPage } from "../BaseCtraderPage";

export class TradeWatchPanel extends BaseCtraderPage {
    protected readonly tradeWatchPanelExpanded = this.page.getByTestId('trade-watch');

    public async clickNewOrderbuttonButton () {
        return test.step('Click "New order" button on Trade Watch Panel', async () => {
            await assertVisibleAndClick(
                this.tradeWatchPanelExpanded.getByTestId('new-order-button'),
                'Assert "New order" button on Trade Watch Panel is visible'
            )
        });
    }

    public async assertPositionsCounter (positionsCounter: number) {
        await expect(this.page.getByTestId('positions-tab').getByTestId('counter'), `Assert Positions counter is ${positionsCounter}`).toHaveText(`${positionsCounter}`);
    }

    public async assertOrdersCounter (positionsCounter: number) {
        await expect(this.page.getByTestId('orders-tab').getByTestId('counter'), `Assert Orders counter is ${positionsCounter}`).toHaveText(`${positionsCounter}`);
    }
}
