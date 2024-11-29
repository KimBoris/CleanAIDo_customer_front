import axios from 'axios';

const host = 'https://[주소]/api/v1/customer' // https로 된 주소 필요

// fcm 토큰 업데이트(첫 로그인, 로그인 시 사용)
export const updateFcmToken = async (customerId, fcmToken) => {

    try {
        const res = await axios.put(
            `${host}/fcm`,
            {}, // 요청 본문이 없어서 빈객체
            {
                headers: {
                    'Content-Type': 'application/json',
                    'customer-id': customerId, // 사용자 ID
                    'fcm-token': fcmToken,     // FCM 토큰
                },
            }
        );

        console.log(res.data);
        return res.data;

    } catch (error) {
        console.error('FCM Token 업데이트 중 오류:', error);
        throw new Error('FCM Token 업데이트에 실패했습니다.');
    }
};