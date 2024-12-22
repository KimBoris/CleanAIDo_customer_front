import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 가져오기
import { registerBoard } from '../../api/boardAPI.js'; // registerBoard를 가져옴

const BoardCreateComponent = () => {
    const [board, setBoard] = useState({
        title: '',
        description: ''
    });
    const [imageFiles, setImageFiles] = useState([]);
    const navigate = useNavigate(); // useNavigate 훅 사용

    // 제목과 내용 입력을 처리하는 함수
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBoard((prevBoard) => ({
            ...prevBoard,
            [name]: value,
        }));
    };

    // 파일 첨부 처리 함수
    const handleFileChange = (e) => {
        setImageFiles(e.target.files);
    };

    // 폼 제출 처리 함수
    const handleSubmit = async (e) => {
        e.preventDefault();

        // FormData 객체 생성
        const formData = new FormData();
        formData.append('title', board.title);
        formData.append('description', board.description);

        // 파일이 있는 경우에만 추가
        if (imageFiles.length > 0) {
            for (let i = 0; i < imageFiles.length; i++) {
                formData.append('imageFiles', imageFiles[i]);
            }
        }

        try {
            // registerBoard 호출
            const response = await registerBoard(formData);
            alert('게시물 등록 성공: ' + response); // 성공 메시지

            // 등록 성공 후 /board/list로 라우팅
            navigate('/board/list');
        } catch (error) {
            console.error('게시물 등록 실패:', error); // 에러 처리
        }
    };


    return (
        <div
            className="board-create max-w-4xl mx-auto bg-gradient-to-r from-gray-50 to-gray-100 shadow-lg rounded-xl p-10 pt-20">
            <h2 className="text-4xl font-extrabold text-gray-800 mb-10 text-center border-b-4 border-blue-500 pb-4">
                게시물 등록
            </h2>
            <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                    <label
                        htmlFor="title"
                        className="block text-xl font-medium text-gray-700 mb-3"
                    >
                        제목
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={board.title}
                        onChange={handleInputChange}
                        required
                        placeholder="게시물 제목을 입력하세요"
                        className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-blue-500 shadow-md transition-all"
                    />
                </div>
                <div>
                    <label
                        htmlFor="description"
                        className="block text-xl font-medium text-gray-700 mb-3"
                    >
                        내용
                    </label>
                    <textarea
                        name="description"
                        value={board.description}
                        onChange={handleInputChange}
                        required
                        placeholder="게시물 내용을 입력하세요"
                        className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-blue-500 shadow-md min-h-[200px] transition-all"
                    ></textarea>
                </div>
                <div>
                    <label
                        htmlFor="imageFiles"
                        className="block text-xl font-medium text-gray-700 mb-3"
                    >
                        이미지 첨부 (선택)
                    </label>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        multiple
                        className="block w-full text-gray-600 border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-4 focus:ring-blue-400 focus:border-blue-500 shadow-md file:mr-4 file:py-3 file:px-5 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-all"
                    />
                </div>
                <div className="text-center">
                    <button
                        type="submit"
                        className="w-full py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg"
                    >
                        등록
                    </button>
                </div>
            </form>
        </div>

    );
};

export default BoardCreateComponent;
