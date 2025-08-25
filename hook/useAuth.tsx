/* eslint-disable @typescript-eslint/no-explicit-any */
import { useReducer } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { AUTH_ACTIONS, AUTH_API_PATHS } from '@/constants/auth';
import { PATHS } from '@/data/paths';
import { LoginFormData, signupFormData } from '@/interfaces';
import { useLocale, useTranslations } from 'next-intl';
import { useToast } from '@/lib/toast';

interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  date?: string;
  gender?: string;
  photo?: string;
  referral_code?: string;
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
      // Generate unique_id if not exists
      if (!localStorage.getItem('unique_id')) {
        localStorage.setItem('unique_id', generateUniqueId());
      }
      return {
        // user: action.payload?.user ?? null,
        user: action.payload?.user || state?.user,
        token: token,
        isLoading: false,
        error: null,
      };

    case AUTH_ACTIONS.LOGOUT:
      ['token', 'user', 'unique_id'].forEach((item) =>
        localStorage.removeItem(item)
      );
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
  const { showToast } = useToast();

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

        showToast(data?.message);
        router.replace(PATHS.OTP);
      } else {
        showToast(data?.message, 'error');
      }
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || error.message;
      dispatch({
        type: AUTH_ACTIONS.SET_ERROR,
        payload: { error: errorMsg },
      });
      showToast(authTxts('loginFailed'), 'error');
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

        showToast(data?.message);
        router.replace(PATHS.OTP);
      } else {
        showToast(data?.message, 'error');
      }
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || error.message;
      dispatch({
        type: AUTH_ACTIONS.SET_ERROR,
        payload: { error: errorMsg },
      });
      showToast(errorMsg, 'error');
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
        showToast(data?.message);
        router.replace(PATHS.HOME.link);
      } else {
        showToast(authTxts('verificationFailedCode'), 'error');
      }
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || error.message;
      dispatch({
        type: AUTH_ACTIONS.SET_ERROR,
        payload: { error: errorMsg },
      });
      showToast(errorMsg, 'error');
    } finally {
      dispatch({ type: AUTH_ACTIONS.SET_LOADING_FALSE });
    }
  };

  const logout = async () => {
    try {
      const token = state.token || localStorage.getItem('token');

      const res = await axios.post(
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
      showToast(res?.data?.message || 'تم تسجيل الخروج بنجاح');
      // router.replace(PATHS.LOGIN);
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || error.message;
      dispatch({
        type: AUTH_ACTIONS.SET_ERROR,
        payload: { error: errorMsg },
      });
      showToast(errorMsg, 'error');
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

export function generateUniqueId(length = 16) {
  const chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
