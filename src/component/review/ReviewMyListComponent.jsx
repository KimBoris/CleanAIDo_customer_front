import {deleteReview, getReviewsByCustomer} from "../../api/reviewAPI.js";
import {useEffect, useState} from "react";
import ModalComponent from "../common/ModalComponent.jsx";

function ReviewMyListComponent() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModal, setIsModal] = useState(false);

    const fetchReviewList = async () => {
        setLoading(true);
        await getReviewsByCustomer(1, 10).then((res) => {
            console.log(res);
            setReviews(res.dtoList);
            setLoading(false);
        })
    }

    const handleCLickDelete = async (reviewNum) => {
        await deleteReview(reviewNum).then((res) => {
            console.log(res);
            setIsModal(true);
            fetchReviewList();
        })
    }

    const closeModal = () => setIsModal(false);

    useEffect(() => {
        fetchReviewList();
    }, []);

    // 리뷰 이미지
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
        <div>
            {loading && <div>Loading...</div>}
            <div className="bg-bara_gray_1 text-bara_sodomy pt-[9rem] pb-40">
                {reviews.map((review) => (
                    <div key={review.reviewNumber} className="bg-white px-8 py-8 mt-4">
                        <div className="flex">
                            <div
                                className="bg-bara_light_blue rounded-[50%] w-12 h-12 mb-4 mr-2 overflow-hidden flex-shrink-0 flex">
                                {review.customerProfileImg == null ?
                                    <img src="/images/customer_profile.png" className="object-cover w-full h-full" />
                                    :
                                    // 변수 앞 경로 추가 필요함
                                    <img src={`${review.customerProfileImg}`} className="object-cover w-full h-full" />
                                }
                            </div>
                            <div className="flex justify-between w-full">
                                <div>
                                    <span className="text-bara_sodomy">{review.customerName}</span>
                                    <div className="flex">
                                        <img src={`/images/star_${review.score}.svg`} />
                                        <span className="text-bara_gray_4 text-[0.875rem] ml-1">
                                    {review.createDate.split("T")[0]}
                                </span>
                                    </div>
                                </div>
                                <div onClick={() => handleCLickDelete(review.reviewNumber)}>
                                    <img src="/images/close.svg" className="w-[0.9rem]" />
                                </div>
                            </div>

                        </div>
                        <div className="mb-4">{reviewImages(review.fileNames)}</div>
                        <p className="text-[0.875rem] text-bara_gray_5">{review.reviewContent}</p>
                    </div>
                ))}
            </div>
            {isModal && <ModalComponent title="삭제 완료" onClose={closeModal}></ModalComponent>}
        </div>
    );
}

export default ReviewMyListComponent;