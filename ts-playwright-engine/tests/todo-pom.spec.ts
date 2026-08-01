import {test,expect} from '@playwright/test';
import {TodoPage} from '../src/pages/TodoPage.ts';

test.describe('TodoMVC Page Object Model Suite',()=>{
    test('Verify creating new todo items via Page object creation',async ({page})=>{
            const todoPage = new TodoPage(page);

            await todoPage.navigate();
            const taskName = 'Day 7 task is added';
            await todoPage.addTodo(taskName);
            await todoPage.verifyItemVisiblity(taskName);
    });

 });
