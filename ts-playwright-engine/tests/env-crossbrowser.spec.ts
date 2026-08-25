import {test, expect} from '@playwright/test';

test.describe('Enterprise Cross-Browser & Multi-Environment Suite', () => {
    test('Verify dynamic base URL and execution context',async({page,baseURL})=>{
        console.log(`[CI/CD Context]: Executing against target URL -> ${baseURL}`);
        await page.goto('./');
        await expect(page).toHaveTitle(/TodoMVC/);
        });
    });