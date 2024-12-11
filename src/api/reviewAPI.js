import axios from "axios";
import useAuthStore from "../store/authStore.js";

const host = "http://localhost:8080/api/v1/review";

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