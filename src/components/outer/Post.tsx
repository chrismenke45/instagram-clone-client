import React, { useState, useContext, useEffect } from 'react';
import ImageCropperContext from '../../stateManagement/contexts/ImageCropperContext';
import ImageCropper from '../inner/ImageCropper';
import imageCropperActions from '../../stateManagement/actions/imageCropperActions';
import deleteFile from '../../firebase/deleteFile';
import buildFormData from '../../functions/fetch/buildFormData';
import fetchData from '../../functions/fetch/fetchData';
import getUserObject from '../../functions/user/getUserObject';

const Post: React.FC = () => {
    const [postInfo, setPostInfo] = useState({ photoUrl: "", caption: "" })
    const { imageCropperState, imageCropperDispatch } = useContext(ImageCropperContext)

    useEffect(() => {
        setPostInfo(prev => {
            return {
                ...prev,
                photoUrl: imageCropperState.photoUrl
            }
        })
    }, [imageCropperState.photoUrl])

    const handleCaptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPostInfo(prev => {
            return { ...prev, caption: e.target.value }
        })
    }
    const handleCropperOpen = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        imageCropperDispatch(imageCropperActions.OPEN_CROPPER())
        if (!imageCropperState.showImageSelect && postInfo.photoUrl !== "") {
            deleteFile(postInfo.photoUrl)
            .catch(err => {
                console.error(err)
            })
        } 
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let data = buildFormData([
            ["post[caption]", postInfo.caption],
            ["post[picture_url]", postInfo.photoUrl],
        ])
        const userObject = getUserObject()
        fetchData("posts", "POST", data, (userObject ? userObject.jwt : undefined))
            .then(data => {
                console.log(data)
            })
    }

    return (
        <main>
            <form  onSubmit={handleSubmit}>
                {postInfo.photoUrl && <img src={postInfo.photoUrl} alt="Your photo isn't loading :("></img>}
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
                <button className='openerOption' onClick={handleCropperOpen}>{postInfo.photoUrl ? "Change Picture" : "Select Image" }</button>
                {imageCropperState.showImageSelect && <ImageCropper imageFolder={'posts'} ruleOfThirds={true} circularCrop={false}/>}
                <button type='submit'>Submit</button>
            </form>
            
        </main>
    );
}

export default Post;