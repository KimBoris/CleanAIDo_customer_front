import axios from "axios";
import useAuthStore from "../store/authStore.js";

const host = "api/v1/product";

export const getProductList = async (page, size, keyword = '') => {
    try {
        const { accessToken } = useAuthStore.getState(); // accessToken 가져오기
        const params = {
            page: page || 1,
            size: size || 10,
            ...(keyword && {keyword}),
        };

        const res = await axios.get(`${host}/list`, {
            params,
            headers: {
                Authorization: accessToken ? `Bearer ${accessToken}` : "", // accessToken 추가
            },
        });

        console.log("====================");
        console.log("Params"+params.page, params.size, params.keyword);

        console.log("Data:", res.data)
        return res.data;
    } catch(error) {
        console.error("Failed to fetch product list:", error);
        throw new Error('Failed to fetch product list');
    }
}


export const getProductOne = async (pno) => {
    const { accessToken } = useAuthStore.getState();
    console.log(axios.get(`${host}/read/${pno}`));
    try {
        const response = await axios.get(`${host}/read/${pno}`,{
            headers: {
                Authorization: accessToken ? `Bearer ${accessToken}` : "", // accessToken 추가
            },
        });
        console.log("=========getProductOne=========")
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('Error fetching product:', error.response ? error.response.data : error.message);
        throw new Error('Failed to fetch product');
    }
};

export const addCart = async (pno, qty) => {
    const { accessToken } = useAuthStore.getState();
    const formData = new FormData();
    formData.append('pno', pno);
    formData.append('qty', qty);

    const res = await axios.post(`${host}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: accessToken ? `Bearer ${accessToken}` : "", // accessToken 추가
        },
    });
    return res.data;
};

// 랜덤으로 가져오는 추천상품
export const getProductSuggestList = async () => {
    const { accessToken } = useAuthStore.getState();
    try {

        const res = await axios.get(`${host}/suggest`, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: accessToken ? `Bearer ${accessToken}` : "", // accessToken 추가
            },
        });

        return res;

    } catch (error) {

        console.error("추천상품 호출 실패", error.response?.data || error.message);
        throw error;

    }
}