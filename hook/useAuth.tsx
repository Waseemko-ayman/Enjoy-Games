/* eslint-disable @typescript-eslint/no-explicit-any */
import { useReducer } from 'react';
import { ROLES } from '@/constants';
import axios from 'axios';
import { AUTH_ACTIONS, AUTH_API_PATHS } from '@/constants/auth';
import { useRouter } from 'next/navigation';
import { PATHS } from '@/data/paths';
import { AUTH_API_URL } from '@/config/api';
import Swal from 'sweetalert2';
import { LoginFormData, signupFormData } from '@/interfaces';

interface User {
  id?: string;
  name?: string;
  email?: string;
  isAdmin?: boolean;
  // أضف حقول أخرى حسب الحاجة
}

interface AuthState {
  isAuth: boolean;
  user: User | null;
  token: string | null;
  role: string;
  isLoading: boolean;
  error: string | null;
}

interface Action {
  type: string;
  payload?: any;
}

const initialState: AuthState = {
  isAuth: false,
  user: null,
  token: null,
  role: ROLES.GUEST,
  isLoading: false,
  error: null,
};

const reduce = (state: AuthState, action: Action): AuthState => {
  switch (action.type) {
    case AUTH_ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: true,
      };

    case AUTH_ACTIONS.AUTHORIZE:
      const role = action.payload?.isAdmin ? ROLES.ADMIN : ROLES.USER;
      return {
        isAuth: true,
        user: action.payload?.user || state.user,
        token: null, // Token managed in cookies, not in state
        role,
        error: null,
        isLoading: false,
      };

    case AUTH_ACTIONS.LOGOUT:
      return {
        isAuth: false,
        user: null,
        token: null,
        role: ROLES.GUEST,
        isLoading: false,
        error: null,
      };

    case AUTH_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    default:
      return state;
  }
};

const useAuth = () => {
  const [state, dispatch] = useReducer(reduce, initialState);
  const router = useRouter();

  // تسجيل الدخول عبر استدعاء api/auth/login
  const login = async (body: LoginFormData) => {
    dispatch({ type: AUTH_ACTIONS.SET_LOADING });
    try {
      // 1. استدعاء API الباك إند الخارجي للحصول على التوكن
      const { data } = await axios.post(
        `${AUTH_API_URL}${AUTH_API_PATHS.LOGIN}`,
        body
      );
      const token = data.token; // نفترض أن التوكن بهذا الشكل

      // 2. استدعاء API داخلي لحفظ التوكن في الكوكيز
      await axios.post('/api/auth/login', { token });

      dispatch({ type: AUTH_ACTIONS.AUTHORIZE, payload: data.user || body });

      Swal.fire({
        icon: 'success',
        title: 'Logged in Successfully',
        showConfirmButton: false,
        timer: 2000,
      });

      router.replace(PATHS.HOME.link);
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'The data is incorrect!',
        showConfirmButton: false,
        timer: 2000,
      });
      dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: error.message });
    }
  };

  // تسجيل حساب جديد عبر استدعاء api/auth/signup (ممكن تضيف الـ API الخاص بك)
  const signup = async (body: signupFormData) => {
    dispatch({ type: AUTH_ACTIONS.SET_LOADING });
    try {
      // 1. تسجيل المستخدم عبر API الباك إند الخارجي
      const { data } = await axios.post(
        `${AUTH_API_URL}${AUTH_API_PATHS.SIGNUP}`,
        body
      );

      const token = data.token;

      // 2. إرسال التوكن لحفظه في الكوكيز عبر API داخلي
      await axios.post('/api/auth/login', { token });

      dispatch({ type: AUTH_ACTIONS.AUTHORIZE, payload: data.user || body });

      Swal.fire({
        icon: 'success',
        title: 'Registered Successfully',
        showConfirmButton: false,
        timer: 2000,
      });

      router.replace(PATHS.LOGIN);
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Registration failed!',
        showConfirmButton: false,
        timer: 2000,
      });
      dispatch({ type: AUTH_ACTIONS.SET_ERROR, payload: error.message });
    }
  };

  // تسجيل خروج عبر استدعاء api/auth/logout
  const logout = async () => {
    try {
      await axios.post('/api/auth/logout');
      dispatch({ type: AUTH_ACTIONS.LOGOUT });
      router.replace(PATHS.LOGIN);
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Error logging out',
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  return {
    ...state,
    login,
    signup,
    logout,
  };
};

export default useAuth;
