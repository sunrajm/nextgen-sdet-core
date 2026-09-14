import {test as base} from '@playwright/test';
import {ApiClient} from '../utils/ApiClient';

type ApiFixture = {
    apiClient: ApiClient;
}

export const test = base.extend<ApiFixture>({
    apiClient : async ({request,baseURL},use)=>{
        const client = new ApiClient(request, baseURL||'https://reqres.in');
        await use(client);
    }
});

export {expect} from '@playwright/test';
