import {test,expect} from '../src/fixtures/page-fixtures';

test.describe('Enterprise Fixture Architecture Suite',()=>{
    test('Create todo item using auto-injected page fixture',async({todoPage})=>{
        const taskName = 'Master Playwright Custom Fixture Injection';
        await todoPage.addTodo(taskName);
        await todoPage.verifyItemVisiblity(taskName);
    });
});