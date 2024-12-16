import axios from "axios";
import useAuthStore from "../store/authStore.js";

const host = "http://10.10.10.151:8080/api/v1/review";

// 상품별 리뷰
export const getReviewsByProduct  = async (page, size, pno) => {

    const { accessToken } = useAuthStore.getState(); // accessToken 가져오기

    const params = {
        page: page || 1,
        size: size || 10,
        pno: pno
    };

    const res = await axios.get(`${host}/listbyproduct`, {
        params,
        headers: {
            Authorization: accessToken ? `Bearer ${accessToken}` : "", // accessToken 추가
        }
    });
    return res.data;

}

// 고객별 리뷰
export const getReviewsByCustomer = async (page, size) => {

    try {
        const {accessToken } = useAuthStore.getState(); // accessToken 가져오기

        const params = {
            page: page || 1,
            size: size || 10
        };

        const res = await axios.get(`${host}/listbycustomer`, {
            params,
            headers: {
                Authorization: accessToken ? `Bearer ${accessToken}` : "", // accessToken 추가
            }
        });

        return res.data;
    } catch (error) {
        console.error('Error fetching product:', error.response ? error.response.data : error.message);
        throw new Error('Failed to fetch product');
    }


}

// 리뷰 등록
export const registReview = async (formData) => {

    const { accessToken } = useAuthStore.getState(); // accessToken 가져오기

    const res = await axios.post(`${host}`, formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: accessToken ? `Bearer ${accessToken}` : "", // accessToken 추가
            }
        }

        );

    return Number(res.data.result);
}

// 리뷰 삭제(soft delete)
export const deleteReview = async (reviewNum) => {

    const { accessToken } = useAuthStore.getState(); // accessToken 가져오기

    const res = await axios.put(`${host}/delete/${reviewNum}`, null,{
        headers: {
            Authorization: accessToken ? `Bearer ${accessToken}` : "", // accessToken 추가
        }
    });

    return res.data;
}