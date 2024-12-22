import axios from 'axios';
import useAuthStore from "../store/authStore.js";
import {jwtDecode} from "jwt-decode";


const host = '/api/v1/board';


export const getAuthHeaders = () => {
    const {accessToken} = useAuthStore.getState(); // accessToken 가져오기
    console.log(accessToken);
    return {
        Authorization: accessToken ? `Bearer ${accessToken}` : "",
    };
};
export const getBoardList = async (page = 1, size = 10) => {
    try {
        const params = {page, size};
        const response = await axios.get(`${host}/list`, {
            params,
            headers: getAuthHeaders(), // 동기적으로 헤더 전달
        });

        console.log("================");
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("게시물 목록 가져오기 실패:", error);
        throw error;
    }
};

export const registerBoard = async (formData) => {
    try {
        const response = await axios.post(`${host}/register`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                ...getAuthHeaders(), // 인증 헤더 추가
            },
        });
        return response.data;
    } catch (error) {
        console.error('게시물 생성 실패:', error);
        throw error;
    }
};


export const updateBoard = async (bno, formData) => {
    console.log("Sending board data:", formData);
    try {
        const response = await axios.put(`${host}/edit/${bno}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                ...getAuthHeaders(), // 인증 헤더 추가
            },
        });
        console.log("boardData = "+ formData.data);
        return response.data;
    } catch (error) {
        console.error("게시물 수정 실패:", error);
        throw error;
    }
};
// export const updateBoard = async (bno, formData) => {
//     try {
//         const response = await axios.put(`/api/boards/${bno}`, formData, {
//             headers: {
//                 'Content-Type': 'multipart/form-data',
//             },
//         });
//         return response.data;
//     } catch (error) {
//         console.error('게시물 수정 실패', error);
//         throw error;
//     }
// };


export const readBoard = async (bno) => {
    try {
        const response = await axios.get(`${host}/${bno}`, {
            headers: getAuthHeaders(),  // 인증 헤더
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("게시물 읽기 실패:", error);
        throw error;
    }
};

export const deleteBoard = async (bno) => {
    try {
        await axios.put(`${host}/delete/${bno}`, {
            headers: getAuthHeaders(),
        });
    } catch (error) {
        console.error("게시물 삭제 실패:", error);
        throw error;
    }
};
