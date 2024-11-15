import {useEffect, useState} from "react";
import {getReviewsByProduct} from "../../api/reviewAPI.js";


function ReviewByProductComponent({pno}) {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getReviewsByProduct(1, 10, pno).then(data => {
            setReviews(data.dtoList);
            setLoading(false);
            console.log(reviews);
        })
    }, []);
    if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;

    return (
        <>
            {reviews.map((review) => (
                <div key={review.reviewNumber} >
                    <p>{review.reviewContent}</p>
                </div>
            ))}
        </>
    );
}

export default ReviewByProductComponent;