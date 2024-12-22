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
        <div className="h-screen bg-white flex flex-col justify-start p-6 overflow-y-auto pb-[6.25rem]">
            <div className="w-full p-6">
                {/* editedBoard가 정의된 경우에만 렌더링 */}
                {editedBoard ? (
                    <>
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
                            <h1 className="text-4xl font-semibold text-gray-800 mb-4 md:mb-0 mt-40">게시물 수정</h1>
                            <div className="text-sm text-gray-600 md:text-right">
                                <p><strong>작성자:</strong> {editedBoard.customerId}</p>
                                <p><strong>작성일:</strong> {new Date(editedBoard.createTime).toLocaleDateString()}</p>
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

                            {newImageFile && newImageFile.length > 0 && (
                                <div className="mt-4">
                                    {newImageFile.map((file, index) => (
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
                                onClick={() => navigate(`/board/${editedBoard.bno}`)}  // 수정 취소 시 상세 페이지로 돌아감
                                className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-400 transition duration-300 shadow-md"
                            >
                                취소
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="flex justify-center items-center h-full">
                        <p>로딩 중...</p>  {/* 데이터 로딩 중일 때 표시 */}
                    </div>
                )}
            </div>
        </div>
    );
};

export default EditComponent;
