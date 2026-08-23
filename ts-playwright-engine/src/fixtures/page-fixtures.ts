import {test as base,expect as baseExpect} from '@playwright/test';
import {TodoPage} from '../pages/TodoPage';

type customFixtures = {
    todoPage: TodoPage;
};
export const test = base.extend<customFixtures>({
    todoPage: async ({ page }, use) => {
        const todoPage = new TodoPage(page);
        await todoPage.navigate();
        await use(todoPage);
        console.log('[Fixture Teardown]: Execution lifecycle complete.');
    },
});

export const expect = baseExpect;