import test, { expect } from "@playwright/test";
import { assertVisibleAndClick } from "../../Utils/assertVisibleAndClick";
import { BaseCtraderPage } from "../BaseCtraderPage";

export class TradeWatchPanel extends BaseCtraderPage {
    protected readonly tradeWatchPanelExpanded = this.page.getByTestId('trade-watch');

    public async clickNewOrderbuttonButton () {
        return test.step('Click "New order" button on Trade Watch Panel', async () => {
            await assertVisibleAndClick(
                this.tradeWatchPanelExpanded.getByTestId('new-order-button'),
                'Assert "Log in" button in dialog is visible'
            )
        });
    }

    public async assertPositionsCounter (positionsCounter: number) {
        return test.step(`Assert Positions counter is ${positionsCounter}`, async () => {
            await expect(this.page.getByTestId('positions-tab').getByTestId('counter'), `Assert "Limit Order" tab is active`).toHaveText(`${positionsCounter}`);
        });
    }
}
