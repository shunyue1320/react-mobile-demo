

export interface RegisterPayload {
  username: string;
  password: string;
  confirmPassword: string;
  email: string
}

//注册时向服务器端传递的请求体类型
export interface User {
  username: string;
  password: string;
  email: string;
  avatar?: string;
}

//登录时向服务器传递的请求体类型
export interface LoginPayload {
  username: string;
  password: string;
}

//服务器在注册时返回的结果类型
export interface RegisterResult {
  success: boolean,
  data?: { token: string },
  message?: string;
  errors?: any
}

//服务器在登录时返回的结果类型
export interface LoginResult {
  success: boolean,
  data?: { token: string },
  message?: string;
  errors?: any
}