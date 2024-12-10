import useAuthStore from "../../store/authStore";

const ExampleComponent = () => {
    const refreshAccessToken = useAuthStore((state) => state.refreshAccessToken);

    const handleRequest = async () => {
        await refreshAccessToken(); // Access Token 갱신
        // 갱신 후 API 요청 진행
        fetch("/api/some-protected-route", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        });
    };

    return <button onClick={handleRequest}>API 요청하기</button>;
};

export default ExampleComponent;
