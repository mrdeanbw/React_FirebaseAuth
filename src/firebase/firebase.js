// var config = {
//     apiKey: "AIzaSyDAy6lU4EGLudZeu6IMRUCB8bCZ0_9-Ufc",
//     authDomain: "fir-chat-62c42.firebaseapp.com",
//     databaseURL: "https://fir-chat-62c42.firebaseio.com",
//     projectId: "fir-chat-62c42",
//     storageBucket: "",
//     messagingSenderId: "760467207802"
// };

var config = {
    apiKey: "AIzaSyBbGRrdyMt9ujephKBgN13U-rZUamc6eWU",
    authDomain: "note-taking-app-7898c.firebaseapp.com",
    databaseURL: "https://note-taking-app-7898c.firebaseio.com",
    projectId: "note-taking-app-7898c",
    storageBucket: "note-taking-app-7898c.appspot.com",
    messagingSenderId: "1072477753169"
};

var firebase = require('firebase');
var firebaseApp = firebase.initializeApp(config);

export default firebaseApp