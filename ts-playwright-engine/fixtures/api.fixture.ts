import {test as base} from '@playwright/test';
import {ApiClient} from '../utils/ApiClient';
import {getEnvConfig} from '../config/env.config';

type ApiFixture = {
    apiClient: ApiClient;
}

export const test = base.extend<ApiFixture>({
    apiClient : async ({request},use)=>{
        const {apiUrl} = getEnvConfig();
        const client = new ApiClient(request, apiUrl);
        await use(client);
    }
});

export {expect} from '@playwright/test';
