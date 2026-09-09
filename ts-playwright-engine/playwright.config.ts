import { defineConfig, devices } from '@playwright/test';
import { getEnvConfig } from './config/env.config';

// Dynamic environment resolution via TEST_ENV
const activeEnv = getEnvConfig();

export default defineConfig({
    testDir: './tests',
    timeout: 30 * 1000,
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 2 : 1,
    reporter: process.env.CI ? [['blob'], ['list']] : [['html', { open: 'never' }]],

    use: {
        baseURL: activeEnv.baseUrl,
        extraHTTPHeaders: {
            'X-Tenant-ID': activeEnv.tenantId,
        },
        trace: 'retain-on-failure',
        screenshot: 'only-on-failure',
        video: 'retain-on-failure',
        headless: !!process.env.CI, // Runs headless in CI, headed locally when needed
    },

    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
        },
        {
            name: 'webkit',
            use: { ...devices['Desktop Safari'] },
        },
        {
            name: 'mobile-chrome',
            use: { ...devices['Pixel 5'] },
        },
    ],
});