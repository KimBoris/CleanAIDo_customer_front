import {useState} from "react";

const useImageUpload = (fileInputRef, cameraInputRef) => {

    // 파일 상태
    const [previewUrl, setPreviewUrl] = useState(null); // 미리보기용 url
    const [formData, setFormData] = useState(new FormData()); // 서버전송용
    const [encodedImage, setEncodedImage] = useState(null);

    // 사진 촬영 이벤트
    const handleShotClick = () => {
        cameraInputRef.current.click();
    }

    // 사진 선택 이벤트
    const handleSelectClick = () => {
        fileInputRef.current.click();
    }

    // 파일 업로드 이벤트
    const handleFileChange = (e) => {

        const file = e.target.files[0];

        if (file) {

            // 미리보기용 이미지 url
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);

            console.log("image file data:", file);
            console.log(url)

            // 서버 전송용 파일 데이터
            const updatedFormData = new FormData();
            updatedFormData.append("image", file);
            setFormData(updatedFormData.get('image'));

            // 이미지 파일 Base64 인코딩
            const reader = new FileReader();
            reader.onloadend = () => {
                setEncodedImage(reader.result);
                console.log("Encoded image data:", reader.result);
            };
            reader.readAsDataURL(file);

        };

    };

    return {previewUrl, formData, encodedImage, handleShotClick, handleSelectClick, handleFileChange}
};

export default useImageUpload;