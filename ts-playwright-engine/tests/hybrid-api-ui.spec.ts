import { test, expect } from '@playwright/test';
import { TodoApiUtils, CreateTodoPayload } from '../src/api/TodoApiUtils';
import{TodoPage} from '../src/pages/TodoPage';

test.describe('Hybrid API Setup & UI Validation Suite', () => {
        test('Prepare state via APIRequestContext and validate UI state',async ({request, page}) => {
            const apiUtils = new TodoApiUtils(request);
            const todoPage = new TodoPage(page);

            // Prepare state via API
            const payload: CreateTodoPayload = {
                title: 'Test Todo from API',
                completed: false
            };
            await apiUtils.createTodoViaApi(payload);

            // Validate UI state
            await todoPage.navigate();
            await todoPage.addTodo(payload.title);
            await todoPage.verifyItemVisiblity(payload.title);
            });
    });