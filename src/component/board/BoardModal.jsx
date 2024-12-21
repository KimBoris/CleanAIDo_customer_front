import React, { useState, useEffect } from "react";

const BoardModal = ({ post, onSave, onClose }) => {
    const [content, setContent] = useState("");

    // 게시글 내용 초기화
    useEffect(() => {
        setContent(post.content);
    }, [post]);

    // 저장 버튼 클릭 시
    const save = () => {
        onSave(content);
    };

    return (
        <div className="modal">
            <div className="modal-header">
                <h2>{post.title}</h2>
                <button onClick={onClose}>닫기</button>
            </div>
            <div className="modal-body">
                <p><strong>게시글 내용:</strong></p>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows="5"
                    placeholder="내용을 입력하세요"
                />
            </div>
            <div className="modal-footer">
                <button onClick={save}>저장</button>
            </div>
        </div>
    );
};



export default BoardModal;
