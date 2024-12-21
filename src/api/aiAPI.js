import axios from 'axios';
import useAuthStore from "../store/authStore.js";

const host = 'http://10.10.10.152:8080/api/v1/ai'

export const getSolution = async(img, question) =>{

    console.log("img의 타입:", typeof img); // object가 나올 수 있음
    console.log("img가 File인지 확인:", img instanceof File); // true여야 함
    console.log("img가 Blob인지 확인:", img instanceof Blob); // true여야 함

    const formData = new FormData();
    formData.append('imageFile', img);
    formData.append('customerText', question);

    console.log("getSolution Start!!")

    try {
        const { accessToken } = useAuthStore.getState();
        console.log("accessToken ; "+accessToken)

        console.log(`${host}/solution`)

        const res = await axios.post(`${host}/solution`,formData,{
            headers: {
                Authorization: accessToken ? `Bearer ${accessToken}` : "", // accessToken 추가
            },
        });

        console.log(res)

        return res.data;

    } catch (error) {
        console.log(error)
        console.error('Error fetching cart list:', error);
        throw error; // 필요 시 에러를 다시 던집니다.
    }

}