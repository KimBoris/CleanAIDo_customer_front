import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { updateBoard } from '../../api/boardAPI.js';

const EditComponent = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { board } = location.state || {};  // BoardRead에서 전달한 board 데이터를 받아옴
    const [editedBoard, setEditedBoard] = useState(board || {});  // board 데이터를 초기값으로 설정
    const [oldImageFiles, setOldImageFiles] = useState([]);  // 새로 추가된 이미지 파일만 관리
    const [removedImageIndexes, setRemovedImageIndexes] = useState([]);  // 삭제된 기존 이미지의 인덱스

    // 데이터가 없을 경우 로딩 상태 처리
    if (!board) {
        return <div>게시물을 불러오는 중...</div>;
    }

    console.log("-------------------------------");
    console.log(board, board.imageFiles);

    // 기존 이미지가 있다면, 기존 이미지를 상태에 저장
    useEffect(() => {
        if (board && board.imageFiles) {
            setEditedBoard((prev) => ({
                ...prev,
                imageFiles: board.imageFiles, // 기존 이미지를 그대로 유지
            }));
        }
    }, [board]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedBoard((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files); // 여러 파일을 배열로 변환
        setOldImageFiles((prev) => [...prev, ...files]); // 새로 추가된 파일을 추가
    };

    const handleRemoveImage = (index) => {
        setEditedBoard((prev) => {
            const updatedImages = prev.imageFiles.filter((_, i) => i !== index); // 삭제된 이미지는 배열에서 제외
            return {
                ...prev,
                imageFiles: updatedImages,
            };
        });
        setRemovedImageIndexes((prev) => [...prev, index]);  // 삭제된 이미지를 removedImageIndexes에 저장
    };

    const handleSave = async () => {
        try {
            const formData = new FormData();

            // 새로 추가된 이미지 파일이 있으면 formData에 추가
            oldImageFiles.forEach((file) => formData.append("newImageFiles", file));

            // 삭제된 기존 이미지를 formData에 추가 (옵션으로 서버에 알려줄 수 있음)
            removedImageIndexes.forEach((index) => formData.append("removedImageIndexes", index));

            // 기존 이미지 파일이 있으면 formData에 추가
            editedBoard.imageFiles.forEach((file) => {
                formData.append("existingImages", file);
            });

            // 게시물의 다른 정보 추가
            formData.append("title", editedBoard.title);
            formData.append("description", editedBoard.description);

            // API 호출
            await updateBoard(editedBoard.bno, formData);
            console.log("게시물 수정 완료");

            // 수정 완료 후 상세보기 페이지로 이동
            navigate(`/board/${editedBoard.bno}`, { state: { board: editedBoard } });
        } catch (error) {
            console.error("게시물 수정 실패", error);
        }
    };

    return (
        <div className="h-screen bg-white flex flex-col justify-start p-6 overflow-y-auto pb-[6.25rem]">
            <div className="w-full p-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
                    <h1 className="text-4xl font-semibold text-gray-800 mb-4 md:mb-0 mt-40">게시물 수정</h1>
                    <div className="text-sm text-gray-600 md:text-right">
                        <p><strong>작성자:</strong> {board.customerId}</p>
                        <p><strong>작성일:</strong> {new Date(board.createTime).toLocaleDateString()}</p>
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block text-lg font-semibold text-gray-700">제목</label>
                    <input
                        type="text"
                        name="title"
                        value={editedBoard.title}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md"
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-lg font-semibold text-gray-700">내용</label>
                    <textarea
                        name="description"
                        value={editedBoard.description}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md"
                        rows="6"
                    />
                </div>

                <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">첨부파일</h3>
                    <input
                        type="file"
                        onChange={handleImageChange}  // 새로 추가된 파일을 처리
                        className="w-full p-3 border border-gray-300 rounded-md"
                    />

                    {editedBoard.imageFiles && editedBoard.imageFiles.length > 0 && (
                        <div className="mt-4">
                            {editedBoard.imageFiles.map((file, index) => (
                                <div key={index} className="relative">
                                    <img
                                        src={file} // 기존 이미지 URL
                                        alt={`기존 이미지 ${index + 1}`}
                                        className="w-40 h-40 object-cover"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveImage(index)} // 삭제 버튼
                                        className="absolute top-0 right-0 text-white bg-red-500 rounded-full p-1"
                                    >
                                        X
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {oldImageFiles && oldImageFiles.length > 0 && (
                        <div className="mt-4">
                            {oldImageFiles.map((file, index) => (
                                <img
                                    key={index}
                                    src={URL.createObjectURL(file)} // 새로운 이미지 미리보기
                                    alt={`새로운 이미지 ${index + 1}`}
                                    className="w-40 h-40 object-cover"
                                />
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex justify-between mt-8">
                    <button
                        onClick={handleSave}  // 수정 완료 후 저장
                        className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-400 transition duration-300 shadow-md"
                    >
                        저장
                    </button>
                    <button
                        onClick={() => navigate(`/board/${board.bno}`)}  // 수정 취소 시 상세 페이지로 돌아감
                        className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-400 transition duration-300 shadow-md"
                    >
                        취소
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditComponent;
