import React from "react";
import PropTypes from "prop-types";
import TodoList from "./TodoList";

const styles = {
  li: {
    display: "flex",
    justifyContent: "space-between",
    alighItems: "center",
    padding: ".5rem, 1rem",
    border: "1px solid #cccc",
    borderRadius: "4px",
    marginBottom: ".5rem"
  },
  input: {
    marginRight: "1rem"
  }
};

function TodoItem({ todo, index, onChangeFunc }) {
  return (
    <li style={styles.li}>
      <span>
        <input type="checkbox" style={styles.input} onChange={() => onChangeFunc(todo.id)} />
        <strong>{index + 1}</strong>
        &nbsp;
        {todo.title}
      </span>{" "}
      <button className="rm">&times;</button>
    </li>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  index: PropTypes.number,
  onChangeFunc: PropTypes.func.isRequired
};

export default TodoItem;
