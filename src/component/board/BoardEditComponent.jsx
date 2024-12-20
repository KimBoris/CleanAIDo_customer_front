import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { updateBoard, deleteBoard } from '../../api/boardAPI';

const EditComponent = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { board } = location.state || {};  // BoardRead에서 전달한 board 데이터를 받아옴
    const [editedBoard, setEditedBoard] = useState(board || {});  // board 데이터를 초기값으로 설정
    const [newFiles, setNewFiles] = useState([]);  // 새로 추가된 파일들을 상태로 관리

    // 데이터가 없을 경우 로딩 상태 처리
    if (!board) {
        return <div>게시물을 불러오는 중...</div>;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedBoard((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        const selectedFiles = e.target.files;
        const newFileArray = [...newFiles];

        for (let i = 0; i < selectedFiles.length; i++) {
            newFileArray.push(URL.createObjectURL(selectedFiles[i]));  // 이미지 파일을 URL로 변환하여 배열에 추가
        }

        setNewFiles(newFileArray);  // 새로운 파일 목록 업데이트
    };

    const handleRemoveImage = (index) => {
        const updatedFiles = [...editedBoard.imageFiles, ...newFiles];  // 기존 파일과 새 파일을 합친 배열
        updatedFiles.splice(index, 1);  // 해당 인덱스의 파일 삭제

        // 기존 파일을 업데이트
        setEditedBoard((prev) => ({
            ...prev,
            imageFiles: updatedFiles.slice(0, editedBoard.imageFiles.length),  // 기존 파일만 업데이트
        }));

        // 새로 삭제된 파일을 새로운 배열로 업데이트
        if (index >= editedBoard.imageFiles.length) {
            const updatedNewFiles = [...newFiles];
            updatedNewFiles.splice(index - editedBoard.imageFiles.length, 1);  // 새로운 파일 배열에서 삭제
            setNewFiles(updatedNewFiles);
        }
    };

    const handleSave = async () => {
        try {
            // 기존 파일과 새로 추가된 파일을 합침
            const finalImageFiles = [
                ...(editedBoard.imageFiles || []),
                ...newFiles,
            ];

            // 업데이트된 게시물 객체 생성
            const updatedBoard = {
                ...editedBoard,
                imageFiles: finalImageFiles,  // 기존 첨부파일과 새 첨부파일을 합쳐서 서버로 전송
            };

            // 게시물 수정 API 호출
            await updateBoard(updatedBoard.bno, updatedBoard);  // API 호출하여 수정된 내용 저장
            console.log(updatedBoard.bno)
            console.log( updatedBoard)

            console.log("게시물 수정 완료");
            // 수정 완료 후 상세보기 페이지로 이동
            navigate(`/board/edit/${updatedBoard.bno}`);  // 수정된 게시물의 상세보기 페이지로 이동
        } catch (error) {
            console.error('게시물 수정 실패', error);
        }
    };
    const handleDelete = async () => {
        try {
            await deleteBoard(editedBoard.bno);  // 게시물 삭제 API 호출
            console.log("게시물 삭제 완료");

            // 삭제된 게시물을 부모 컴포넌트에게 알려서 목록을 갱신
            navigate('/board', { state: { deletedBno: editedBoard.bno } });
        } catch (error) {
            console.error("게시물 삭제 실패", error);
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
                        multiple
                        onChange={handleImageChange}
                        className="w-full p-3 border border-gray-300 rounded-md"
                    />
                    {(editedBoard.imageFiles || []).concat(newFiles).length > 0 && (
                        <div className="flex space-x-4 overflow-x-auto pb-4 mt-4">
                            {[(editedBoard.imageFiles || []), newFiles].flat().map((file, index) => (
                                <div key={index} className="w-20 h-20 overflow-hidden flex-shrink-0 border border-gray-300 rounded-md relative">
                                    <img src={file} alt={`첨부파일 ${index + 1}`} className="w-full h-full object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveImage(index)}
                                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                                    >
                                        <span className="text-sm font-bold">X</span>
                                    </button>
                                </div>
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
                    <button
                        onClick={handleDelete}  // 삭제 버튼 추가
                        className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-400 transition duration-300 shadow-md"
                    >
                        삭제
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditComponent;
