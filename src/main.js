import Todo from './Todo.svelte';

const app = new Todo({
	target: document.body,
	props: {
		name: 'Todo'
	}
});

export default app;
