/// <reference types="node" />
export interface EnvironmentConfig {
    baseUrl: string;
    apiUrl: string;
    tenantId: string;
}

const environments: Record<string, EnvironmentConfig> = {
    qa: {
        baseUrl: 'https://qa.reqres.in',
        apiUrl: 'https://qa-api.reqres.in',
        tenantId: 'tenant-qa-01',
    },
    staging: {
        baseUrl: 'https://demo.playwright.dev/todomvc/#/staging',
        apiUrl: 'https://staging-api.reqres.in',
        tenantId: 'tenant-staging-01',
    },
    dev: {
        baseUrl: 'https://demo.playwright.dev/todomvc/#/dev',
        apiUrl: 'https://dev-api.reqres.in',
        tenantId: 'tenant-dev-01',
    },
};

export const getEnvConfig = (): EnvironmentConfig => {
    const envKey = (process.env['TEST_ENV'] || 'dev').toLowerCase();
    const config = environments[envKey];
    if (!config) {
        return environments['dev']!;
    }
    return config;
};

export default getEnvConfig;
