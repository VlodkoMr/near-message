import { File, NFTStorage } from '../assets/js/nft-storage.esm.min';

export const uploadMediaToIPFS = (media) => {
  return new Promise(async (resolve, reject) => {
    const name = `${+new Date()}.png`;
    const image = new File([ media ], name, {
      type: media.type,
      lastModified: new Date().getTime()
    });

    const nftStorage = new NFTStorage({ token: process.env.NFT_STORAGE_KEY });
    const token = await nftStorage.store({
      image,
      name,
      description: `Group Logo ${name}`,
    });

    if (token.url) {
      resolve(token.data.image.pathname.replace('//', ''));
    }
    reject("Error: IPFS Upload failed");
  })
}

export const resizeFileImage = (file, max_width, max_height) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      const img = document.createElement("img");
      img.src = e.target.result;

      setTimeout(() => {
        const canvas = document.createElement("canvas");
        let ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);

        let width = img.width;
        let height = img.height;
        if (width > height) {
          if (width > max_width) {
            height *= max_width / width;
            width = max_width;
          }
        } else {
          if (height > max_height) {
            width *= max_height / height;
            height = max_height;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        canvas.toBlob(result => {
          if (result) {
            resolve(result);
          } else {
            reject("Can't read image")
          }
        }, file.type);
      }, 300);
    };
    reader.readAsDataURL(file);
  });
}
