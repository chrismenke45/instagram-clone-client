import React, { useState } from 'react';
//import ImageCropper from '../inner/ImageCropper';

const Post: React.FC = () => {
    const [postInfo, setPostInfo] = useState({ photoUrl: "", caption: "" })

    const handleCaptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPostInfo(prev => {
            return { ...prev, caption: e.target.value }
        })
    }

    return (
        <main>
            {/*<ImageCropper />*/}
            <form>
                <div className='formGroup'>
                    <input
                        type="text"
                        name="caption"
                        placeholder="Caption (optional)"
                        minLength={3}
                        maxLength={30}
                        value={postInfo.caption}
                        onChange={handleCaptionChange}>
                    </input>
                </div>
            </form>
        </main>
    );
}

export default Post;