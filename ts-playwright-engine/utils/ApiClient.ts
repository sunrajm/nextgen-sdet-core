import {APIRequestContext, APIResponse} from "@playwright/test";

export interface CustomApiRespons<T = any> {
    status: number;
    data: T;
    isSuccess: boolean;
    rawRepsonse: APIResponse;
}

export class ApiClient {
    // private request: APIRequestContext;
    // private baseUrl: string;

    constructor(private request: APIRequestContext, private baseUrl: string = '') {
    }

    private buildUrl(endpoint: string): string {
        const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
        return this.baseUrl ? `${this.baseUrl.replace(/\/$/, '')}${cleanEndpoint}` : cleanEndpoint;
    }

    /**
     * Helper method to perform GET requests with logging
     */
    async get<T = any>(endpoint: string, headers: Record<string, string> = {}): Promise<CustomApiRespons<T>> {
        const url = this.buildUrl(endpoint);
        console.log(`[API GET Request] URL: ${url}`);

        const response = await this.request.get(url, {
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
                ...headers
            },
        });

        const status = response.status();

        console.log(`[API GET Response] Status: ${status}`);

        let data: any = {};
        try {
            data = await response.json();
        } catch (error) {
            data = null;
        }
        return {status, data, isSuccess: status >= 200 && status < 300, rawRepsonse: response};
    }

    /**
     * Helper method to perform POST requests with JSON payload
     */
    async post<T = any>(endpoint: string, payload: object, headers: Record<string, string> = {}): Promise<CustomApiRespons<T>> {
        const url = this.buildUrl(endpoint);
        console.log(`[API POST Request] URL: ${url}, Payload: ${JSON.stringify(payload)}`);

        const response = await this.request.post(url, {
            data: payload,
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
                ...headers
            }
        });

        let data: any = {};
        try {
            data = await response.json();
        } catch {
            data = null;
        }


        console.log(`[API POST Response] Status: ${response.status()}`);
        return {
            status: response.status(),
            data,
            isSuccess: response.status() >= 200 && response.status() < 300,
            rawRepsonse: response
        };
    }
}