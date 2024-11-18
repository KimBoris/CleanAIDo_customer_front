import axios from "axios";

const host = "http://localhost:8080/api/v1/review";

export const getReviewsByProduct  = async (page, size, pno) => {

    const params = {
        page: page || 1,
        size: size || 10,
        pno: pno
    };

    const res = await axios.get(`${host}/listbyproduct`, {params});
    return res.data;

}