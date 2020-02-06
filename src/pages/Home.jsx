import React, { Component } from "react";
// material-ui components
import Grid from "material-ui/Grid";
import Typography from "material-ui/Typography";
import Paper from "material-ui/Paper";
import List, {
  ListItem,
  ListItemSecondaryAction,
  ListItemText
} from "material-ui/List";
import IconButton from "material-ui/IconButton";
import DeleteIcon from "material-ui-icons/Delete";
import EditIcon from "material-ui-icons/Edit";
import AddIcon from "material-ui-icons/Add";

// react redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// action creators
import { actions as postActions } from "../reducers/post";
import { Link } from "react-router-dom";
import { getPosts } from "../api/post";

class Home extends Component {
  componentDidMount() {
    getPosts().then(({ data }) => {
      const { postActions } = this.props;
      postActions.set(data);
    });
  }

  // handle edit todo
  handleEdit = value => e => {
    const { history } = this.props;
    history.push(`/edit/${value.id}`);
  };

  // handle delete todo
  handleDelete = value => e => {
    const { postActions } = this.props;
    postActions.delete(value);
  };

  //render component
  render() {
    const { post } = this.props;
    return (
      <Grid item xs={12} sm={6}>
        <IconButton>
          <Link to="/create">
            <AddIcon aria-label="create" />
          </Link>
        </IconButton>
        <Typography align="center" type="display3">
          Posts
        </Typography>
        <Paper style={{ paddingLeft: 16, paddingRight: 16 }}>
          <List>
            {post.items.map(value => (
              <ListItem key={value.id} dense button>
                <ListItemText primary={value.title} />
                <ListItemSecondaryAction>
                  <IconButton
                    aria-label="Edit"
                    onClick={this.handleEdit(value)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="Delete"
                    onClick={this.handleDelete(value)}
                  >
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

const mapStateToProps = ({ post }) => ({ post });
const mapDispatchToProps = dispatch => ({
  postActions: bindActionCreators(postActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
