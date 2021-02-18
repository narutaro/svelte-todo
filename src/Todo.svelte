<script>
  let newTask = "";
  let todos = [];

  let newId = () => { return Date.now().toString(36) } 

  function add(task) {
    todos = [...todos, {id: newId(), name: task, done: false}] // todos.push({name: task}) does not work
  }

  function done(id) {
    console.log('done called')
    let result = todos.map(todo => {
      if (todo.id == id){ todo.done = true }
      return todo
    });
    todos = result; // this triggers reactive change
  }

  // $: label make it reactive
  $: activeTodos = todos.filter(function(todo){
    return (todo.done == false)
  });

</script>

<main>
  <h1>HELLO TODO!</h1>
  <div class="container">
    <form>
      <div class="row">
        <div class="two-thirds column">
          <input class="u-full-width" type="text" placeholder="Add new task" bind:value={newTask}>
        </div>
        <div class="one-third column"><input type="button" value="add" on:click={add(newTask)}></div>
      </div>
    </form>
    {#if activeTodos.length === 0}
      <h3>YOU HAVE NO TASK!</h3>
    {:else}
      <table class="u-full-width">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {#each activeTodos as todo}
            <tr>
              <td>{todo.id}</td>
              <td>{todo.name}</td>
              <td><input type="button" value="done!" on:click={done(todo.id)}></td>
            </tr>
          {/each}
        </tbody>
      </table>
    {/if}
  </div>
</main>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
    margin-bottom: 1.5em;
  }

  h3 {
    color: gray;
    text-transform: uppercase;
    font-size: 2em;
    font-weight: 150;
    margin-top: 3.5em;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
