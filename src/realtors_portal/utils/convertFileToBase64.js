// import nextBase64 from 'next-base64';

export const convertBase64 = file => {
  //deprecated
  const result = new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = error => {
      reject(error);
    };
  });
  result.then(
    res => {
      return res;
    },
    error => {}
  );
};

export const encodeFileToBase64 = (file, removePrefix) => {
  return new Promise((resolve, reject) => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64 = removePrefix
        ? reader.result.replace('data:', '').replace(/^.+,/, '')
        : reader.result;
      resolve(base64);
    };
    reader.onerror = error => reject(error);
  });
  // nextBase64.encode(file)
};

export const extractBase64 = arr => arr.map(file => file.image);

// export const extractBase64 = (arr) => arr.map((file) => nextBase64.encode(file.image));
// export const extractBase64 = (arr) => arr.map((file) => file.image.substring(file.image.search('base64,') + 7));

/* USAGE : 
    DESCRIPTION: For every image/file uploaded by the user, create a base64 string for each of those files, and then setFiles to the base64 string, file deatails, and the preview (to display the image uploaded)
  
   acceptedFiles.forEach((file) =>
          encodeFileToBase64(file)
            .then((res) => {
              setFiles((prevValue) => [
                ...prevValue,
                Object.assign({image: res}, file, {
                  preview : URL.createObjectURL(file)
                })
              ]);
            })
            .catch((err) => {
              return err;
            })
        );
  */
