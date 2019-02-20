import React, { Component } from "react";

class Todos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      todos: []
    };
  }

  componentDidMount() {
    this.setState({ todos: this.fetchTodos() });
  }

  fetchTodos = () => {
    let todos = JSON.parse(localStorage.getItem("todos"));
    if (!todos) {
      localStorage.setItem(
        "todos",
        JSON.stringify([
          {
            id: 1,
            title: "buy a pony",
            completed: false
          },
          {
            id: 2,
            title: "learn japanese",
            completed: false
          },
          {
            id: 3,
            title: "give dmitry a job",
            completed: false
          }
        ])
      );
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
  };

  addTodo = todo => {
    let res = this.state.todos;
    res.push(todo);
    localStorage.setItem("todos", JSON.stringify(this.state.todos));
    this.setState({ todos: res });
  };

  completeTodo = todo => {
    let res = this.state.todos;
    res.forEach((item, i) => {
      if (item.id === todo.id) {
        item.complete = !item.complete;
      }
    });
    localStorage.setItem("todos", JSON.stringify(res));
    this.setState({ todos: res });
  };

  delTodo = todo => {
    let res = this.state.todos;
    res.forEach((item, i) => {
      if (item.id === todo.id) {
        res.splice(i, 1);
      }
    });
    localStorage.setItem("todos", JSON.stringify(res));
    this.setState({ todos: res });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    if (this.state.title !== "") {
      var id = 1;
      if (this.state.todos.length) {
        id = this.state.todos[this.state.todos.length - 1].id + 1;
      }
      const todo = {
        id: id,
        title: this.state.title,
        complete: false
      };
      this.setState({ title: "" });
      this.addTodo(todo);
    }
  };

  componentWillReceiveProps(nextProps) {}

  render() {
    let { todos } = this.state;
    const todoItems = todos.map(todo => (
      <div
        className={todo.complete ? "todo todo-complete" : "todo"}
        key={todo.id}
      >
        <h4>
          <p className="todo-id">Todo №{todo.id}</p>
          <p>{todo.title}</p>
        </h4>
        <hr />
        <button
          onClick={this.completeTodo.bind(this, todo)}
          type="button"
          className="btn btn-outline-warning copmlete-todo-btn"
        >
          copmlete?
        </button>
        <button
          onClick={this.delTodo.bind(this, todo)}
          type="button"
          className="btn btn-danger del-todo-btn"
        >
          del
        </button>
      </div>
    ));
    const addForm = (
      <div className="add-todo-form">
        <h1>Add Todo</h1>
        <form onSubmit={this.onSubmit}>
          <div>
            <label>need to do: </label>
            <br />
            <input
              className="form-control"
              type="text"
              name="title"
              onChange={this.onChange}
              value={this.state.title}
            />
          </div>
          <br />
          <button className="btn btn-primary" type="submit">
            ADD
          </button>
        </form>
      </div>
    );
    return (
      <div>
        {addForm}
        <div className="todos-block">
          <h1>Todos</h1>
          <div className="todos">{todoItems}</div>
        </div>
      </div>
    );
  }
}

export default Todos;
