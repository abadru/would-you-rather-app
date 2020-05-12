import { hideLoading, showLoading } from "react-redux-loading";
import {
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
} from "../data/_DATA";

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

export const handleAddQuestion = (optionOneText, optionTwoText) => {
  return (dispatch, getState) => {
    const { login } = getState();

    dispatch(showLoading());

    return _saveQuestion({
      optionOneText,
      optionTwoText,
      author: login.userId,
    })
      .then((question) => dispatch(addQuestion(question)))
      .then(() => dispatch(hideLoading()));
  };
};

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

export const saveQuestionAnswer = (answer) => {
  return {
    type: SAVE_ANSWER,
    answer,
  };
};

export const handleSaveQuestionAnswer = (qid, answer) => {
  return (dispatch, getState) => {
    const { login } = getState();

    dispatch(showLoading());

    return _saveQuestionAnswer({
      qid,
      answer,
      authedUser: login.userId,
    })
      .then((answer) => dispatch(saveQuestionAnswer(answer)))
      .then(() => dispatch(hideLoading()));
  };
};

export const selectQuestion = (question) => {
  return {
    type: SELECT_QUESTION,
    question,
  };
};
