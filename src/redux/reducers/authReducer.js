import {
  SET_CURRENT_USER,
  LOGIN_START,
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  LOGIN_STOP,
  SET_USER_DATA,
  GET_USER_DATA_STOP,
  GET_USER_DATA_START,
  GET_USER_DATA_ERROR,
  SIGNUP_LOADING,
  SIGNUP_SUCCESS,
  SIGNUP_STOP,
  LOGOUT_START,
  LOGOUT_ERROR,
  LOGOUT_SUCCESS,
  LOGOUT_STOP,
  UPDATE_PASSWORD_START,
  UPDATE_PASSWORD_ERROR,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_END,
  VERIFY_OTP_START,
  VERIFY_OTP_ERROR,
  VERIFY_OTP_SUCCESS,
  VERIFY_OTP_END,
  SEND_OTP_START,
  SEND_OTP_ERROR,
  SEND_OTP_SUCCESS,
  SEND_OTP_END,
  LOG_OUT_AND_CLEAR,
  SIGNUP_ERROR,
} from "../actions/types"

const initialSignUpState = {
  signUpLoading: false,
  signUpSuccess: false,
  signUpError: false,
}

const initialLogoutState = {
  logoutLoading: false,
  logoutSuccess: false,
  logoutError: false,
}

const initialSendOtpState = {
  sendOtpLoading: false,
  sendOtpSuccess: false,
  sendOtpError: false,
}
const initialVerifyOtpState = {
  verifyOtpLoading: false,
  verifyOtpSuccess: false,
  verifyOtpError: false,
}
const initialUpdateForgotPassword = {
  updatePasswordLoading: false,
  updatePasswordSuccess: false,
  updatePasswordError: false,
}
const initialState = {
  ...initialSignUpState,
  ...initialLogoutState,
  ...initialSendOtpState,
  ...initialVerifyOtpState,
  ...initialUpdateForgotPassword,
  updatedPasswordData: {},
  verifiedOtpData: {},
  otpData: {},
  isAuthenticated: false,
  LoginLoading: false,
  LoginError: false,
  LoginSuccess: false,
  GetUserDataSuccess: false,
  GetUserDataError: false,
  GetUserDataLoading: false,
  claims: {},
  fetchingUser: false, //this might be redundant
  error: {},
}

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: true,
        claims: action.payload,
      }

    case LOGIN_START:
      return {
        ...state,
        LoginLoading: true,
      }

    case LOGIN_ERROR:
      return {
        ...state,
        LoginError: true,
        LoginLoading: false,
      }

    case LOGIN_SUCCESS: {
      const { token, ...claims } = action.payload
      return {
        ...state,
        LoginSuccess: true,
        LoginLoading: false,
        isAuthenticated: true,
        claims: claims,
        token: token,
      }
    }

    case LOGIN_STOP:
      return {
        ...state,
        LoginSuccess: false,
      }

    case GET_USER_DATA_START:
      return {
        ...state,
        GetUserDataLoading: true,
        fetchingUser: true,
      }

    case GET_USER_DATA_ERROR:
      return {
        ...state,
        GetUserDataLoading: false,
        GetUserDataError: true,
        fetchingUser: false,
      }

    case SET_USER_DATA:
      return {
        ...state,
        GetUserDataLoading: false,
        GetUserDataSuccess: true,
        isAuthenticated: true,
        claims: action.payload,
        fetchingUser: false,
      }

    case GET_USER_DATA_STOP:
      return {
        ...state,
        GetUserDataSuccess: false,
      }

    case SIGNUP_LOADING:
      return {
        ...state,
        signUpLoading: true,
      }

    case SIGNUP_ERROR:
      return {
        ...state,
        ...initialSignUp3State,
        signUpError: true,
      }

    case SIGNUP_SUCCESS:
      return {
        ...state,
        ...initialSignUp3State,
        signUpSuccess: true,
      }

    case SIGNUP_STOP:
      return {
        ...state,
        ...initialSignUpState,
      }

    // Log user out
    case LOGOUT_START:
      return {
        ...state,
        logoutLoading: true,
      }

    case LOGOUT_ERROR:
      return {
        ...state,
        ...initialLogoutState,
        logoutError: true,
      }

    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
      }

    case LOGOUT_STOP:
      return {
        ...state,
        ...initialLogoutState,
      }

    // send otp
    case SEND_OTP_START:
      return {
        ...state,
        sendOtpLoading: true,
      }

    case SEND_OTP_ERROR:
      return {
        ...state,
        ...initialSendOtpState,
        sendOtpError: true,
      }

    case SEND_OTP_SUCCESS:
      return {
        ...state,
        sendOtpSuccess: true,
        otpData: action.payload,
      }

    case SEND_OTP_END:
      return {
        ...state,
        ...initialSendOtpState,
      }
    // verify otp
    case VERIFY_OTP_START:
      return {
        ...state,
        verifyOtpLoading: true,
      }

    case VERIFY_OTP_ERROR:
      return {
        ...state,
        ...initialSendOtpState,
        verifyOtpError: true,
      }

    case VERIFY_OTP_SUCCESS:
      return {
        ...state,
        sendOtpSuccess: true,
        verifyOtpData: action.payload,
      }

    case VERIFY_OTP_END:
      return {
        ...state,
        ...initialVerifyOtpState,
      }

    //change password
    case UPDATE_PASSWORD_START:
      return {
        ...state,
        updatePasswordLoading: true,
      }

    case UPDATE_PASSWORD_ERROR:
      return {
        ...state,
        ...initialUpdateForgotPassword,
        updatePasswordError: true,
      }

    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        updatePasswordSuccess: true,
        updatedPassword: action.payload,
      }

    case UPDATE_PASSWORD_END:
      return {
        ...state,
        ...initialUpdateForgotPassword,
      }

    case LOG_OUT_AND_CLEAR:
      return {
        ...initialState,
      }

    default:
      return state
  }
}
