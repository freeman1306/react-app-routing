import React, { Component } from "react";

// material-ui components
import Grid from "material-ui/Grid";

// react-router-dom
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// pages
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";

class App extends Component {
  render() {
    return (
      <Router>
        <div style={{ padding: 8 }}>
          <Grid container spacing={16} justify="center">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/edit/:id" component={EditPost} />
              <Route path="/create" component={CreatePost} />
              <Route component={NotFound} />
            </Switch>
          </Grid>
        </div>
      </Router>
    );
  }
}

export default App;
