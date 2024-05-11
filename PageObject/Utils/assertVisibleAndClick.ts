import { Locator, expect } from "@playwright/test";

type Options = {
    clickOptions?: Parameters<Locator['click']>[0];
    visibleOptions?: Parameters<Locator['isVisible']>[0];
}

export const assertVisibleAndClick = async (
    locator: Locator,
    assertMessage: string,
    { clickOptions, visibleOptions }: Options = {}
) => {
    await expect(locator, assertMessage).toBeVisible({ timeout: visibleOptions?.timeout });
    await locator.click(clickOptions);
}
