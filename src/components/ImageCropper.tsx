import React, { useState, useRef } from 'react';
import ImageCrop from './ImageCrop';
import ReactCrop, {
    centerCrop,
    makeAspectCrop,
    Crop,
    PixelCrop
} from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

import {
    base64StringtoFile,
    downloadBase64File,
    extractImageFileExtensionFromBase64,
    image64toCanvasRef
} from '../ExternalFiles/ResuableUtils'
import { type } from 'os';

const ImageCropper: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const originalImageRef = useRef<HTMLImageElement>(null)
    const [crop, setCrop] = useState<Crop>()
    const [imgSrc, setImgSrc] = useState<string>('')
    const [imgExt, setImgExt] = useState<string>('')
    const acceptedImageFileTypesArray: string[] = ["image/png", "image/gif", "image/jpeg"]
    const acceptedImageMaxSize: number = 100000


    const verifyFile = (files: FileList | null) => {
        if (files && files.length > 0) {
            const currentFile: File = files[0]
            const currentFileType = currentFile.type
            const currentFileSize = currentFile.size
            //console.log(currentFileSize, currentFileType)
            if (currentFileSize > acceptedImageMaxSize) {
                alert("This file is not allowed. " + currentFileSize + " bytes is too large")
                return false
            }
            if (!acceptedImageFileTypesArray.includes(currentFileType)) {
                alert("This file is not allowed. Only images are allowed.")
                return false
            }
            return true
        } else { return false }
    }

    const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            //verifyFile(e.target.files)

            if (verifyFile(e.target.files)) {
                // imageBase64Data 
                const currentFile: File | null = e.target.files[0]
                const myFileItemReader = new FileReader()
                myFileItemReader.addEventListener("load", () => {
                    //const myResult = myFileItemReader.result
                    const myResult = myFileItemReader.result?.toString() || ""
                    //console.log(myResult)
                    setImgSrc(myResult)
                    setImgExt(extractImageFileExtensionFromBase64(myResult))
                    //console.log(typeof extractImageFileExtensionFromBase64(myResult), extractImageFileExtensionFromBase64(myResult))
                }, false)

                myFileItemReader.readAsDataURL(currentFile)

            }
        }
    }

    const onImgLoaded = (image: any) => {
        console.log(image)
    }
    const onCropChange = (_: any, crop: Crop) => {
        //console.log(_, crop)
        setCrop(crop)
    }
    const onCropComplete = (pixelCrop: Crop, percentCrop: any) => {
        const originalDims = {
            height: originalImageRef.current?.naturalHeight,
            width: originalImageRef.current?.naturalWidth,
        }
        console.log(originalDims)
        console.log(percentCrop, pixelCrop)
        image64toCanvasRef(canvasRef.current, imgSrc, percentCrop, originalDims)
    }

    const onCropImageClick = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (imgSrc && canvasRef.current) {

            const imageData64 = canvasRef.current.toDataURL('image/' + imgExt)

      
            const myFilename:string = Date.now().toString() + (Math.floor(Math.random() * 1000)).toString() + "." + imgExt

            // file to be uploaded
            const myNewCroppedFile = base64StringtoFile(imageData64, myFilename)
            // download file
            
            downloadBase64File(imageData64, myFilename)
            //this.handleClearToDefault()
        }
        

    }


    return (
        <div>
            <label
                htmlFor='picture'>
                Photo:
            </label>
            <input
                type="file"
                name="picture"
                accept="image/png, image/gif, image/jpeg"
                multiple={false}
                onChange={onSelectFile}>

            </input>
            <ReactCrop
                crop={crop}
                onChange={onCropChange}
                onComplete={onCropComplete}
                aspect={1}
                ruleOfThirds={true}>
                {!!imgSrc && <img
                    src={imgSrc}
                    alt="crop"
                    id="imageToCrop"
                    ref={originalImageRef}
                    onLoad={onImgLoaded} />
                }
            </ReactCrop>
            <p>Preview Canvas</p>
            <canvas ref={canvasRef}></canvas>
            {canvasRef.current && <button onClick={(e) => onCropImageClick(e)}>yee</button>}
        </div>
    );
}

export default ImageCropper;