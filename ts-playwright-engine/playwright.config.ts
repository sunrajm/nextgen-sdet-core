import{defineConfig,devices} from '@playwright/test';

const ENV = process.env.TST_ENV || 'qa';

const ENV_URLS: Record<String,String>={
    dev:'https://demo.playwright.dev/todomvc/#/dev',
    qa:'https://demo.playwright.dev/todomvc/#/',
     staging: 'https://demo.playwright.dev/todomvc/#/staging',
    };

export default defineConfig({
    testDir: './tests',
    timeout: 30*1000,
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI?2:0,
    workers: process.env.CI?2:undefined,
    reporter: [['html',{open:'never'}],['list']],

    use:{
        baseURL: ENV_URLS[ENV]|| ENV_URLS.qa,
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        headless: !!process.env.CI || true,
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