import axios from "axios";
import {data} from "autoprefixer";

const host = "http://localhost:8080/api/v1/product";

export const getProductList = async (page, size, keyword = '') => {
    try {
        const params = {
            page: page || 1,
            size: size || 10,
            ...(keyword && {keyword}),
        };

        console.log("====================");
        console.log("Params"+params.page, params.size, params.keyword);


        const res = await axios.get(`${host}/list`, {params});
        console.log("Data:", res.data)
        return res.data;
    } catch(error) {
        console.error("Failed to fetch product list:", error);
        throw new Error('Failed to fetch product list');
    }
}


export const getProductOne = async (pno) => {
    try {
        const response = await axios.get(`${host}/read/${pno}`);
        console.log("==================")
        console.log(response.data)
        return response.data;
    } catch (err) {
        console.error('Error fetching product:', err);
        throw new Error('Failed to fetch product');
    }
};

export const addCart = async (pno) => {
    const formData = new FormData();
    formData.append('pno', pno);

    const res = await axios.post(`${host}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return res.data;
};