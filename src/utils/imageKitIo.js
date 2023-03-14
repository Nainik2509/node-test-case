
// SDK initialization

const ImageKit = require("imagekit");

var imagekit = new ImageKit({
  publicKey: "public_2f+fmAKDcEH0LjmA718D3ZgY39o=",
  privateKey: "private_Z8SxaD9l9L3hce1PEERamTxhBlo=",
  urlEndpoint: "https://ik.imagekit.io/scapper"
});
module.exports = imagekit;
