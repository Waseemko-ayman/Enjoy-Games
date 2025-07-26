/* eslint-disable @typescript-eslint/no-explicit-any */
import { useReducer } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { AUTH_ACTIONS, AUTH_API_PATHS } from '@/constants/auth';
import { PATHS } from '@/data/paths';
import { LoginFormData, signupFormData } from '@/interfaces';
import { toast } from 'react-toastify';
import { useLocale, useTranslations } from 'next-intl';

interface User {
  id: number;
  name: string;
  email: string;
  // phone?: string;
  // birthDate?: string;
  // gender?: string;
  // avatar?: string;
  created_at?: string;
  updated_at?: string;
}

interface AuthState {
  // isAuth: boolean;
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

interface Action {
  type: string;
  payload?: {
    user?: User;
    token?: string;
    error?: string;
  };
}

const initialState: AuthState = {
  user:
    typeof window !== 'undefined'
      ? JSON.parse(localStorage.getItem('user') || 'null')
      : null,
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  isLoading: false,
  error: null,
};

const reducer = (state: AuthState, action: Action): AuthState => {
  switch (action.type) {
    case AUTH_ACTIONS.SET_LOADING:
      return { ...state, isLoading: true, error: null };

    case AUTH_ACTIONS.SET_LOADING_FALSE:
      return {
        ...state,
        isLoading: false,
      };

    case AUTH_ACTIONS.CONFIRM_OTP:
      const token =
        action.payload?.token || localStorage.getItem('token') || '';
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(action?.payload?.user));
      return {
        // user: action.payload?.user ?? null,
        user: action.payload?.user || state?.user,
        token: token,
        isLoading: false,
        error: null,
      };

    case AUTH_ACTIONS.LOGOUT:
      ['token', 'user'].forEach((item) => localStorage.removeItem(item));
      return {
        user: null,
        token: null,
        isLoading: false,
        error: null,
      };

    case AUTH_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload?.error || 'حدث خطأ غير متوقع',
        isLoading: false,
      };

    default:
      return state;
  }
};

const useAuth = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();
  const authTxts = useTranslations('Auth');
  const locale = useLocale();

  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Accept-Language': locale,
    },
  };

  const login = async (body: LoginFormData) => {
    dispatch({ type: AUTH_ACTIONS.SET_LOADING });
    try {
      const { data } = await axios.post(
        `/api/${AUTH_API_PATHS.LOGIN}`,
        body,
        config
      );

      if (data?.success) {
        sessionStorage.setItem('otp_email', body.email);
        sessionStorage.setItem('otp_password', body.password);

        toast.success(data?.message, { autoClose: 3000 });
        router.replace(PATHS.OTP);
      } else {
        toast.error(data?.message, { autoClose: 4000 });
      }
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || error.message;
      dispatch({
        type: AUTH_ACTIONS.SET_ERROR,
        payload: { error: errorMsg },
      });
      toast.error(authTxts('loginFailed'), { autoClose: 4000 });
    } finally {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING_FALSE });
    }
  };

  const signup = async (body: signupFormData) => {
    dispatch({ type: AUTH_ACTIONS.SET_LOADING });
    try {
      const { data } = await axios.post(
        `/api/${AUTH_API_PATHS.SIGNUP}`,
        body,
        config
      );

      if (data?.success) {
        sessionStorage.setItem('otp_email', body.email);

        toast.success(data?.message, {
          autoClose: 3000,
        });
        router.replace(PATHS.OTP);
      } else {
        toast.error(data?.message, { autoClose: 4000 });
      }
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || error.message;
      dispatch({
        type: AUTH_ACTIONS.SET_ERROR,
        payload: { error: errorMsg },
      });
      toast.error(errorMsg, { autoClose: 4000 });
    } finally {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING_FALSE });
    }
  };

  const verifyOtp = async (email: string, otp: string) => {
    dispatch({ type: AUTH_ACTIONS.SET_LOADING });
    try {
      const { data } = await axios.post(`/api/${AUTH_API_PATHS.CONFIRM_OTP}`, {
        email,
        otp,
      });

      if (data.data?.token) {
        dispatch({
          type: AUTH_ACTIONS.CONFIRM_OTP,
          payload: data?.data,
        });

        sessionStorage.removeItem('otp_email');
        sessionStorage.removeItem('otp_password');
        toast.success(data?.message);
        router.replace(PATHS.HOME.link);
      } else {
        toast.error(authTxts('verificationFailedCode'));
      }
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || error.message;
      dispatch({
        type: AUTH_ACTIONS.SET_ERROR,
        payload: { error: errorMsg },
      });
      toast.error(errorMsg);
    } finally {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING_FALSE });
    }
  };

  const logout = async () => {
    try {
      const token = state.token || localStorage.getItem('token');

      await axios.post(
        `/api/${AUTH_API_PATHS.LOGOUT}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Accept-Language': locale,
          },
        }
      );
      dispatch({ type: AUTH_ACTIONS.LOGOUT });
      toast.success('تم تسجيل الخروج بنجاح');
      router.replace(PATHS.LOGIN);
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || error.message;
      dispatch({
        type: AUTH_ACTIONS.SET_ERROR,
        payload: { error: errorMsg },
      });
      toast.error(errorMsg);
    } finally {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING_FALSE });
    }
  };

  return {
    ...state,
    login,
    signup,
    verifyOtp,
    logout,
  };
};

export default useAuth;
