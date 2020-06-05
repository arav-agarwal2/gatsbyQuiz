import React, { useState } from "react";
import SEO from "../components/seo";
import Layout from "../components/layout";
import buttonStyles from "./quiz.module.css";
import QuizData from "../content/quizData.json";
const defaultQuestions = shuffleArray(QuizData);
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [currentScore, setCurrentScore] = useState(0);
  const [finishedAnswering, finishAnswering] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const maxQuestions = 5;
  const [randomizedOptions, updateOptions] = useState(shuffleArray([0,1,2,3]));
  const handleCorrectAnswer = () => {
    if (!!!finishedAnswering) {
      setCurrentScore(currentScore + 10);
    }
    finishAnswering(true);
  };
  const handleIncorrectAnswer = () => {
    if (!!!finishedAnswering) {
      setCurrentScore(currentScore - 5);
    }
    finishAnswering(true);
  };
  const toNextQuestion = () => {
    setCurrentQuestion(currentQuestion + 1);
    if (currentQuestion === maxQuestions) {
      setIsDone(true);
    }
    updateOptions(shuffleArray(randomizedOptions));
    finishAnswering(false);
  }
  const answerChoices = (currentQuestion) =>
    [
      <button
        onClick={handleCorrectAnswer}
        className={!finishedAnswering ? buttonStyles.question : buttonStyles.rightanswer}
      >
        {defaultQuestions[currentQuestion].A}
      </button>,
      ...defaultQuestions[currentQuestion].Options.map((option, index) => (
        option !== "" ?
        <button
          key={index}
          onClick={handleIncorrectAnswer}
          className={
            !finishedAnswering ? buttonStyles.question : buttonStyles.wronganswer
          }
        >
          {option}
        </button>
        : null
      )),
    ];
  return (
    <Layout>
      <SEO title="Quiz" />
      {!isDone ? (
        <div>
          <p>{defaultQuestions[currentQuestion].Q}</p>
          {randomizedOptions.map((value, index) => answerChoices(currentQuestion)[value])}
          <h3 className={finishedAnswering ? buttonStyles.explanation : null}>
            {finishedAnswering ? defaultQuestions[currentQuestion].Incorrect : ""}
          </h3>
          {finishedAnswering ? <button className={buttonStyles.question} onClick={toNextQuestion}>Click here to continue</button> : null}
        </div>
      ) : (
        <p>You finished! Here's your score:  {currentScore}</p>
      )}
    </Layout>
  );
};

export default Quiz;
