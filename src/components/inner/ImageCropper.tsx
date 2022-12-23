import React, { useState, useRef } from 'react';
import ReactCrop, {
    Crop,
} from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

import {
    base64StringtoFile,
    downloadBase64File,
    extractImageFileExtensionFromBase64,
    image64toCanvasRef
} from '../../ExternalFiles/ResuableUtils'

const ImageCropper: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const originalImageRef = useRef<HTMLImageElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)
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
            if (verifyFile(e.target.files)) {
                // imageBase64Data 
                const currentFile: File | null = e.target.files[0]
                const myFileItemReader = new FileReader()
                myFileItemReader.addEventListener("load", () => {
                    const myResult = myFileItemReader.result?.toString() || ""
                    setImgSrc(myResult)
                    setImgExt(extractImageFileExtensionFromBase64(myResult))
                }, false)

                myFileItemReader.readAsDataURL(currentFile)

            }
        }
    }

    // const onImgLoaded = (image: any) => {
    //     console.log(image)
    // }
    const onCropChange = (pixelCrop: Crop, percentCrop: Crop) => {
        setCrop(percentCrop)
    }
    const onCropComplete = (pixelCrop: Crop, percentCrop: Crop) => {
        const originalDims = {
            height: originalImageRef.current?.naturalHeight,
            width: originalImageRef.current?.naturalWidth,
        }
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
    const onClearToDefault = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) =>{
        if (e) e.preventDefault()
        const canvas = canvasRef.current
        if (canvas) {
            const ctx = canvas.getContext('2d');
            ctx && ctx.clearRect(0, 0, canvas.width, canvas.height)
        }
        
        setImgSrc('')
        setImgExt('')
        setCrop(undefined)
        if (inputRef && inputRef.current) {inputRef.current.value = ""}
    }


    return (
        <div>
            <label
                htmlFor='picture'>
                Photo:
            </label>
            <input
                type="file"
                ref={inputRef}
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
                    ref={originalImageRef} />
                }
            </ReactCrop>
            <p>Preview Canvas</p>
            <canvas ref={canvasRef}></canvas>
            {canvasRef.current && <button onClick={(e) => onCropImageClick(e)}>yee</button>}
            {canvasRef.current && <button onClick={(e) => onClearToDefault(e)}>clear</button>}
        </div>
    );
}

export default ImageCropper;