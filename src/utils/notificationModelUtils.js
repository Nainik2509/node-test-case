// const GenericUtilities = require("./genericModelUtils");
// const admin = require("firebase-admin");
// const serviceAccount = require("../config/firebasePrivateKey.json");
// var genericUtils = new GenericUtilities();
// const UserModel = require("../api/models/user");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

// class NotificationModelUtilities {
//   constructor () {
//   }

//   async sendNotification(title, body, users,) {
//     var registrationToken = [];

//     for (let index = 0; index < users.length; index++) {
//       const element = users[index];
//       const userData = await genericUtils.modelById(UserModel, element, null, "deviceToken")
//       if (userData.deviceToken && registrationToken.indexOf(userData.deviceToken) === -1) registrationToken.push(userData.deviceToken)
//     }
//     try {
//       var payload = {
//         notification: {
//           title: title,
//           body: body
//         }
//       };

//       var options = {
//         priority: "high",
//         timeToLive: 60 * 60 * 24
//       };
//       var filtereToken = registrationToken.filter(function (el) {
//         return el !== "" || null;
//       });
//       await admin
//         .messaging()
//         .sendToDevice(filtereToken, payload, options)
//         .then(function (message) {
//           return message;
//         })
//         .catch(function (error) {
//           throw error;
//         });
//     } catch (error) {
//       throw error;
//     }
//   }
// }
// module.exports = NotificationModelUtilities;
