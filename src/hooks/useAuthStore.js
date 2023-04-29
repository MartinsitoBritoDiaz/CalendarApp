import { useDispatch, useSelector } from "react-redux";
import { calendarAPI } from "../api";
import { clearErrorMessage, onChecking, onLogin, onLogout, onLogoutCalendar } from "../store";

export const useAuthStore = () => {
  const { status, user, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const startLogin = async ({email, password}) => {
    dispatch( onChecking() );
    try {
        const {data} = await calendarAPI.post('/auth', {email,password});   
        localStorage.setItem('token', data.token );
        localStorage.setItem('token-init-date', new Date().getTime() );
        dispatch( onLogin({name: data.name, uid: data.uid }) );
    } catch (error) {
        dispatch( onLogout('Wrong credentials') );
        setTimeout(() => {
            dispatch( clearErrorMessage() );
        }, 10);
    }
  };

  const startCreatingUser = async ({name, email, password}) => {
    dispatch( onChecking() );

    try {
        const {data} = await calendarAPI.post('/auth/new', {name,email,password});
        localStorage.setItem('token', data.token );
        localStorage.setItem('token-init-date', new Date().getTime() );
        dispatch( onLogin({name: data.name, uid: data.uid }) );
    } catch (error) {
        dispatch( onLogout(error.response.data?.msg || '---') );
        setTimeout(() => {
            dispatch( clearErrorMessage() );
        }, 10);
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem('token');
    if(!token) return dispatch(onLogout());
    try {
        const {data} = await calendarAPI.get('/auth/renew');   
        localStorage.setItem('token', data.token );
        localStorage.setItem('token-init-date', new Date().getTime() );
        dispatch( onLogin({name: data.name, uid: data.uid }) );
    } catch (error) {
        localStorage.clear();
        dispatch( onLogout(error.response.data?.msg || '---') );
    }
  }

  const startLogOut = async () => {
    localStorage.clear();
    dispatch( onLogoutCalendar() );
    dispatch( onLogout() );
  };

  return {
    // Properties
    status,
    user,
    errorMessage,

    //Methods
    startLogin,
    startCreatingUser,
    checkAuthToken,
    startLogOut,
  };
};
