// const drive = google.drive({
//     version: "v2",
//     auth: KEY
// })

// const docs = google.docs({
//     versions: "v1",
//     auth: KEY
// })

// const sheets = google.sheets({
//     versions: "v4",
//     auth: KEY
// })

// const tasks = google.tasks({
//     versions: "v1",
//     auth: KEY
// })

// // Helper functions

// export async function testDrive(){
//     const res = await drive.files.create({
//         requestBody: {
//           name: 'Test',
//           mimeType: 'text/plain'
//         },
//         media: {
//           mimeType: 'text/plain',
//           body: 'Hello World'
//         }
//       });
// }