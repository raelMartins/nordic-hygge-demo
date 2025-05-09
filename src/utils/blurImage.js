export const image_to_file = url => {
  const fileName = 'myFile.jpg';

  fetch(url).then(async response => {
    const contentType = response.headers.get('content-type');
    const blob = await response.blob();
    const file = new File([blob], fileName, {contentType});
    // access file here
    return file;
  });
};

export function get_blur_image(url) {
  let imageFile = image_to_file(url);
  console.log(imageFile);
  // var reader = new FileReader();
  // reader.onload = function (e) {
  //   var img = document.createElement('img');
  //   img.onload = function (event) {
  //     // Dynamically create a canvas element
  //     var canvas = document.createElement('canvas');

  //     // var canvas = document.getElementById("canvas");
  //     var ctx = canvas.getContext('2d');

  //     // Actual resizing
  //     ctx.drawImage(img, 0, 0, 300, 300);
  //     // Show resized image in preview element
  //     var dataurl = canvas.toDataURL();
  //     console.log({dataurl});
  //     get_blur(dataurl);
  //   };
  //   img.src = e.target.result;
  // };
  // reader.readAsDataURL(imageFile);
}
