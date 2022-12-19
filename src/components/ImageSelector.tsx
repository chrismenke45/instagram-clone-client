import React, { useState, useRef } from 'react';
import ImageCrop from './ImageCrop';

const ImageSelector: React.FC = () => {
    const imgRef = useRef(null)
    const [imgSrc, setImgSrc] = useState('')

    function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files.length > 0) {
            //setCrop(undefined) // Makes crop preview update between images.
            const reader = new FileReader()
            reader.addEventListener('load', () =>
                setImgSrc(reader.result?.toString() || ''),
            )
            reader.readAsDataURL(e.target.files[0])
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
                onChange={onSelectFile}>
            </input>

            {imgSrc && <ImageCrop src={imgSrc} /> }
        </div>
    );
}

export default ImageSelector;