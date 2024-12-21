import axios from "axios";
import useAuthStore from "../store/authStore.js";

const host = "http:/localhost:8080/api/v1/category";

// 1차 카테고리 목록을 가져오는 함수
export const getCategoryList = async () => {

    try {
        const {accessToken} = useAuthStore.getState();
        const res = await axios.get(`${host}/list`,
            {
                Authorization: accessToken ? `Bearer ${accessToken}` : "",
            });

        return res.data || [];
    } catch (error) {
        console.error("Failed to fetch category list:", error);
        throw new Error('Failed to fetch category list');
    }
};

// // 2차 카테고리 목록을 가져오는 함수
// export const getSubCategoryList = async (categoryId) => {
//     try {
//         const res = await axios.get(`${host}/${categoryId}/subcategories`);
//         return res.data?.dtoList || [];
//     } catch (error) {
//         console.error("Failed to fetch subcategory list:", error);
//         throw new Error('Failed to fetch subcategory list');
//     }
// };
