import React, { Component } from "react";
// material-ui components
import Grid from "material-ui/Grid";
import Typography from "material-ui/Typography";
import Paper from "material-ui/Paper";
import TextField from "material-ui/TextField";
import IconButton from "material-ui/IconButton";
import EditIcon from "material-ui-icons/Edit";
// react redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// action creators
import { actions as postActions } from "../reducers/post";
import { editPost } from "../api/post";

class EditTodo extends Component {
  state = {
    item: {
      title: "",
      body: ""
    }
  };

  // get active item by ID from router (match.params.id)
  componentDidMount() {
    const { match, post } = this.props;
    const item = post.items.find(
      item => item.id === parseInt(match.params.id, 10)
    ) || {
      title: "",
      body: ""
    };

    this.setState({ item });
  }

  // handle change active item data
  handleChange = name => e => {
    this.setState({
      item: {
        ...this.state.item,
        [name]: e.target.value
      }
    });
  };

  //handle submit to update todo on redux state and go back to home

  handleSubmit = e => {
    e.preventDefault();
    const { item } = this.state;
    if (item.title && item.body) {
      const { postActions } = this.props;
      editPost(item)
        .then(() => {
          postActions.update(item);
          this.goBack();
        })
        .catch(error => console.log(error));
    }
  };

  //go back home
  goBack = () => {
    const { history } = this.props;
    history.push("/");
  };

  render() {
    const { item } = this.state;

    return (
      <Grid item xs={12} sm={6}>
        <Typography align="center" type="display3">
          Edit Post
        </Typography>
        <Paper style={{ paddingLeft: 16, paddingRight: 16 }}>
          <form onSubmit={this.handleSubmit}>
            <TextField
              label="Title"
              onChange={this.handleChange("title")}
              fullWidth
              margin="normal"
              value={item.title}
              autoComplete="off"
              autoFocus={true}
            />
            <TextField
              label="Description"
              onChange={this.handleChange("body")}
              fullWidth
              multiline
              margin="normal"
              value={item.body}
              autoComplete="off"
              autoFocus={false}
            />
            <IconButton aria-label="Edit" onClick={this.handleSubmit}>
              <EditIcon />
            </IconButton>
          </form>
        </Paper>
      </Grid>
    );
  }
}

const mapStateToProps = ({ post }) => ({ post });
const mapDispatchToProps = dispatch => ({
  postActions: bindActionCreators(postActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(EditTodo);
