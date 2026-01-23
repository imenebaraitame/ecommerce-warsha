import { cloudinary } from '../backend/src/config/cloudinary.js'; // adjust path if needed

console.log('Testing Cloudinary connection...');
console.log('---');

cloudinary.api.ping()
  .then(result => {
    console.log('Cloudinary connected successfully!');
    console.log('Response:', result);
    process.exit(0);
  })
  .catch(err => {
    console.error('Cloudinary connection failed!');
    console.error('Error:', err.message);
    console.error('Full error:', err);
    process.exit(1);
  });