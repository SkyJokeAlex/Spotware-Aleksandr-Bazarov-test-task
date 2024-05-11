import { expect } from "@playwright/test";
import { BasePageElement } from "./BasePageElement";

export abstract class BaseCtraderPage extends BasePageElement {
    protected abstract headerText: string;
    
    public async go() {
        await this.page.goto('https://app.ctrader.com/');
        
    }

    public async assertPageOpened({timeout = 20_000} = {}) {
        await expect(this.page.locator('header'), `Assert ${this.headerText} page is opened`).toHaveText(
            new RegExp(this.headerText),
            {timeout},
        );

        return this;
    }
  }