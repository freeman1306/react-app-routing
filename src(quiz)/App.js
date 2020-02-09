import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import Quizz from "./containers/Quizz/Quizz";

class App extends Component {
  render() {
    return (
      <Layout>
        <Quizz></Quizz>
      </Layout>
    );
  }
}

export default App;
