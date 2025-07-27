/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosRequestConfig } from 'axios';
import { useReducer } from 'react';

interface State<T> {
  data: T | T[]; // يمكن أن يكون كائن أو مصفوفة
  product: T | null;
  isLoading: boolean;
  error: any;
  message: string;
}

interface Action<T> {
  type: string;
  payload?: any;
}

const API_ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  GET: 'GET',
  GET_SINGLE: 'GET_SINGLE',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  ERROR: 'ERROR',
} as const;

const initialState: State<any> = {
  data: [],
  product: null,
  isLoading: false,
  error: null,
  message: '',
};

const reduce = <T,>(state: State<T>, action: Action<T>): State<T> => {
  switch (action.type) {
    case API_ACTIONS.SET_LOADING:
      return { ...state, isLoading: true, error: null, message: '' };
    case API_ACTIONS.GET:
      return { ...state, isLoading: false, data: action.payload };
    case API_ACTIONS.GET_SINGLE:
      return { ...state, isLoading: false, product: action.payload };
    case API_ACTIONS.POST:
      return {
        ...state,
        isLoading: false,
        data: Array.isArray(state.data)
          ? [...state.data, action.payload]
          : state.data,
        message: 'Added successfully',
      };
    case API_ACTIONS.PUT:
      return {
        ...state,
        isLoading: false,
        data: Array.isArray(state.data)
          ? state.data.map((item) =>
              (item as any).id === (action.payload as any).id
                ? action.payload
                : item
            )
          : state.data,
        message: 'Updated successfully',
      };
    case API_ACTIONS.DELETE:
      return {
        ...state,
        isLoading: false,
        data: Array.isArray(state.data)
          ? state.data.filter((item) => (item as any).id !== action.payload)
          : state.data,
        message: 'Deleted successfully',
      };
    case API_ACTIONS.ERROR:
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

const useAPI = <T,>(
  url: string,
  config?: AxiosRequestConfig,
  isSingleObject = false // ← الإضافة الجديدة هنا
) => {
  const [state, dispatch] = useReducer(reduce<T>, initialState);

  const get = async (getConfig?: AxiosRequestConfig) => {
    try {
      dispatch({ type: API_ACTIONS.SET_LOADING });
      const res = await axios.get<{ data: T | T[] }>(`/api/${url}`, {
        ...config,
        ...getConfig,
      });
      dispatch({ type: API_ACTIONS.GET, payload: res?.data?.data });
    } catch (error) {
      dispatch({ type: API_ACTIONS.ERROR, payload: error });
    }
  };

  const getSingle = async (
    id: string | number,
    getConfig?: AxiosRequestConfig
  ) => {
    try {
      dispatch({ type: API_ACTIONS.SET_LOADING });
      const res = await axios.get<{ data: T }>(`/api/${url}/${id}`, {
        ...config,
        ...getConfig,
      });
      dispatch({ type: API_ACTIONS.GET_SINGLE, payload: res?.data?.data });
    } catch (error) {
      dispatch({ type: API_ACTIONS.ERROR, payload: error });
    }
  };

  const add = async (body: T, postConfig?: AxiosRequestConfig) => {
    try {
      dispatch({ type: API_ACTIONS.SET_LOADING });
      const res = await axios.post<{ data: T }>(`/api/${url}`, body, {
        ...config,
        ...postConfig,
      });
      dispatch({ type: API_ACTIONS.POST, payload: res?.data?.data });
    } catch (error) {
      dispatch({ type: API_ACTIONS.ERROR, payload: error });
    }
  };

  const edit = async (
    id: string | number,
    body: Partial<T>,
    putConfig?: AxiosRequestConfig
  ) => {
    try {
      dispatch({ type: API_ACTIONS.SET_LOADING });
      const res = await axios.put<{ data: T }>(`/api/${url}/${id}`, body, {
        ...config,
        ...putConfig,
      });
      dispatch({ type: API_ACTIONS.PUT, payload: res?.data?.data });
    } catch (error) {
      dispatch({ type: API_ACTIONS.ERROR, payload: error });
    }
  };

  const remove = async (
    id: string | number,
    deleteConfig?: AxiosRequestConfig
  ) => {
    try {
      dispatch({ type: API_ACTIONS.SET_LOADING });
      await axios.delete(`/api/${url}/${id}`, { ...config, ...deleteConfig });
      dispatch({ type: API_ACTIONS.DELETE, payload: id });
    } catch (error) {
      dispatch({ type: API_ACTIONS.ERROR, payload: error });
    }
  };

  return { ...state, get, getSingle, add, edit, remove };
};

export default useAPI;
