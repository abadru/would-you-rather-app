import { hideLoading, showLoading } from "react-redux-loading";
import {
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
} from "../data/_DATA";
import { addUserQuestion } from "./users";

export const ADD_QUESTION = "ADD_QUESTION";
export const GET_QUESTIONS = "GET_QUESTIONS";
export const SAVE_ANSWER = "SAVE_ANSWER";
export const SELECT_QUESTION = "SELECT_QUESTION";

/*
    This action creator is for creating new question and it passes the new question as a payload
 */
export const addQuestion = (question) => {
  return {
    type: ADD_QUESTION,
    question,
  };
};

export function handleAddQuestion(optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { login } = getState();
    const { userId } = login;
    return _saveQuestion({
      optionOneText,
      optionTwoText,
      author: userId,
    }).then((question) => {
      dispatch(addQuestion(question));
      dispatch(addUserQuestion(userId, question.id));
    });
  };
}

/*
    This action creator is for fetching questions
 */
export const getQuestions = (questions) => {
  return {
    type: GET_QUESTIONS,
    questions,
  };
};

export const handleGetQuestions = () => {
  return (dispatch) => {
    dispatch(showLoading());

    return _getQuestions()
      .then((questions) => dispatch(getQuestions(questions)))
      .then(() => dispatch(hideLoading()));
  };
};

export const saveQuestionAnswer = (authedUser, qid, answer) => {
  return {
    type: SAVE_ANSWER,
    authedUser,
    qid,
    answer,
  };
};

export const handleSaveQuestionAnswer = (qid, answer) => {
  return (dispatch, getState) => {
    const { login } = getState();
    const { userId } = login;

    dispatch(showLoading());

    return _saveQuestionAnswer({
      qid,
      answer,
      authedUser: userId,
    })
      .then((answer) => {
        console.log("Response", answer);
        dispatch(saveQuestionAnswer(userId, qid, answer));
      })
      .then(() => dispatch(hideLoading()));
  };
};

export const selectQuestion = (question) => {
  return {
    type: SELECT_QUESTION,
    question,
  };
};
