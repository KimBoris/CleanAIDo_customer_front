// indexed db 생성
export const openDatabase = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("myDatabase", 1);

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            db.createObjectStore("images", { keyPath: "id" });
        };

        request.onsuccess = () => {
            resolve(request.result);
        };

        request.onerror = (event) => {
            reject(`Database Error: ${event.target.errorCode}`);
        };
    });
};

// indexed db에 이미지 저장
export const saveImage = async (id, image) => {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction("images", "readwrite");
        const store = transaction.objectStore("images");
        const request = store.put({ id, image });

        request.onsuccess = () => resolve("Successfully uploaded image");
        request.onerror = () => reject("Failed to upload image");
    });
};

// indexed db에서 이미지 가져오기
export const loadImage = async (id) => {
    const db = await openDatabase();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction("images", "readonly");
        const store = transaction.objectStore("images");
        const request = store.get(id);

        request.onsuccess = () => {
            if (request.result) {
                resolve(request.result.image);
            } else {
                reject("No image found");
            }
        };
        request.onerror = () => reject("Failed to retrieve image");
    });
};
