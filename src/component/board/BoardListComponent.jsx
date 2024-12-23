import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getBoardList } from "../../api/boardAPI.js"; // 게시판 데이터를 가져오는 API
import { useInView } from "react-intersection-observer";
import axios from "axios";

const BoardListComponent = () => {
    const [board, setBoard] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [queryValue, setQueryValue] = useState('');
    const [selectedOption, setSelectedOption] = useState("");
    const [hasMore, setHasMore] = useState(true); // 무한 스크롤 여부

    const navigate = useNavigate();
    const { search } = useLocation();
    const keyword = new URLSearchParams(search).get('keyword') || '';

    // 무한 스크롤링
    const { ref, inView } = useInView({
        threshold: 0,
    });

    useEffect(() => {
        setQueryValue(keyword);
        setSelectedOption(selectedOption)
        setBoard([]); // 검색어 변경 시 기존 리스트 초기화
        setPage(1);
        fetchData();
    }, [keyword, selectedOption]); // 검색어가 변경될 때 실행

    const fetchData = async () => {
        setLoading(true);
        try {
            const data = await getBoardList(page, 10, keyword); // 게시판 데이터 API 호출
            setBoard((prevBoards) => [...prevBoards, ...data.dtoList]);
            setTotalPages(data.totalPages);
            setHasMore(page < data.totalPages); // 더 가져올 데이터가 있는지 확인
            console.log("ddddddkjfdldjldjdljdl")
            console.log(board.fileName)
        } catch (error) {
            setError('게시판 데이터를 가져오는데 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setQueryValue(e.target.value);
    };

    const handleSearch = async () => {
        if (!queryValue.trim()) {
            console.log("검색어 입력하세요 ");
            return;
        }

        const searchData = {
            type: selectedOption,
            query: queryValue
        };

        try {
            console.log("---------------searchDATA--------------------------------")
            console.log(searchData.type);
            console.log(searchData.query);
            const response = await axios.get("http://localhost:8080/api/v1/board/list", {
                params: {
                    type: searchData.type,
                    query: searchData.query,
                },
            });

            console.log("Search Results:", response.data);

            setBoard(response.data.dtoList)
            setPage(1);
        } catch (error) {
            console.error("검색 요청 실패:", error.response?.data || error.message);
        }
    };

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    // 스크롤이 보일 때 페이지 증가
    useEffect(() => {
        if (inView && hasMore && !loading) {
            setPage((prevPage) => prevPage + 1);
        }
    }, [inView]);

    // 페이지 변경 시 데이터 로드
    useEffect(() => {
        if (page > 1) {
            fetchData();
        }
    }, [page]);

    const handleCreateBoard = () => {
        // 게시글 작성 페이지로 이동
        navigate('/board/register');
    };

    return (
        <div className="pt-[10rem] container bg-bara_gray_1 min-h-screen pb-40">
            <div className="flex gap-4 items-center justify-between w-full px-8 py-4 bg-white">
                <select
                    value={selectedOption}
                    onChange={handleOptionChange}
                    className="border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="title">제목</option>
                    <option value="description">내용</option>
                    <option value="customer">작성자</option>
                </select>

                <input
                    type="text"
                    value={queryValue}
                    onChange={handleInputChange}
                    placeholder="검색어를 입력하세요..."
                    className="w-full px-4 mb-0 border-2 py-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <img
                    src="/images/search.png"
                    onClick={handleSearch}
                    alt="search"
                    className="cursor-pointer"
                />
            </div>
            {/* 게시글 리스트 */}
            <ul className="bg-white px-8 py-4">
                {board.map((board, index) => (
                    <li key={`${board.bno}--${index}`} className="border-b border-bara_gray_4 mb-4 p-4">
                        <Link to={`/board/${board.bno}`} className="flex w-full justify-between">
                            {/* 텍스트 영역 */}
                            <div className="mr-4 flex-1">
                                <h2 className="text-bara_sodomy line-clamp-3">{board.title}</h2>
                                <p className="text-bara_gray_4 mt-1">{board.writer}</p>
                                <p className="text-bara_gray_4">{new Date(board.createTime).toLocaleDateString()}</p>
                                <p className="text-bara_gray_5">{board.customerId}</p>
                            </div>

                            {/* 이미지 및 조회수 영역 */}
                            <div className="flex items-center">
                                {board.fileName && (
                                    <img
                                        src={  `https://bucket-cleanaido.s3.ap-northeast-2.amazonaws.com/${board.fileName}`}
                                        alt="Board Thumbnail"
                                        className="w-24 h-24 object-cover flex-shrink-0 rounded-md border-2 border-bara_gray_4"  // 이미지 외곽선
                                    />
                                )}
                                <div
                                    className="ml-2 flex items-center justify-center h-24 w-14 border border-bara_gray_4 rounded-md bg-bara_gray_2">
                                    <p className="text-sm text-bara_gray_5 text-center">조회수<br/>{board.viewCount}</p>
                                </div>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>

            {/* 게시글 작성 버튼 */}
            <div className="text-center mt-4">
                <button
                    onClick={handleCreateBoard}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                    새 게시글 작성
                </button>
            </div>

            {/* 로딩 상태 */}
            {loading && <div className="text-center text-xl py-4">Loading more...</div>}
            <div ref={ref} style={{ height: "1px", backgroundColor: "transparent" }} />
        </div>
    );
};

export default BoardListComponent;
