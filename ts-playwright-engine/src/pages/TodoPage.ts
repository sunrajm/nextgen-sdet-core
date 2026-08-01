import {Page,locator,expect} from '@playwright/test';

export interface TodoItem{
    title:String;
    completed?:boolean;
    }

export class TodoPage{
    readonly page:Page;
    readonly headerTitle:Locator;
    readonly newTodoInput:Locator;
    readonly todoItems:Locator;

    constructor(page:Page){
        this.page = page;
        this.headerTitle = page.locator('h1');
        this.newTodoInput = page.getByPlaceholder("What needs to be done?");
        this.todoItems = page.getByTestId("todo-title");
        }

        async navigate():Promise<void>{
            await this.page.goto("./");
            }

        async addTodo(itemTitle:string):Promise<void>{
            await this.newTodoInput.fill(itemTitle);
            await this.newTodoInput.press('Enter');
            }
        async verifyItemVisiblity(itemTitle: string):Promise<void>{
            const itemLocator = this.page.getByText(itemTitle);
            await expect(itemLocator).toBeVisible();
            }
    }