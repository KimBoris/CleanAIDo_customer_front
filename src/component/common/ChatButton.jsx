import { useState, useEffect } from "react";

function ChatButton() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const checkLocalStorage = () => {
            const storedData = localStorage.getItem("bara");
            if (storedData) {
                try {
                    const parsedData = JSON.parse(storedData);
                    // 조건에 따라 버튼 표시 (parsedData가 유효할 경우)
                    setIsVisible(!!parsedData);
                } catch (e) {
                    console.error("Error parsing localStorage data:", e);
                    setIsVisible(false);
                }
            } else {
                setIsVisible(false);
            }
        };

        checkLocalStorage();
    }, []);

    return (
        <>
            {isVisible && (
                <div className="fixed bottom-28 right-0 z-100">
                    <img src="/images/chat_button.svg" className="w-[6.25rem]" alt="Chat" />
                </div>
            )}
        </>
    );
}

export default ChatButton;