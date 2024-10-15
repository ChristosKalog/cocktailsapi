// const loadImageAsBase64WithHash = async (imageName) => {
//   const imagePath = require(`../assets/images/${imageName}`);
//   const img = new Image();
//   img.src = imagePath;

//   // Utility to hash an image's content
// const getImageHash = (imageData) => {
//   return crypto.subtle.digest("SHA-256", new TextEncoder().encode(imageData))
//     .then((hashBuffer) => {
//       const hashArray = Array.from(new Uint8Array(hashBuffer));
//       return hashArray.map((byte) => byte.toString(16).padStart(2, "0")).join("");
//     });
// };


//   return new Promise((resolve, reject) => {
//     img.onload = async () => {
//       const canvas = document.createElement("canvas");
//       canvas.width = img.width;
//       canvas.height = img.height;
//       const ctx = canvas.getContext("2d");
//       ctx.drawImage(img, 0, 0);
//       const base64String = canvas.toDataURL("image/png");

//       // Compute hash for the new base64 image
//       const newHash = await getImageHash(base64String);

//       // Check if the image and its hash are already in localStorage
//       const storedImageData = localStorage.getItem(imageName);
//       const storedHash = localStorage.getItem(`${imageName}_hash`);

//       if (storedHash !== newHash || !storedImageData) {
//         // If hashes don't match or image is not stored, store the new image and hash
//         localStorage.setItem(imageName, base64String);
//         localStorage.setItem(`${imageName}_hash`, newHash);
//       }

//       resolve(base64String);
//     };

//     img.onerror = (error) => {
//       reject(error);
//     };
//   });
// };
