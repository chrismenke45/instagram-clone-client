import React, { useState, useRef } from 'react';
import ReactCrop, {
    Crop,
} from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

interface Props {
    src: string;
}

const ImageCrop: React.FC<Props> = ({ src }) => {
    const [crop, setCrop] = useState<Crop>()
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const imgRef = useRef<HTMLImageElement>(null)


    return (
        <div>
            <ReactCrop
                crop={crop}
                onChange={c => {
                    setCrop(c)
                    console.log(c)
                }}
                
                aspect={1}
                ruleOfThirds={true}>
                {<img src={src} />}
            </ReactCrop>
        </div>
    );
}

export default ImageCrop;