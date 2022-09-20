import React, { createContext, useReducer } from 'react'
import axios from 'axios'
import { URL } from '../utils'

export const moviesType = {
  GET_NOW_MOVIES: 'GET_NOW_MOVIES',
  GET_NOW_MOVIES_PAGE: 'GET_NOW_MOVIES_PAGE',
  GET_NOW_MOVIES_MAX_PAGE: 'GET_NOW_MOVIES_MAX_PAGE',
  GET_NOW_MOVIES_LOADING: 'GET_NOW_MOVIES_LOADING',
}

export const MovieContext = createContext()

export const MovieContextProvider = ({ children }) => {
  const INITIAL_STATE = {
    nowMovies: [],
    nowMoviesPage: 0,
    nowMoviesMaxPage: 0,
    nowMoviesLoading: false,
  }

  const movieReducer = (state, action) => {
    const type = action.type

    switch (type) {
      case moviesType.GET_NOW_MOVIES:
        return {
          ...state,
          nowMovies: action.payload,
        }
      case moviesType.GET_NOW_MOVIES_PAGE:
        return {
          ...state,
          nowMoviesPage: action.payload,
        }
      case moviesType.GET_NOW_MOVIES_MAX_PAGE:
        return {
          ...state,
          nowMoviesMaxPage: action.payload,
        }
      case moviesType.GET_NOW_MOVIES_LOADING:
        return {
          ...state,
          nowMoviesLoading: action.payload,
        }
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(movieReducer, INITIAL_STATE)

  return (
    <MovieContext.Provider value={{ movieState: state, dispatch }}>
      {children}
    </MovieContext.Provider>
  )
}

export const getNowMovies = (dispatch, page) => {
  dispatch({ type: moviesType.GET_NOW_MOVIES_LOADING, payload: true })

  axios
    .get(`${URL}/movies/now?page=1`)
    .then(res => {
      const data = res.data.data
      dispatch({ type: moviesType.GET_NOW_MOVIES, payload: data.results })
      dispatch({ type: moviesType.GET_NOW_MOVIES_PAGE, payload: page + 1 })
      dispatch({
        type: moviesType.GET_NOW_MOVIES_MAX_PAGE,
        payload: data.total_pages,
      })
    })
    .catch(err => console.log('err get now movies: ', err.response))
    .finally(() =>
      dispatch({ type: moviesType.GET_NOW_MOVIES_LOADING, payload: false }),
    )
}
