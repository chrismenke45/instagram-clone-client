import React, { useState } from 'react';
import ReactCrop, {
    centerCrop,
    makeAspectCrop,
    Crop,
    PixelCrop
} from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

interface Props {
    src: string;
  }

const ImageCrop: React.FC<Props> = ({ src }) => {
    const [crop, setCrop] = useState<Crop>()
    return (
        <ReactCrop 
        crop={crop} 
        onChange={c => setCrop(c)}
        aspect={1}
        ruleOfThirds={true}>
            <img src={src} />
        </ReactCrop>
    );
}

export default ImageCrop;