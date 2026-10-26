import { APIRequestContext, APIResponse } from '@playwright/test';
import { allure } from 'allure-playwright';
import { Logger } from './Logger';

/**
 * Standardized Custom API Response Wrapper
 */
export interface CustomApiResponse<T = any> {
    status: number;
    data: T;
    isSuccess: boolean;
    rawResponse: APIResponse;
}

export class ApiClient {
    private logger: Logger;
    private readonly apiKey = process.env.REQRES_API_KEY || 'reqres-free-v1';

    constructor(
        private request: APIRequestContext,
        private baseUrl: string = '',
        contextName: string = 'ApiClient'
    ) {
        // Instantiate Winston Logger with a dedicated module name
        this.logger = new Logger(contextName);
    }

    /**
     * Resolves clean absolute or relative URLs
     */
    private buildUrl(endpoint: string): string {
        const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
        return this.baseUrl ? `${this.baseUrl.replace(/\/$/, '')}${cleanEndpoint}` : cleanEndpoint;
    }

    /**
     * Reusable GET request wrapper with Winston logging and Allure step decoration
     */
    async get<T = any>(endpoint: string, headers: Record<string, string> = {}): Promise<CustomApiResponse<T>> {
        const url = this.buildUrl(endpoint);

        return await allure.step(`API GET ${endpoint}`, async () => {
            this.logger.info(`[API GET Request] URL: ${url}`);

            try {
                const response = await this.request.get(url, {
                    headers: {
                        'content-type': 'application/json',
                        'Accept': 'application/json',
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
                        'x-api-key': this.apiKey,
                        ...headers,
                    },
                });

                const status = response.status();
                this.logger.info(`[API GET Response] Status: ${status}`);

                let data: any = null;
                try {
                    data = await response.json();
                } catch (error) {
                    this.logger.warn(`Failed to parse JSON response for GET ${url}`);
                }

                const isSuccess = status >= 200 && status < 300;
                if (!isSuccess) {
                    this.logger.warn(`GET ${url} returned non-2xx status code: ${status}`);
                }

                return { status, data, isSuccess, rawResponse: response };
            } catch (error: any) {
                this.logger.error(`GET ${url} failed with exception: ${error.message}`);
                throw error;
            }
        });
    }

    /**
     * Reusable POST request wrapper with Winston logging and Allure step decoration
     */
    async post<T = any>(endpoint: string, payload: object, headers: Record<string, string> = {}): Promise<CustomApiResponse<T>> {
        const url = this.buildUrl(endpoint);

        return await allure.step(`API POST ${endpoint}`, async () => {
            this.logger.info(`[API POST Request] URL: ${url}`);
            this.logger.debug(`[API POST Payload]: ${JSON.stringify(payload)}`);

            try {
                const response = await this.request.post(url, {
                    data: payload,
                    headers: {
                        'content-type': 'application/json',
                        'Accept': 'application/json',
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
                        'x-api-key': this.apiKey,
                        ...headers,
                    },
                });

                const status = response.status();
                this.logger.info(`[API POST Response] Status: ${status}`);

                let data: any = null;
                try {
                    data = await response.json();
                } catch {
                    this.logger.warn(`Failed to parse JSON response for POST ${url}`);
                }

                const isSuccess = status >= 200 && status < 300;
                if (!isSuccess) {
                    this.logger.warn(`POST ${url} returned non-2xx status code: ${status}`);
                }

                return { status, data, isSuccess, rawResponse: response };
            } catch (error: any) {
                this.logger.error(`POST ${url} failed with exception: ${error.message}`);
                throw error;
            }
        });
    }

    /**
     * Reusable PUT request wrapper
     */
    async put<T = any>(endpoint: string, payload: object, headers: Record<string, string> = {}): Promise<CustomApiResponse<T>> {
        const url = this.buildUrl(endpoint);

        return await allure.step(`API PUT ${endpoint}`, async () => {
            this.logger.info(`[API PUT Request] URL: ${url}`);

            try {
                const response = await this.request.put(url, {
                    data: payload,
                    headers: {
                        'content-type': 'application/json',
                        'Accept': 'application/json',
                        'x-api-key': this.apiKey,
                        ...headers,
                    },
                });

                const status = response.status();
                this.logger.info(`[API PUT Response] Status: ${status}`);

                let data: any = null;
                try {
                    data = await response.json();
                } catch {
                    this.logger.warn(`Failed to parse JSON response for PUT ${url}`);
                }

                return { status, data, isSuccess: status >= 200 && status < 300, rawResponse: response };
            } catch (error: any) {
                this.logger.error(`PUT ${url} failed with exception: ${error.message}`);
                throw error;
            }
        });
    }

    /**
     * Reusable DELETE request wrapper
     */
    async delete<T = any>(endpoint: string, headers: Record<string, string> = {}): Promise<CustomApiResponse<T>> {
        const url = this.buildUrl(endpoint);

        return await allure.step(`API DELETE ${endpoint}`, async () => {
            this.logger.info(`[API DELETE Request] URL: ${url}`);

            try {
                const response = await this.request.delete(url, {
                    headers: {
                        'x-api-key': this.apiKey,
                        ...headers,
                    },
                });

                const status = response.status();
                this.logger.info(`[API DELETE Response] Status: ${status}`);

                let data: any = null;
                try {
                    data = await response.json();
                } catch {
                    data = null;
                }

                return { status, data, isSuccess: status >= 200 && status < 300, rawResponse: response };
            } catch (error: any) {
                this.logger.error(`DELETE ${url} failed with exception: ${error.message}`);
                throw error;
            }
        });
    }
}