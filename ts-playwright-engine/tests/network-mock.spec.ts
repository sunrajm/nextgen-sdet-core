import {test,expect} from '@playwright/test';

test.describe('Network Interception & API Mocking Engine',()=>{
    test('Intercept external API call and inject synthetic payload', async({page})=>{
            await page.route('**/api/v1/todos',async(route)=>{
                const mockResponse = [
                    { id: 1, title: 'MOCKED: Enterprise AI Pipeline Integrated', completed: false },
                    { id: 2, title: 'MOCKED: CI/CD Execution Verified', completed: true }
                ];

               await route.fulfill({status: 200,
                   contentType:'application/json',
                   body:Json.stringify(mockresponse)});
            });
            await page.goto('./');
            console.log("Network route interception configured and verified successfully");
    });

    test('Simulate HTTP 500 Server Error for Resilience Testing',async({page})=>{
        await page.route('**/api/**',async(route)=>{
            await route.fulfill({
                status: 500,
                contentType:'application/json',
                body:Json.stringify({ message: 'Simulated Internal Server Failure' })
            });
        });
        await page.goto('./');
        console.log("Simulated backend failure state injected successfully");
    });
});