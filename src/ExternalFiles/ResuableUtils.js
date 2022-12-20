//JS functions taked from Justin Mitchel to handle image downloads/uploads

// A few JavaScript Functions for Images and Files
// Author: Justin Mitchel
// Source: https://kirr.co/ndywes Github: https://github.com/codingforentrepreneurs/Try-Reactjs/blob/master/src/learn/ResuableUtils.js

// Convert a Base64-encoded string to a File object
export function base64StringtoFile (base64String, filename) {
    var arr = base64String.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], filename, {type: mime})
  }
  
  // Download a Base64-encoded file
  
  export function downloadBase64File (base64Data, filename) {
    var element = document.createElement('a')
    element.setAttribute('href', base64Data)
    element.setAttribute('download', filename)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }
  
  // Extract an Base64 Image's File Extension
  export function extractImageFileExtensionFromBase64 (base64Data) {
    return base64Data.substring('data:image/'.length, base64Data.indexOf(';base64'))
  }
  

  //Below function was edited to take additional parameter with origional pictures natural dimensions so percent crop can be used instead of pixel crop
  // Base64 Image to Canvas with a Crop
  export function image64toCanvasRef (canvasRef, image64, percentCrop, naturalDims) {
    const canvas = canvasRef // document.createElement('canvas');
    canvas.width = percentCrop.width * naturalDims.width / 100
    canvas.height = percentCrop.height * naturalDims.height / 100
    const ctx = canvas.getContext('2d')
    const image = new Image()
    //console.log(percentCrop)
    image.src = image64
    console.log(percentCrop.width * naturalDims.width / 100, percentCrop.height * naturalDims.height / 100)
    image.onload = function () {
      ctx.drawImage(
        image,
        percentCrop.x * naturalDims.width / 100,
        percentCrop.y * naturalDims.height / 100,
        percentCrop.width * naturalDims.width / 100,
        percentCrop.height * naturalDims.height / 100,
        0,
        0,
        percentCrop.width * naturalDims.width / 100,
        percentCrop.height * naturalDims.height / 100
      )
    }
  }
//Origional below
  // export function image64toCanvasRef (canvasRef, image64, pixelCrop) {
  //   const canvas = canvasRef // document.createElement('canvas');
  //   canvas.width = pixelCrop.width
  //   canvas.height = pixelCrop.height
  //   const ctx = canvas.getContext('2d')
  //   const image = new Image()
  //   console.log(pixelCrop)
  //   image.src = image64
  //   image.onload = function () {
  //     ctx.drawImage(
  //       image,
  //       pixelCrop.x,
  //       pixelCrop.y,
  //       pixelCrop.width,
  //       pixelCrop.height,
  //       0,
  //       0,
  //       pixelCrop.width,
  //       pixelCrop.height
  //     )
  //   }
  // }