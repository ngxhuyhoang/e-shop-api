// import { Injectable } from '@nestjs/common';
// // import admin from 'firebase-admin';
// // import * as firebaseKey from './ngxhuyhoang-task-tracker-x-firebase-adminsdk.json';

// @Injectable()
// export class FirebaseAdminService {
//   constructor() {
//     admin.initializeApp({
//       credential: admin.credential.cert({
//         projectId: firebaseKey.project_id,
//         clientEmail: firebaseKey.client_email,
//         privateKey: firebaseKey.private_key,
//       }),
//     });
//   }

//   async verifyToken(idToken: string) {
//     try {
//       return admin.auth().verifyIdToken(idToken);
//     } catch (error) {
//       throw error;
//     }
//   }
// }
