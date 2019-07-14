import {
  GET_LOGS,
  ADD_LOG,
  DELETE_LOG,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_LOG,
  SET_LOADING,
  LOGS_ERROR,
  SEARCH_LOGS
} from "./types";

//GET LOGS FROM SERVER
export const getLogs = () => async dispatch => {
  try {
    setLoading();
    const res = await fetch("/logs");
    const data = await res.json();

    dispatch({
      type: GET_LOGS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: LOGS_ERROR,
      payload: error.response.statusText
    });
  }
};

//GET LOGS FROM SERVER
export const searchLogs = text => async dispatch => {
  try {
    setLoading();
    const res = await fetch(`/logs?q=${text}`);
    const data = await res.json();

    dispatch({
      type: SEARCH_LOGS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: LOGS_ERROR,
      payload: error.response.statusText
    });
  }
};

//ADD A NEW LOG
export const addLog = log => async dispatch => {
  try {
    setLoading();
    const res = await fetch("/logs", {
      method: "POST",
      body: JSON.stringify(log),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await res.json();

    dispatch({
      type: ADD_LOG,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: LOGS_ERROR,
      payload: error.response.statusText
    });
  }
};

//DELETE LOG FROM SERVER
export const deleteLog = id => async dispatch => {
  try {
    setLoading();
    await fetch(`/logs/${id}`, {
      method: "DELETE"
    });

    dispatch({
      type: DELETE_LOG,
      payload: id
    });
  } catch (error) {
    dispatch({
      type: LOGS_ERROR,
      payload: error.response.statusText
    });
  }
};

//UPDATE LOG ON SERVER
export const updateLog = log => async dispatch => {
  try {
    setLoading();
    const res = await fetch(`/logs/${log.id}`, {
      method: "PUT",
      body: JSON.stringify(log),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const data = await res.json();
    dispatch({
      type: UPDATE_LOG,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: LOGS_ERROR,
      payload: error.response.statusText
    });
  }
};

//SET CURRENT LOG
export const setCurrent = log => {
  return {
    type: SET_CURRENT,
    payload: log
  };
};

//CLEAR CURRENT LOG
export const clearCurrent = () => {
  return {
    type: CLEAR_CURRENT
  };
};

//SET LOADING TO TRUE
export const setLoading = () => {
  return {
    type: SET_LOADING
  };
};
