import axios from "axios";

// const host = "/api/auth";
const host = "http://localhost:8080/api/auth";

// 카카오 로그인
export const kakaoLogin = async (code) => {
    const response = await axios.post(`${host}/kakao`, { code });
    console.log(response.data);
    return response.data; // { accessToken, refreshToken, status, kakaoUser }
};

// 회원가입
export const registerUser = async (userData) => {
    const response = await axios.post(`${host}/register`, userData);
    console.log(response.data);
    return response.data; // { accessToken, refreshToken }
};
////////asdfsdfsdfsdfs