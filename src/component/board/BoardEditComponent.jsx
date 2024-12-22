import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { readBoard, updateBoard } from '../../api/boardAPI.js';

const EditComponent = () => {
    const { bno } = useParams();
    const navigate = useNavigate();

    // 수정될 게시판
    const [editedBoard, setEditedBoard] = useState();

    // 추가될 이미지
    const [newImageFile, setNewImageFile] = useState([]);
    const [oldImageFiles, setOldImageFiles] = useState([]);

    useEffect(() => {
        const fetchBoard = async () => {
            try {
                const response = await readBoard(bno);  // API 호출
                setEditedBoard(response);
            } catch (error) {
                console.error("게시판 상세 정보를 불러오는 데 실패했습니다.", error);
            }
        };

        fetchBoard();
    }, [bno]);  // bno가 변경될 때마다 데이터 다시 불러오기

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedBoard((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files); // 여러 파일을 배열로 변환
        setNewImageFile((prev) => [...prev, ...files]); // 새로 추가된 파일을 추가
    };

    const handleRemoveImage = (index) => {
        setEditedBoard((prev) => {
            const updatedImages = prev.imageFiles.filter((_, i) => i !== index); // 삭제된 이미지는 배열에서 제외
            return {
                ...prev,
                imageFiles: updatedImages,
            };
        });
    };

    const handleSave = async () => {
        try {
            const formData = new FormData();

            if (editedBoard.imageFiles.length > 0) {
                oldImageFiles.forEach((url) => {
                    formData.append("oldImageFiles", url); // 기존 이미지 URL을 FormData에 추가
                });
            }

            // 새로 추가된 이미지 파일 추가
            if (newImageFile) {
                newImageFile.forEach((file) => {
                    formData.append("imageFiles", file); // 새로 추가된 이미지 파일을 FormData에 추가
                });
            }

            // 나머지 필드 추가
            formData.append("title", editedBoard.title);
            formData.append("description", editedBoard.description);

            // API 호출
            await updateBoard(editedBoard.bno, formData);

            console.log("게시물 수정 완료");

            // 저장 후 상세 페이지로 이동
            navigate(`/board/${editedBoard.bno}`, { state: { board: editedBoard } });
        } catch (error) {
            console.error("게시물 수정 실패", error);
        }
    };

    return (
        <div
            className="h-screen bg-gradient-to-r from-gray-50 to-gray-100 flex flex-col justify-start p-4 pt-36 overflow-y-auto pb-[6.25rem]">
            <div className="w-full max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-xl">
                {/* editedBoard가 정의된 경우에만 렌더링 */}
                {editedBoard ? (
                    <>
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
                            <h1 className="text-3xl font-extrabold text-gray-800 mb-4 md:mb-0 mt-10">
                                게시물 수정
                            </h1>
                            <div className="text-sm text-gray-600 md:text-right">
                                <p><strong>작성자:</strong> {editedBoard.customerId}</p>
                                <p><strong>작성일:</strong> {new Date(editedBoard.createTime).toLocaleDateString()}</p>
                            </div>
                        </div>

                        <div className="mb-6">
                            <label htmlFor="title" className="block text-xl font-semibold text-gray-700 mb-3">
                                제목
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={editedBoard.title}
                                onChange={handleChange}
                                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                            />
                        </div>

                        <div className="mb-6">
                            <label htmlFor="description" className="block text-xl font-semibold text-gray-700 mb-3">
                                내용
                            </label>
                            <textarea
                                name="description"
                                value={editedBoard.description}
                                onChange={handleChange}
                                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                                rows="6"
                            />
                        </div>

                        <div className="mb-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">첨부파일</h3>
                            <input
                                type="file"
                                onChange={handleImageChange}  // 새로 추가된 파일을 처리
                                className="w-full p-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                            />

                            {editedBoard.imageFiles && editedBoard.imageFiles.length > 0 && (
                                <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {editedBoard.imageFiles.map((file, index) => (
                                        <div key={index} className="relative">
                                            <img
                                                src={`https://bucket-cleanaido.s3.ap-northeast-2.amazonaws.com/${file}`} // 기존 이미지 URL
                                                alt={`기존 이미지 ${index + 1}`}
                                                className="w-full h-40 object-cover rounded-lg shadow-md"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveImage(index)} // 삭제 버튼
                                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-400 transition duration-300"
                                            >
                                                X
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {newImageFile && newImageFile.length > 0 && (
                                <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {newImageFile.map((file, index) => (
                                        <div key={index}>
                                            <img
                                                src={URL.createObjectURL(file)} // 새로운 이미지 미리보기
                                                alt={`새로운 이미지 ${index + 1}`}
                                                className="w-full h-40 object-cover rounded-lg shadow-md"
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="flex justify-between mt-10 space-x-4">
                            <button
                                onClick={handleSave}  // 수정 완료 후 저장
                                className="w-1/2 py-3 bg-blue-500 text-white text-l font-semibold rounded-lg hover:bg-blue-400 transition-all shadow-md"
                            >
                                저장
                            </button>
                            <button
                                onClick={() => navigate(`/board/${editedBoard.bno}`)}  // 수정 취소 시 상세 페이지로 돌아감
                                className="w-1/2 px-8 py-3 bg-gray-500 text-white text-l font-semibold rounded-lg hover:bg-gray-400 transition-all shadow-md"
                            >
                                취소
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="flex justify-center items-center h-full">
                        <p className="text-xl font-semibold text-gray-600">로딩 중...</p>  {/* 데이터 로딩 중일 때 표시 */}
                    </div>
                )}
            </div>
        </div>

    );
};

export default EditComponent;
