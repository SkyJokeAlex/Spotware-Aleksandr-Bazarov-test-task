import { Page } from "@playwright/test";
import { BaseDialog } from "./BaseDialog";
import { assertVisibleAndClick } from "../../Utils/assertVisibleAndClick";

export class CloseAllOrdersDialog extends BaseDialog {
    constructor(playWrightPage: Page) {
        super(playWrightPage, 'close-all-orders-dialog')
    }

    public async clickYesButton () {
        await assertVisibleAndClick(
            this.page.getByTestId('submit'),
            'Assert "Yes" button in "Close All Orders" dialog is visible'
        )
        //Playwright acts too fast for this page
        await this.page.waitForTimeout(2000);
    }
}