/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { AxiosRequestConfig } from 'axios';
import { useCallback, useReducer } from 'react';
import axiosInstance from '@/utils/axiosInstance';

interface State<T> {
  data: T | T[];
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

const useAPI = <
  RequestBody = unknown,
  ResponseData extends Record<string, unknown> = Record<string, unknown>
>(
  url: string,
  config?: AxiosRequestConfig
) => {
  const [state, dispatch] = useReducer(reduce<ResponseData>, initialState);

  const get = useCallback(
    async (getConfig?: AxiosRequestConfig) => {
      try {
        dispatch({ type: API_ACTIONS.SET_LOADING });
        const res = await axiosInstance.get<{
          data: ResponseData | ResponseData[];
        }>(`/${url}`, {
          ...config,
          ...getConfig,
        });
        dispatch({ type: API_ACTIONS.GET, payload: res?.data?.data });
        return res?.data?.data;
      } catch (error) {
        dispatch({ type: API_ACTIONS.ERROR, payload: error });
      }
    },
    [url, config]
  );

  const getSingle = async (
    id: string | number,
    getConfig?: AxiosRequestConfig
  ) => {
    try {
      dispatch({ type: API_ACTIONS.SET_LOADING });
      const res = await axiosInstance.get<{ data: ResponseData }>(
        `/${url}/${id}`,
        {
          ...config,
          ...getConfig,
        }
      );
      dispatch({ type: API_ACTIONS.GET_SINGLE, payload: res.data.data });
      return res.data;
    } catch (error) {
      dispatch({ type: API_ACTIONS.ERROR, payload: error });
    }
  };

  const add = async (body: RequestBody, postConfig?: AxiosRequestConfig) => {
    try {
      dispatch({ type: API_ACTIONS.SET_LOADING });
      const res = await axiosInstance.post<{
        success: boolean;
        message: string;
        data: ResponseData;
      }>(`/${url}`, body, {
        ...config,
        ...postConfig,
      });
      dispatch({ type: API_ACTIONS.POST, payload: res?.data?.data });
      return res.data;
    } catch (error) {
      dispatch({ type: API_ACTIONS.ERROR, payload: error });
      throw error;
    }
  };

  const edit = async (
    id: string | number,
    body: Partial<RequestBody>,
    putConfig?: AxiosRequestConfig
  ) => {
    try {
      dispatch({ type: API_ACTIONS.SET_LOADING });
      const res = await axiosInstance.post<{ data: ResponseData }>(
        `/${url}/${id}`,
        body,
        {
          ...config,
          ...putConfig,
        }
      );
      dispatch({ type: API_ACTIONS.PUT, payload: res.data.data });
      return res.data;
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
      const res = await axiosInstance.get<{ message?: string }>(
        `/${url}/${id}`,
        {
          ...config,
          ...deleteConfig,
        }
      );
      dispatch({ type: API_ACTIONS.DELETE, payload: id });
      return res.data;
    } catch (error) {
      dispatch({ type: API_ACTIONS.ERROR, payload: error });
      throw error;
    }
  };

  return { ...state, get, getSingle, add, edit, remove };
};

export default useAPI;

// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { AxiosRequestConfig } from 'axios';
// import { useCallback, useReducer } from 'react';
// import axiosInstance from '@/utils/axiosInstance';

// interface State<T> {
//   data: T | T[];
//   product: T | null;
//   isLoading: boolean;
//   error: any;
//   message: string;
// }

// interface Action<T> {
//   type: string;
//   payload?: any;
// }

// const API_ACTIONS = {
//   SET_LOADING: 'SET_LOADING',
//   GET: 'GET',
//   GET_SINGLE: 'GET_SINGLE',
//   POST: 'POST',
//   PUT: 'PUT',
//   DELETE: 'DELETE',
//   ERROR: 'ERROR',
// } as const;

// const initialState: State<any> = {
//   data: [],
//   product: null,
//   isLoading: false,
//   error: null,
//   message: '',
// };

// const reduce = <T,>(state: State<T>, action: Action<T>): State<T> => {
//   switch (action.type) {
//     case API_ACTIONS.SET_LOADING:
//       return { ...state, isLoading: true, error: null, message: '' };
//     case API_ACTIONS.GET:
//       return { ...state, isLoading: false, data: action.payload };
//     case API_ACTIONS.GET_SINGLE:
//       return { ...state, isLoading: false, product: action.payload };
//     case API_ACTIONS.POST:
//       return {
//         ...state,
//         isLoading: false,
//         data: Array.isArray(state.data)
//           ? [...state.data, action.payload]
//           : state.data,
//         message: 'Added successfully',
//       };
//     case API_ACTIONS.PUT:
//       return {
//         ...state,
//         isLoading: false,
//         data: Array.isArray(state.data)
//           ? state.data.map((item) =>
//               (item as any).id === (action.payload as any).id
//                 ? action.payload
//                 : item
//             )
//           : state.data,
//         message: 'Updated successfully',
//       };
//     case API_ACTIONS.DELETE:
//       return {
//         ...state,
//         isLoading: false,
//         data: Array.isArray(state.data)
//           ? state.data.filter((item) => (item as any).id !== action.payload)
//           : state.data,
//         message: 'Deleted successfully',
//       };
//     case API_ACTIONS.ERROR:
//       return { ...state, isLoading: false, error: action.payload };
//     default:
//       return state;
//   }
// };

// const useAPI = <
//   RequestBody extends Record<string, unknown> = Record<string, unknown>,
//   ResponseData extends Record<string, unknown> = Record<string, unknown>
// >(
//   url: string,
//   config?: AxiosRequestConfig
// ) => {
//   const [state, dispatch] = useReducer(reduce<ResponseData>, initialState);

//   const get = useCallback(
//     async (getConfig?: AxiosRequestConfig) => {
//       try {
//         dispatch({ type: API_ACTIONS.SET_LOADING });
//         const res = await axiosInstance.get<{
//           data: ResponseData | ResponseData[];
//         }>(`/${url}`, {
//           ...config,
//           ...getConfig,
//         });
//         dispatch({ type: API_ACTIONS.GET, payload: res?.data?.data });
//         return res?.data?.data;
//       } catch (error) {
//         dispatch({ type: API_ACTIONS.ERROR, payload: error });
//       }
//     },
//     [url, config]
//   );

//   const getSingle = async (
//     id: string | number,
//     getConfig?: AxiosRequestConfig
//   ) => {
//     try {
//       dispatch({ type: API_ACTIONS.SET_LOADING });
//       const res = await axiosInstance.get<{ data: ResponseData }>(
//         `/${url}/${id}`,
//         {
//           ...config,
//           ...getConfig,
//         }
//       );
//       dispatch({ type: API_ACTIONS.GET_SINGLE, payload: res.data.data });
//       return res.data.data;
//     } catch (error) {
//       dispatch({ type: API_ACTIONS.ERROR, payload: error });
//     }
//   };

//   const add = async (body: RequestBody, postConfig?: AxiosRequestConfig) => {
//     try {
//       dispatch({ type: API_ACTIONS.SET_LOADING });
//       const res = await axiosInstance.post<{
//         success: boolean;
//         message: string;
//         data: ResponseData;
//       }>(`/${url}`, body, {
//         ...config,
//         ...postConfig,
//       });
//       dispatch({ type: API_ACTIONS.POST, payload: res?.data?.data });
//       return res.data;
//     } catch (error) {
//       dispatch({ type: API_ACTIONS.ERROR, payload: error });
//       throw error;
//     }
//   };

//   const edit = async (
//     id: string | number,
//     body: Partial<RequestBody>,
//     putConfig?: AxiosRequestConfig
//   ) => {
//     try {
//       dispatch({ type: API_ACTIONS.SET_LOADING });
//       const res = await axiosInstance.put<{ data: ResponseData }>(
//         `/${url}/${id}`,
//         body,
//         {
//           ...config,
//           ...putConfig,
//         }
//       );
//       dispatch({ type: API_ACTIONS.PUT, payload: res.data.data });
//       return res.data.data;
//     } catch (error) {
//       dispatch({ type: API_ACTIONS.ERROR, payload: error });
//     }
//   };

//   const remove = async (
//     id: string | number,
//     deleteConfig?: AxiosRequestConfig
//   ) => {
//     try {
//       dispatch({ type: API_ACTIONS.SET_LOADING });
//       await axiosInstance.delete(`/${url}/${id}`, {
//         ...config,
//         ...deleteConfig,
//       });
//       dispatch({ type: API_ACTIONS.DELETE, payload: id });
//     } catch (error) {
//       dispatch({ type: API_ACTIONS.ERROR, payload: error });
//     }
//   };

//   return { ...state, get, getSingle, add, edit, remove };
// };

// export default useAPI;
