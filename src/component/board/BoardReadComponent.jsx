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
        <div
            className="board-view max-w-4xl mx-auto bg-gradient-to-r from-gray-50 to-gray-100 shadow-lg rounded-xl p-10 pt-20">
            <h2 className="text-4xl font-extrabold text-gray-800 mb-10 text-center border-b-4 border-blue-500 pb-4">
                게시물 보기
            </h2>
            <div className="space-y-8">
                <div>
                    <h3 className="text-xl font-medium text-gray-700 mb-3">제목</h3>
                    <p className="w-full p-4 border border-gray-300 rounded-lg bg-gray-50 shadow-md">
                        {board.title}
                    </p>
                </div>
                <div>
                    <h3 className="text-xl font-medium text-gray-700 mb-3">내용</h3>
                    <p className="w-full p-4 border border-gray-300 rounded-lg bg-gray-50 shadow-md min-h-[200px]">
                        {board.description}
                    </p>
                </div>
                <div>
                    <h3 className="text-xl font-medium text-gray-700 mb-3">작성자</h3>
                    <p className="w-full p-4 border border-gray-300 rounded-lg bg-gray-50 shadow-md">
                        {board.customerId}
                    </p>
                </div>
                <div>
                    <h3 className="text-xl font-medium text-gray-700 mb-3">작성일</h3>
                    <p className="w-full p-4 border border-gray-300 rounded-lg bg-gray-50 shadow-md">
                        {formattedDate}
                    </p>
                </div>
                <div>
                    <h3 className="text-xl font-medium text-gray-700 mb-3">첨부파일</h3>
                    {board.imageFiles && board.imageFiles.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {board.imageFiles.map((file, index) => (
                                <div
                                    key={index}
                                    className="w-full h-40 overflow-hidden border border-gray-300 rounded-lg shadow-md">
                                    <img
                                        src={`https://bucket-cleanaido.s3.ap-northeast-2.amazonaws.com/${file}`}
                                        alt={`첨부파일 ${file} ${index + 1}`}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div
                            className="w-full h-40 border border-gray-300 rounded-lg flex items-center justify-center bg-gray-50 text-gray-500">
                            첨부파일이 없습니다.
                        </div>
                    )}
                </div>
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={handleEdit}
                        className="w-1/2 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition-all shadow-md">
                        수정
                    </button>
                    <button
                        onClick={handleDelete}
                        className="w-1/2 py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition-all shadow-md">
                        삭제
                    </button>
                </div>

            </div>
        </div>

    );
};

export default BoardRead;
