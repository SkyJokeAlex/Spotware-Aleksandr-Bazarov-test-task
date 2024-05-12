import test, { Locator, Page, expect } from "@playwright/test";
import { assertVisibleAndClick } from "../../Utils/assertVisibleAndClick";
import { BasePageElement } from "../BasePageElement";

export class BaseDialog extends BasePageElement {
    protected dataTestId: string;

    protected dialog: Locator;

    protected get dialogHeaderTitle() {
        return this.dialog.getByTestId('dialog-header-title');
    }

    protected constructor(playwrightPage: Page, dataTestId: string) {
        super(playwrightPage);
        this.dataTestId = dataTestId;
        this.dialog = this.page.getByTestId(this.dataTestId);
    }

    public async assertDialogIsOpened(timeout?: number) {
        await expect(this.dialog, `Assert ${this.dataTestId} is opened`).toBeVisible(
            timeout ? { timeout } : undefined,
        );
    }

    public async dialogClose() {
        return test.step('Close dialog window', async () => {
            await assertVisibleAndClick(
                this.page.getByTestId('dialog-header-close'),
                'Assert dialog close button is visible'
            )
        })
    }

  }