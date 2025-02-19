import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 가져오기
import { registerBoard } from '../../api/boardAPI'; // registerBoard를 가져옴

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
        <div className="board-create p-8 pt-24">
            <h2 className="text-2xl font-semibold mb-6">게시물 등록</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-sm font-medium mb-2">
                        제목
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={board.title}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-sm font-medium mb-2">
                        내용
                    </label>
                    <textarea
                        name="description"
                        value={board.description}
                        onChange={handleInputChange}
                        required
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 min-h-[100px]"
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="imageFiles" className="block text-sm font-medium mb-2">
                        이미지 첨부 (선택)
                    </label>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        multiple
                        className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>
                <button
                    type="submit"
                    className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-300"
                >
                    등록
                </button>
            </form>
        </div>
    );
};

export default BoardCreateComponent;
