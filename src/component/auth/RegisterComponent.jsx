import { useState } from "react";

const RegisterComponent = ({ kakaoUser, onRegister }) => {
    const [formData, setFormData] = useState({
        customerId: kakaoUser?.email || "",
        customerPw: "",
        customerName: "",
        birthDate: "",
        phoneNumber: "",
        address: "",
        profileImageUrl: kakaoUser?.profileImageUrl || "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onRegister(formData); // 회원가입 완료 시 실행
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-bara_gray_1">
            <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md text-center">
                {/* 로고 */}
                <div className="flex justify-center mb-6">
                    <img
                        src="/images/cleanaido_logo_sm.svg"
                        alt="CleanAI하니 로고"
                        className="w-40"
                    />
                </div>

                {/* 제목 */}
                <h2 className="text-bara_sodomy text-2xl font-medium mb-4">
                    청소AI하니에 회원가입하세요!
                </h2>
                <p className="text-bara_gray_5 mb-6 text-sm">
                    간단한 정보를 입력하고 회원가입을 완료하세요.
                </p>

                {/* 폼 */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        name="customerId"
                        value={formData.customerId}
                        onChange={handleChange}
                        placeholder="이메일 (카카오 아이디)"
                        className="w-full px-4 py-3 border-2 border-bara_gray_2 rounded-lg focus:outline-none focus:ring-2 focus:ring-bara_blue"
                        required
                        disabled
                    />
                    <input
                        type="password"
                        name="customerPw"
                        value={formData.customerPw}
                        onChange={handleChange}
                        placeholder="비밀번호"
                        className="w-full px-4 py-3 border-2 border-bara_gray_2 rounded-lg focus:outline-none focus:ring-2 focus:ring-bara_blue"
                        required
                    />
                    <input
                        name="customerName"
                        value={formData.customerName}
                        onChange={handleChange}
                        placeholder="이름"
                        className="w-full px-4 py-3 border-2 border-bara_gray_2 rounded-lg focus:outline-none focus:ring-2 focus:ring-bara_blue"
                        required
                    />
                    <input
                        type="date"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border-2 border-bara_gray_2 rounded-lg focus:outline-none focus:ring-2 focus:ring-bara_blue"
                        required
                    />
                    <input
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        placeholder="전화번호"
                        className="w-full px-4 py-3 border-2 border-bara_gray_2 rounded-lg focus:outline-none focus:ring-2 focus:ring-bara_blue"
                        required
                    />
                    <input
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="주소"
                        className="w-full px-4 py-3 border-2 border-bara_gray_2 rounded-lg focus:outline-none focus:ring-2 focus:ring-bara_blue"
                        required
                    />
                    {/*<input*/}
                    {/*    name="profileImageUrl"*/}
                    {/*    value={formData.profileImageUrl}*/}
                    {/*    onChange={handleChange}*/}
                    {/*    placeholder="프로필 이미지 URL (선택)"*/}
                    {/*    className="w-full px-4 py-3 border-2 border-bara_gray_2 rounded-lg focus:outline-none focus:ring-2 focus:ring-bara_blue"*/}
                    {/*/>*/}

                    {/* 버튼 */}
                    <button
                        type="submit"
                        className="w-full py-3 mt-4 bg-bara_blue text-white font-medium rounded-lg shadow hover:bg-bara_sky_blue transition duration-300"
                    >
                        회원가입 완료
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterComponent;
