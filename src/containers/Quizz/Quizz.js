import React from "react";
import classes from "./Quizz.module.css";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";

class Quiz extends React.Component {
  state = {
    results: {},
    activeQuestion: 0,
    answerState: null,
    isFinished: false,
    quiz: [
      {
        question: "какого цвета небо?",
        rightAnswerId: 2,
        id: 1,
        answers: [
          {
            text: "черный",
            id: 1
          },
          {
            text: "синий ",
            id: 2
          },
          {
            text: "красный",
            id: 3
          },
          {
            text: "зеленый",
            id: 4
          }
        ]
      },

      {
        question: "в каком году основали СПБ?",
        rightAnswerId: 3,
        id: 2,
        answers: [
          {
            text: 1700,
            id: 1
          },
          {
            text: 1705,
            id: 2
          },
          {
            text: 1702,
            id: 3
          },
          {
            text: 1800,
            id: 4
          }
        ]
      }
    ]
  };

  onClickAnswerHandler = answerId => {
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0];
      if (this.state.answerState[key] === "success") {
        return;
      }
    }

    const question = this.state.quiz[this.state.activeQuestion];
    const results = this.state.results

    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) {
       results[question.id] = 'success'
     }

      this.setState({
        answerState: { [answerId]: "success" },
        results
      });

      // Timeout
      const timeout = window.setTimeout(() => {
        if (this.isQuizFinished()) {
          this.setState({ isFinished: true });
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null
          });
        }
        window.clearTimeout(timeout);
      }, 1500);
    }
    
    
    
    else {
      results[question.id] = 'error'
      this.setState({
        answerState: { [answerId]: "error" },
        results
      });
    }
  };

  isQuizFinished() {
    return this.state.activeQuestion + 1 === this.state.quiz.length;
  }

  retryHandler = () => {
    this.setState({
      activeQuestion: 0,
      answerState: null,
      isFinished: false,
      results: {}
    })
  }

  render() {
    return (
      <div className={classes.Quizz}>
        <div className={classes.QuizzWraper}>
          <h1>Ответьте на все вопросы</h1>
          {this.state.isFinished ? (
            <FinishedQuiz results={this.state.results}
              quiz={this.state.quiz}
            onRetry={this.retryHandler}
            />
          ) : (
            <ActiveQuiz
              answers={this.state.quiz[this.state.activeQuestion].answers}
              question={this.state.quiz[this.state.activeQuestion].question}
              onAnswerClick={this.onClickAnswerHandler}
              quizLength={this.state.quiz.length}
              answerNumber={this.state.activeQuestion + 1}
              state={this.state.answerState}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Quiz;
