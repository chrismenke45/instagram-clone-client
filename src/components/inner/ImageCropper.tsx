import React, { useState, useEffect, useRef, useContext } from 'react';
import ReactCrop, {
    Crop,
} from 'react-image-crop';
import uploadFile from '../../firebase/uploadFile';
import 'react-image-crop/dist/ReactCrop.css';

import {
    extractImageFileExtensionFromBase64,
    image64toCanvasRef
} from '../../ExternalFiles/ResuableUtils'
import ImageCropperContext from '../../stateManagement/contexts/ImageCropperContext';
import imageCropperActions from '../../stateManagement/actions/imageCropperActions';

interface Props {
    imageFolder: string;
    ruleOfThirds: boolean;
    circularCrop: boolean;
}

const ImageCropper: React.FC<Props> = (props) => {
    const { imageFolder, ruleOfThirds, circularCrop } = props
    const { imageCropperState, imageCropperDispatch } = useContext(ImageCropperContext)
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

    const onCropImageClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (imgSrc && canvasRef.current && canvasRef.current) {

            const imageData64 = canvasRef.current.toDataURL('image/' + imgExt)
            uploadFile(imageData64, imageFolder)
                .then(urlString => {
                    if (urlString) {
                        imageCropperDispatch(imageCropperActions.SET_PHOTO(urlString))
                    } 
                })

            // download file
            //downloadBase64File(imageData64, myFilename)
        }


    }
    const onClearToDefault = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (e) e.preventDefault()
        const canvas = canvasRef.current
        if (canvas) {
            const ctx = canvas.getContext('2d');
            ctx && ctx.clearRect(0, 0, canvas.width, canvas.height)
        }

        setImgSrc('')
        setImgExt('')
        setCrop(undefined)
        if (inputRef?.current) { 
            inputRef.current.value = "" 
            inputRef.current.click()
        }
    }
    const onCloseCropper = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        imageCropperDispatch(imageCropperActions.CLOSE_CROPPER())
    }
    const handleSelectPhoto = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (inputRef?.current) {
            inputRef.current.click()
        }
        
    }


    return (
        <div id="imageCropper">
            <label
                htmlFor='picture'>
                Image Cropper
            </label>
            <input
                type="file"
                ref={inputRef}
                name="picture"
                accept="image/png, image/gif, image/jpeg"
                multiple={false}
                hidden={true}
                onChange={onSelectFile}>

            </input>
            {!imgSrc && <button onClick={handleSelectPhoto}>Select Photo</button>}
            <ReactCrop
                crop={crop}
                onChange={onCropChange}
                onComplete={onCropComplete}
                aspect={1}
                ruleOfThirds={ruleOfThirds}
                circularCrop={circularCrop}>

                {!!imgSrc && <img
                    src={imgSrc}
                    alt="crop"
                    id="imageToCrop"
                    ref={originalImageRef} />
                }
            </ReactCrop>
            <canvas className="previewCanvas" ref={canvasRef}></canvas>
            {crop && <button onClick={(e) => onCropImageClick(e)}>Save</button>}
            {canvasRef.current && <button onClick={(e) => onClearToDefault(e)}>Use Different Photo</button>}
            <button onClick={onCloseCropper}>Back</button>
        </div>
    );
}

export default ImageCropper;