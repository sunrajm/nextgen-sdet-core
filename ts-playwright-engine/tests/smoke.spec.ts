import {test,expect} from '@playwright/test';

test.describe('Engine validation Suite',()=>{
    test('Verify home page title and heading state',async({page})=>{
        await page.goto('./');
        await expect(page).toHaveTitle(/React .* TodoMVC/);
        const header = page.locator('h1');
        await expect(header).toBeVisible();
        await expect(header).toHaveText('todos');
    });

    test('Deliberate Failure for Trace Verification',async({page})=>{
        await page.goto('./');
        await expect(page).toHaveTitle('Non-Existent Page Title');
    });
});