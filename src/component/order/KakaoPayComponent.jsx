import { preParePayment } from "../../api/OrderAPI.js";
// import {useNavigate} from "react-router-dom";

function KakaoPayComponent() {
    // const navigate = useNavigate();

    const handlePayReady = async (price) => {
        try {
            const res = await preParePayment(price); // 비동기 호출 처리
            console.log(res);
            const redirectUrl = res.data.next_redirect_mobile_url; // 모바일 결제 URL
            window.location.href = redirectUrl; // 외부 URL로 리디렉션
        } catch (error) {
            console.error("결제 준비 중 오류:", error);
        }
    };

    const total = 20000;

    return (
        <button
            className="w-20 h-20 bg-bara_gray_5"
            onClick={() => handlePayReady(total)} // 결제 준비 버튼 클릭 시 처리
            style={{ touchAction: "manipulation", display: "block", width: "80px", height: "80px" }} // 모바일에서 터치 처리 강화
        >
            결재
        </button>
    );
}

export default KakaoPayComponent;
