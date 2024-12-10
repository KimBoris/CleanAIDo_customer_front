// // Scripts for firebase and firebase messaging
// importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
//
//
// importScripts(
//     "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
// );
//
//
// const firebaseConfig = {
//     apiKey: import.meta.env.VITE_FCM_API_KEY,
//     authDomain: "cleanaido-29788.firebaseapp.com",
//     projectId: "cleanaido-29788",
//     storageBucket: "cleanaido-29788.firebasestorage.app",
//     messagingSenderId: "700069476960",
//     appId: "1:700069476960:web:5219966c017dc50790e105",
//     measurementId: "G-X32L7ZE4XR"
// };
//
// firebase.initializeApp(firebaseConfig);
//
// // Retrieve firebase messaging
// const messaging = firebase.messaging();
//
//
// messaging.onBackgroundMessage((payload) => {
//     const notificationTitle = payload.notification.title;
//     const notificationOptions = {
//         body: payload.notification.body,
//         icon: payload.notification.image,
//     };
//
//
//     self.registration.showNotification(notificationTitle, notificationOptions);
// });
//
//
// console.log("--------------------------------")
// console.log("--------------------------------")
