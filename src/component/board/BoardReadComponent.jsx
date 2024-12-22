import { useNavigate, useParams } from 'react-router-dom';
import { deleteBoard, readBoard } from '../../api/boardAPI.js';  // 수정된 API 함수
import { useEffect, useState } from 'react';

const BoardRead = () => {
    const { bno } = useParams();  // URL에서 게시물 번호를 추출
    const [board, setBoard] = useState(null);  // 게시판 정보를 저장할 상태
    const navigate = useNavigate();  // 수정된 useNavigate 사용

    // 게시판 상세 정보 불러오기
    useEffect(() => {
        const fetchBoard = async () => {
            try {
                const response = await readBoard(bno);  // API 호출
                setBoard(response);  // 서버에서 받은 데이터로 상태 업데이트
            } catch (error) {
                console.error("게시판 상세 정보를 불러오는 데 실패했습니다.", error);
            }
        };

        fetchBoard();
    }, [bno]);  // bno가 변경될 때마다 데이터 다시 불러오기

    if (!board) {
        return <div>로딩 중...</div>;  // 데이터가 로드되기 전에 표시
    }

    const formattedDate = new Date(board.createTime).toLocaleDateString();  // 날짜 포맷

    // 수정 버튼 클릭 시 수정 페이지로 이동
    const handleEdit = () => {
        console.log("bno = " + bno);
        console.log(board);
        navigate(`/board/edit/${bno}`);
    };

    // 삭제 버튼 클릭 시 게시물 삭제
    const handleDelete = async () => {
        try {
            await deleteBoard(board.bno);  // 서버에서 게시물 삭제
            console.log("게시물 삭제됨");
            navigate('/board/list');  // 삭제 후 목록 페이지로 이동
        } catch (error) {
            console.error("게시물 삭제 실패", error);
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col justify-start p-6">
            <div className="w-full p-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
                    <h1 className="text-4xl font-semibold text-gray-800 mb-4 md:mb-0 mt-40">{board.title}</h1>
                    <div className="text-sm text-gray-600 md:text-right">
                        <p><strong>작성자:</strong> {board.customerId}</p>
                        <p><strong>작성일:</strong> {formattedDate}</p>
                        <p><strong>조회수:</strong> {board.viewCount}</p>
                    </div>
                </div>

                <div className="text-lg text-gray-700 mb-6 border-b-2 pb-6">{board.description}</div>

                <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">첨부파일</h3>
                    {board.imageFiles && board.imageFiles.length > 0 ? (
                        <div className="flex space-x-4 overflow-x-auto pb-4">
                            {board.imageFiles.map((file, index) => (
                                <div key={index} className="w-30 h-30 overflow-hidden flex-shrink-0 border border-gray-300 rounded-md">
                                    <img src={file} alt={board.imageFiles} className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="w-30 h-30 border border-gray-300 rounded-md flex items-center justify-center text-gray-600">
                            <p>첨부파일이 없습니다.</p>
                        </div>
                    )}
                </div>

                <div className="flex justify-between mt-8">
                    <button
                        onClick={handleEdit}  // 수정 버튼 클릭 시 수정 페이지로 이동
                        className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-400 transition duration-300 shadow-md"
                    >
                        수정
                    </button>
                    <button
                        onClick={handleDelete}  // 삭제 버튼 클릭 시 게시물 삭제
                        className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-400 transition duration-300 shadow-md"
                    >
                        삭제
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BoardRead;
