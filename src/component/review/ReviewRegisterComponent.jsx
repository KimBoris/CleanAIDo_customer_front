import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {getProductOne} from "../../api/productAPI.js";
import {registReview} from "../../api/reviewAPI.js";
import ModalComponent from "../common/ModalComponent.jsx";

function ReviewRegisterComponent() {
    const { state } = useLocation();
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [reviews, setReviews] = useState({});
    const [ratings, setRatings] = useState({}); // 별점
    const totalStars = 5; // 총 별 개수
    const [files, setFiles] = useState({});
    const [previews, setPreviews] = useState({}); // 상품별 미리보기 URL 리스트
    const [isModal, setIsModal] = useState(false);

    const navigate = useNavigate();

    const fileInputRefs = useRef({}); // 파일첨부 참조

    const productNumbers = state?.productNumbers;

    console.log(productNumbers);

    // 상품 데이터 호출
    const fetchProducts = async (pno) => {
        setLoading(true);
        const productData = await Promise.all(
            pno.map(async (productId) => {
                const data = await getProductOne(productId);
                return data; // 각 상품 데이터 반환
            })
        );
        setProducts(productData);
        console.log(products);
        setLoading(false);
    }

    // 별점 클릭
    const handleRatingClick = (productNumber, starIndex) => {
        setRatings((prevRatings) => ({
            ...prevRatings,
            [productNumber]: starIndex, // 선택된 상품 ID와 별점을 저장
        }));
    };

    // 리뷰 작성 시 상태 업데이트
    const handleReviewChange = (productNumber, value) => {
        setReviews((prevReviews) => ({
            ...prevReviews,
            [productNumber]: value, // 선택된 상품 ID와 리뷰 내용을 저장
        }));

        console.log(reviews);
    }

    // 사진 선택 이벤트
    const handleSelectClick = (productNumber) => {
        const inputRef = fileInputRefs.current[productNumber];
        if (inputRef) {
            inputRef.click();
        } else {
            console.error(`No file input found for productNumber: ${productNumber}`);
        }
    };

    // 파일 선택 이벤트
    const handleFileChange = (productNumber, event) => {
        const selectedFiles = Array.from(event.target.files); // 선택한 파일 배열로 변환
        const previewUrls = selectedFiles.map((file) => URL.createObjectURL(file)); // 미리보기 URL 생성

        setFiles((prevFiles) => ({
            ...prevFiles,
            [productNumber]: [
                ...(prevFiles[productNumber] || []), // 기존 파일 유지
                ...selectedFiles, // 새로 선택된 파일 추가
            ],
        }));

        setPreviews((prevPreviews) => ({
            ...prevPreviews,
            [productNumber]: [
                ...(prevPreviews[productNumber] || []), // 기존 미리보기 유지
                ...previewUrls, // 새로 생성된 미리보기 추가
            ],
        }));
    };

    // 파일 삭제
    const handleFileRemove = (productNumber, fileIndex) => {
        setFiles((prevFiles) => ({
            ...prevFiles,
            [productNumber]: prevFiles[productNumber].filter(
                (_, index) => index !== fileIndex
            ),
        }));

        setPreviews((prevPreviews) => ({
            ...prevPreviews,
            [productNumber]: prevPreviews[productNumber].filter(
                (_, index) => index !== fileIndex
            ),
        }));
    };

    // 작성 완료 버튼 클릭
    const handleClickComplate = async () => {
        for(const product of products) {
            const formData = new FormData();
            formData.append("reviewContent", reviews[product.pno]);
            formData.append("productNumber", product.pno);
            formData.append("score", ratings[product.pno]);

            if (files[product.pno]) {
                files[product.pno].forEach((file) => {
                    formData.append("files", file);
                });
            }

            for (const pair of formData.entries()) {
                console.log(pair[0], pair[1]); // key, value 출력
            }

            await registReview(formData);
        }
        setIsModal(true);
    }

    const closeModal = () => {
        setIsModal(false);
        navigate("/mypage/review/list")
    };


    useEffect(() => {
        fetchProducts(productNumbers);
    }, []);


    return (
        <div className="mt-[9rem] bg-bara_gray_1 min-h-screen pt-4 pb-40">
            {loading && <div>Loading...</div>}
            <div className="w-full bg-white px-8 py-8">
                <div>
                    {products.map((product) => (
                        <div key={product.pno} className="mb-8">
                            <div className="flex mb-2">
                                <div className="bg-bara_gray_4 w-20 h-20 mr-2">
                                    <img
                                        src={`https://bucket-cleanaido.s3.ap-northeast-2.amazonaws.com/${product.thumFileNames[0]}`}
                                        alt={product.thumFileNames[0] || '상품 이미지'}
                                        className="w-full h-full object-center object-cover"
                                    />
                                </div>
                                <div>
                                    <div className="mb-4">{product.pname}</div>
                                    <div className="flex">
                                        <div className="flex mr-2">
                                            {Array.from({length: totalStars}, (_, index) => {
                                                const starIndex = index + 1; // 별 인덱스 (1부터 시작)
                                                return (
                                                    <svg
                                                        key={starIndex}
                                                        onClick={() => handleRatingClick(product.pno, starIndex)}
                                                        className={`w-8 h-8 cursor-pointer m-[0.1rem] ${
                                                            starIndex <= (ratings[product.pno] || 0)
                                                                ? "text-bara_yellow"
                                                                : "text-bara_gray_2"
                                                        }`}
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.855 1.5 8.244-7.436-3.962-7.436 3.962 1.5-8.244-6.064-5.855 8.332-1.151z"/>
                                                    </svg>
                                                );
                                            })}
                                        </div>
                                        <div className="text-sm text-bara_gray_4 mt-2">
                                            {ratings[product.pno] || "없음"}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <textarea className="w-full h-40 border border-bara_gray_3 mt-2 rounded-[0.2rem]"
                                      value={reviews[product.pno] || ""}
                                      onChange={(e) => handleReviewChange(product.pno, e.target.value)}
                                      placeholder="사용 후기를 작성해주십시오"/>
                            {/* 사진첨부 */}
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleSelectClick(product.pno)}
                                    className="bg-white border border-bara_blue text-bara_blue w-16 h-16 text-sm flex
                                flex-col items-center justify-center gap-2 rounded-[0.2rem]">
                                    <img src="/images/camera_blue.svg" className="w-6"/>
                                    <p>첨부하기</p>

                                    {/* 선택한 사진 파일 처리용 input */}
                                    <input
                                        type="file"
                                        ref={(el) => (fileInputRefs.current[product.pno] = el)}
                                        accept="image/*"
                                        onChange={(e) => handleFileChange(product.pno, e)}
                                        style={{display: "none"}}
                                    />
                                </button>
                                <div>{files[product.pno] ? "" : "선택된 파일 없음"}</div>
                                <div className="flex">
                                    {previews[product.pno]?.map((preview, index) => (
                                        <div key={index} className="flex items-start">
                                            <img src={preview} alt="preview" className="w-16 h-16 rounded"/>
                                            <button
                                                onClick={() => handleFileRemove(product.pno, index)}
                                                className="bg-bara_gray_2 text-white rounded-[50%] ml-[-1.3rem] mt-[-0.2rem] px-2 py-2 mr-1"
                                            >
                                                <img src="/images/close.svg" className="w-2 h-2" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/*  //사진첨부  */}

                        </div>
                    ))}
                </div>
            </div>

            <div
                className="fixed bottom-0 left-0 w-full bg-white text-bara_sodomy px-8"
                style={{boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)'}}
            >
                <button
                    onClick={handleClickComplate}
                    className="w-full bg-bara_blue text-white py-4 rounded-[0.5rem] mt-4 mb-12"
                >
                    리뷰 작성 완료
                </button>
            </div>
            {isModal && <ModalComponent title="등록이 완료었습니다!" onClose={closeModal}></ModalComponent>}
        </div>

    );
}

export default ReviewRegisterComponent;