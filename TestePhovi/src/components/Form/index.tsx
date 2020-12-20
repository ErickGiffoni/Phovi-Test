import React from "react";

import Input from "../Input";
import Select from "../Select";

import "./styles.css";

interface FormProps {
  triviaType: string;
  triviaTitle: string;
  triviaPhotoUrl: string;
  triviaQuestions: Array<{
    question: string;
    answers: string;
    correct_answer: string;
    image_url: string;
  }>;
  triviaProportion: {
    trueAnswers: number;
    falseAnswers: number;
  };

  triviaTypeOptions: Array<{
    value: string;
    label: string;
  }>;

  setTriviaPhotoUrl: Function;
  setTriviaTitle: Function;
  setTriviaType: Function;
  handleChangeTriviaData: Function;
  handleDelete: Function;
  handleAddQuestion: Function;
}

const Form: React.FC<FormProps> = ({
  triviaType,
  triviaTypeOptions,
  triviaTitle,
  triviaPhotoUrl,
  triviaQuestions,
  triviaProportion,
  setTriviaTitle,
  setTriviaPhotoUrl,
  setTriviaType,
  handleChangeTriviaData,
  handleDelete,
  handleAddQuestion,
}) => {
  return (
    <form noValidate autoComplete="off">
      <div className="form-container">
        <Input
          name="name"
          label="Trivia Name"
          value={triviaTitle}
          onChange={(e) => setTriviaTitle(e.target.value)}
        />
        <Input
          name="picture"
          label="Cover Picture URL"
          value={triviaPhotoUrl}
          onChange={(e) => setTriviaPhotoUrl(e.target.value)}
        />
        <Select
          name="type"
          label="Trivia type"
          value={triviaType}
          options={triviaTypeOptions}
          onChange={(e) => setTriviaType(e.target.value)}
        />
      </div>
      <h3>
        Questions
        {triviaType === "singleChoice" &&
          ` True=${triviaProportion.trueAnswers}% False=${triviaProportion.falseAnswers}%`}
      </h3>
      {triviaQuestions.map((question, index) => (
        <div className="questionContainer" key={index.toString()}>
          {triviaType === "singleChoice" && (
            <div className="image-form">
              <img src={question.image_url} alt="question" />
            </div>
          )}
          <div
            className={
              triviaType === "multipleChoice"
                ? "questions-input multiple-choice"
                : "questions-input"
            }
          >
            <Input
              name={`question-${index}`}
              label={`Question ${index + 1}`}
              value={question.question}
              onChange={(e) =>
                handleChangeTriviaData("question", e.target.value, index)
              }
            />
            {triviaType === "multipleChoice" && (
              <Input
                name={`answers-${index}`}
                label="Answers"
                value={question.answers}
                onChange={(e) =>
                  handleChangeTriviaData("answers", e.target.value, index)
                }
              />
            )}
            <Input
              name={`correct_answer-${index}`}
              label="Correct answer"
              value={question.correct_answer}
              onChange={(e) =>
                handleChangeTriviaData("correct_answer", e.target.value, index)
              }
            />
            {triviaType === "singleChoice" && (
              <Input
                name={`image_url-${index}`}
                label="Question photo URL"
                value={question.image_url}
                onChange={(e) =>
                  handleChangeTriviaData("image_url", e.target.value, index)
                }
              />
            )}
            <button
              type="button"
              className="button button-delete"
              onClick={() => handleDelete(index)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      <button
        type="button"
        className="button buttonForm"
        onClick={() => handleAddQuestion()}
      >
        Add question
      </button>
    </form>
  );
};

export default Form;
