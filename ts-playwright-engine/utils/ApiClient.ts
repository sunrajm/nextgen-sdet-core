import {APIRequestContext, APIResponse} from "@playwright/test";

export class ApiClient {
    private request: APIRequestContext;
    private baseUrl: string;

    constructor(request: APIRequestContext, baseUrl: string = 'https://demo.playwright.dev/todomvc/#/') {
        this.request = request;
        this.baseUrl = baseUrl;
    }

    /**
     * Helper method to perform GET requests with logging
     */
    async get(endpoint: string, headers: Record<string, string> = {}): Promise<APIResponse> {
        const url = `${this.baseUrl}${endpoint}`;
        console.log(`[API GET Request] URL: ${url}`);

        const response = await this.request.get(url, {
            headers: {
                'content-type': 'application/json',
                ...headers
            },
        });

        console.log(`[API GET Response] Status: ${response.status()}`);
        return response;
    }

    /**
     * Helper method to perform POST requests with JSON payload
     */
    async post(endpoint:string,payload:object,headers:Record<string,string>={}):Promise<APIResponse> {
        const url = `${this.baseUrl}${endpoint}`;
        console.log(`[API POST Request] URL: ${url}, Payload: ${JSON.stringify(payload)}`);

        const response = await this.request.post(url,{
            data:payload,
            headers:{
                'content-type':'application/json',
                ...headers
            }
        });

        console.log(`[API POST Response] Status: ${response.status()}`);
        return response;
    }
}