import {APIRequestContext, expect} from "@playwright/test";

export interface CreateTodoPayload{
    title: string;
    completed: boolean;
    }

export class TodoApiUtils{
    readonly request: APIRequestContext;

    constructor(request: APIRequestContext){
        this.request = request;
    }

    async createTodoViaApi(payload: CreateTodoPayload): Promise<void> {
        const response = await this.request.post('https://jsonplaceholder.typicode.com/todos', {
            data:{
                title: payload.title,
                completed: payload.completed,
                userId:1
            },
            headers:{
                'Content-Type': 'application/json'
            }
        });
        expect(response.status()).toBe(201);
        const body = await response.json();
        expect(body.title).toBe(payload.title);
    }
  }