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
        })
    }, []);
    if (loading) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;

    /*

    .reviewNumber(r.getReviewNumber())
                        .reviewContent(r.getReviewContent())
                        .createDate(r.getCreateDate())
                        .score(r.getScore())
                        .customerName(r.getCustomer().getCustomerName())
                        .fileNames(r.getReviewImages().stream()
                                .map(image -> image.getFileName())
                                .collect(Collectors.toList()))
     */

    const reviewImages = (images) => {
        if (!images || images.length === 0) {
            return <div></div>;
        }

        return (
            <div
                style={{
                    display: 'flex',
                    gap: '0.5rem',
                    overflowX: 'auto',
                    whiteSpace: 'nowrap',
                }}
            >
                {images.map((image, i) => (
                    <div key={i} style={{flexShrink: 0, width: '5rem', height: '5rem', backgroundColor: '#B5BCD2'}}>
                        <img src={image} alt={`Review ${i}`}
                             style={{width: '100%', height: '100%', objectFit: 'cover'}}/>
                    </div>
                ))}
            </div>

        );
    };

    return (
        <>
            {reviews.map((review) => (
                <div key={review.reviewNumber}>
                    <div className="flex">
                        <div className="bg-bara_light_blue rounded-[50%] w-12 h-12 mb-4 mr-2"></div>
                        <div>
                            <span className="text-bara_sodomy">{review.customerName}</span>
                            <div className="flex">
                            <img src={`/images/star_${review.score}.svg`}/>
                                <span className="text-bara_gray_4 text-[0.875rem] ml-1">
                                    {review.createDate.split("T")[0]}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">{reviewImages(review.fileNames)}</div>
                    <p className="text-[0.875rem] text-bara_gray_5">{review.reviewContent}</p>
                    <hr className="border-bara_gray_2 my-4" />
                </div>
            ))}
        </>
    );
}

export default ReviewByProductComponent;