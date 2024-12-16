import React from "react";

const Modal = ({ title = "모달 제목", onClose }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            {/* 모달 박스 */}
            <div className="bg-white w-full max-w-sm mx-4 rounded-lg shadow-lg">
                {/* 헤더 */}
                <div className="p-6">
                    <h5 className="text-[1.2rem] font-medium text-bara_sodomy">{title}</h5>
                </div>
                {/* 버튼 */}
                <div className="px-4 pb-4">
                    <button
                        className="bg-bara_blue text-white py-4 px-4 rounded hover:bg-blue-600 transition w-full"
                        onClick={onClose}
                    >
                        확인
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
