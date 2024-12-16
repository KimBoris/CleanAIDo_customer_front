import { deleteReview, getReviewsByCustomer } from "../../api/reviewAPI.js";
import { useEffect, useState } from "react";
import ModalComponent from "../common/ModalComponent.jsx";
import { useInView } from "react-intersection-observer";

function ReviewMyListComponent() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModal, setIsModal] = useState(false);
    const [page, setPage] = useState(1); // 현재 페이지 번호
    const [hasMore, setHasMore] = useState(true); // 더 가져올 데이터 여부

    // 무한 스크롤링
    const { ref, inView } = useInView({
        threshold: 0,
    });

    // 리뷰 목록 가져오기
    const fetchReviewList = async (currentPage) => {
        if (!hasMore) return; // 더 가져올 데이터가 없으면 종료
        setLoading(true);
        await getReviewsByCustomer(currentPage, 10).then((res) => {
            console.log(res);

            // 더 가져올 데이터가 없는 경우 hasMore를 false로 설정
            if (res.dtoList.length < 10) {
                setHasMore(false);
            }

            // 기존 리뷰 목록에 새로운 데이터 추가
            setReviews((prevReviews) => [...prevReviews, ...res.dtoList]);
            setLoading(false);
        });
    };

    // 리뷰 삭제
    const handleCLickDelete = async (reviewNum) => {
        await deleteReview(reviewNum).then((res) => {
            console.log(res);
            setIsModal(true);
            // 삭제 후 리뷰 목록 초기화 및 재로드
            setReviews([]);
            setPage(1);
            setHasMore(true);
            fetchReviewList(1);
        });
    };

    // 모달 닫기
    const closeModal = () => setIsModal(false);

    // 페이지 변경 시 데이터 로드
    useEffect(() => {
        if (inView && hasMore && !loading) {
            setPage((prevPage) => prevPage + 1);
        }
    }, [inView]);

    // 페이지가 변경될 때 새로운 데이터를 가져옴
    useEffect(() => {
        if (page > 1) {
            fetchReviewList(page);
        }
    }, [page]);

    // 컴포넌트가 마운트될 때 첫 페이지 데이터 로드
    useEffect(() => {
        fetchReviewList(1);
    }, []);

    // 리뷰 이미지 렌더링 함수
    const reviewImages = (images) => {
        if (!images || images.length === 0) {
            return <div></div>;
        }

        return (
            <div
                style={{
                    display: "flex",
                    gap: "0.5rem",
                    overflowX: "auto",
                    whiteSpace: "nowrap",
                }}
            >
                {images.map((image, i) => (
                    <div
                        key={i}
                        style={{
                            flexShrink: 0,
                            width: "5rem",
                            height: "5rem",
                            backgroundColor: "#B5BCD2",
                        }}
                    >
                        <img
                            src={image}
                            alt={`Review ${i}`}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
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
                            <div className="bg-bara_light_blue rounded-[50%] w-12 h-12 mb-4 mr-2 overflow-hidden flex-shrink-0 flex">
                                {review.customerProfileImg == null ? (
                                    <img
                                        src="/images/customer_profile.png"
                                        className="object-cover w-full h-full"
                                    />
                                ) : (
                                    <img
                                        src={`${review.customerProfileImg}`}
                                        className="object-cover w-full h-full"
                                    />
                                )}
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
                        <p className="text-[0.875rem] text-bara_gray_5">
                            {review.reviewContent}
                        </p>
                    </div>
                ))}
            </div>
            {/* 무한 스크롤을 트리거할 요소 */}
            <div ref={ref} style={{ height: "1px", backgroundColor: "transparent" }} />
            {isModal && (
                <ModalComponent
                    title="삭제가 완료되었습니다!"
                    onClose={closeModal}
                ></ModalComponent>
            )}
        </div>
    );
}

export default ReviewMyListComponent;
