import{defineConfig,devices} from '@playwright/test';

export default defineConfig({
    testDir: './tests',
    timeout: 30*1000,
    fullyParallel: true,
    reporter: [['html',{open:'never'}],['list']],

    use:{
        baseURL: 'https://demo.playwright.dev/todomvc/',
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        headless: true,
        },

    projects:[
        {
            name:'chromium',
            use:{...devices['Desktop Chrome']}
            },
        {
                    name:'firefox',
                    use:{...devices['Desktop Chrome']}
                    }
        ]
    });