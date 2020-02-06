import React, { Component } from "react";

// material-ui components
import Grid from "material-ui/Grid";
import Typography from "material-ui/Typography";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import List, { ListItem, ListItemSecondaryAction, ListItemText } from "material-ui/List";
import Checkbox from "material-ui/Checkbox";
import IconButton from "material-ui/IconButton";
import DeleteIcon from "material-ui-icons/Delete";
import EditIcon from "material-ui-icons/Edit";
import { MenuItem } from "material-ui/Menu";
import { FormControl } from "material-ui/Form";
import Select from "material-ui/Select";

// react redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// action creators
import { actions as todoActions } from "../reducers/todo";

//lodash
import uniqueId from "lodash/uniqueId";

class Home extends Component {
  state = {
    filter: "all"
  };
  // handle change filter
  handleChangeFilter = e => {
    this.setState({ filter: e.target.value });
  };

  // // handle completed checkbox
  // handleToggleCompleted = value => (e, b) => {

  //     const { todoActions } = this.props;
  //     const item = {
  //         ...value,
  //         completed: !value.completed
  //     }
  //     todoActions.update(item);
  // }

  // handle edit todo
  handleEdit = value => e => {
    const { history } = this.props;
    history.push(`/edit/${value.id}`);
  };

  // handle delete todo
  handleDelete = value => e => {
    const { todoActions } = this.props;
    todoActions.delete(value);
  };

  // filter todo items base on filter state
  filterTodoItems = item => {
    const { filter } = this.state;
    if (filter === "completed") {
      return item.completed;
    } else if (filter === "active") {
      return !item.completed;
    } else {
      return true;
    }
  };

  //render component
  render() {
    const { todo } = this.props;
    const { filter } = this.state;
    console.log(todo);

    return (
      <Grid item xs={12} sm={6}>
        <Typography align="center" type="display3">
          Todos
        </Typography>
        <Paper style={{ paddingLeft: 16, paddingRight: 16 }}>
          {/* {todo.items.length > 0 &&
                        <FormControl fullWidth>
                            <Select
                                value={filter}
                                onChange={this.handleChangeFilter}
                                name="filter"
                                fullWidth
                                margin="normal"

                            >
                                <MenuItem value='all'>All</MenuItem>
                                <MenuItem value='completed'>Completed</MenuItem>
                                <MenuItem value='active'>Active</MenuItem>
                            </Select>

                        </FormControl>
                    } */}

          <List>
            {todo.items.map(value => (
              <ListItem
                key={value.id}
                dense
                button

                //className={classes.listItem}
              >
                <ListItemText primary={value.title} />
                <ListItemSecondaryAction>
                  <IconButton aria-label="Edit" onClick={this.handleEdit(value)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton aria-label="Delete" onClick={this.handleDelete(value)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>
    );
  }
}

const mapStateToProps = ({ todo }) => ({ todo });
const mapDispatchToProps = dispatch => ({ todoActions: bindActionCreators(todoActions, dispatch) });

export default connect(mapStateToProps, mapDispatchToProps)(Home);
