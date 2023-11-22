import type { PageServerLoad, Actions } from './$types';


let autoid = 0;
export type Todo = {
    id: number,
    text: string,
    completed: boolean
};
let todos: Todo[] = [];
function addTodo(text: string) {
    const todo = { id: autoid++, text, completed: false };
    todos.push(todo);
    return todo;
}
function getTodos() { return todos; }


export const load = (async () => {
    return { todos: getTodos() };
}) satisfies PageServerLoad;

export const actions = {
    add: async ({ request }) => {
        const form = await request.formData();
        const todo = form.get("todo") as string;
        addTodo(todo);
    },
    caps: async ({ request }) => {
        const form = await request.formData();
        const todo = (form.get("todo") as string).toUpperCase();
        addTodo(todo);
    }
} satisfies Actions;
