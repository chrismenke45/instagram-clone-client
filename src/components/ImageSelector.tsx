import React, { useState, useRef } from 'react';
import ImageCrop from './ImageCrop';

import {base64StringtoFile,
    downloadBase64File,
    extractImageFileExtensionFromBase64,
    image64toCanvasRef} from '../ExternalFiles/ResuableUtils'
import { type } from 'os';

const ImageSelector: React.FC = () => {
    const imgRef = useRef(null)
    const [imgSrc, setImgSrc] = useState<string | null>('')
    const [imgExt, setImgExt] = useState<string | null>('')
    const acceptedImageFileTypesArray: string[] = ["image/png", "image/gif", "image/jpeg"]
    const acceptedImageMaxSize: number = 100000


    const verifyFile = (files: FileList | null) => {
        if (files && files.length > 0){
            const currentFile: File = files[0]
            const currentFileType = currentFile.type
            const currentFileSize = currentFile.size
            console.log(currentFileSize, currentFileType)
            if(currentFileSize > acceptedImageMaxSize) {
                alert("This file is not allowed. " + currentFileSize + " bytes is too large")
                return false
            }
            if (!acceptedImageFileTypesArray.includes(currentFileType)){
                alert("This file is not allowed. Only images are allowed.")
                return false
            }
            return true
        } else { return false}
    }

    function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files.length > 0) {
        //verifyFile(e.target.files)
         
            if (verifyFile(e.target.files)){
                // imageBase64Data 
                const currentFile: File | null = e.target.files[0]
                const myFileItemReader = new FileReader()
                myFileItemReader.addEventListener("load", ()=>{
                    //const myResult = myFileItemReader.result
                    const myResult = myFileItemReader.result?.toString() || ""
                    console.log(myResult)
                    setImgSrc(myResult)
                    setImgExt(extractImageFileExtensionFromBase64(myResult))
                    console.log(typeof extractImageFileExtensionFromBase64(myResult), extractImageFileExtensionFromBase64(myResult))
                }, false)

                myFileItemReader.readAsDataURL(currentFile)

            }
        }
        //  {
        //     const reader = new FileReader()
        //     reader.addEventListener('load', () =>
        //         setImgSrc(reader.result?.toString() || ''),
        //     )
        //     reader.readAsDataURL(e.target.files[0])
        // }
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

            {imgSrc && <ImageCrop src={imgSrc} /> }
        </div>
    );
}

export default ImageSelector;