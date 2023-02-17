import React, { useState, useContext, useEffect, useRef } from 'react';
import ImageCropperContext from '../../stateManagement/contexts/ImageCropperContext';
import ImageCropper from '../inner/ImageCropper';
import imageCropperActions from '../../stateManagement/actions/imageCropperActions';
import deleteFile from '../../firebase/deleteFile';
import FetchAPI from '../../functions/fetch/FetchAPI';
import getUserObject from '../../functions/user/getUserObject';
import { FaArrowLeft } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

const Post: React.FC = () => {
    const [postInfo, setPostInfo] = useState({ photoUrl: "", caption: "" })
    const { imageCropperState, imageCropperDispatch } = useContext(ImageCropperContext)
    const submitRef = useRef<HTMLButtonElement>(null)
    const navigate = useNavigate()
    const fetcher = new FetchAPI()

    useEffect(() => {
        imageCropperDispatch(imageCropperActions.CLOSE_CROPPER())
    }, [])

    useEffect(() => {
        setPostInfo(prev => {
            return {
                ...prev,
                photoUrl: imageCropperState.photoUrl
            } 
        })
    }, [imageCropperState.photoUrl])

    const handleCaptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPostInfo(prev => {
            return { ...prev, caption: e.target.value }
        })
    }
    const handleCropperOpen = (e: React.MouseEvent<HTMLImageElement, MouseEvent> | React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        e.preventDefault()
        imageCropperDispatch(imageCropperActions.OPEN_CROPPER(postInfo.photoUrl))
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const user = getUserObject()
        if (postInfo.photoUrl) {
            fetcher.buildFormData([
                ["post[caption]", postInfo.caption.trim()],
                ["post[picture_url]", postInfo.photoUrl],
            ])
            fetcher.fetchData("posts", "POST", user.jwt)
                .then(data => {
                    console.log(data)
                    navigate('/')
                })
                .catch(err => {
                    console.error(err)
                })
        }
    }
    const handleSubmitButton = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        e.preventDefault()
        if (submitRef?.current) {
            submitRef.current.click()
        }
    }

    return (
        <main>
            <form onSubmit={handleSubmit}>
                <div id='postBanner'>
                    <FaArrowLeft onClick={() => navigate(-1)} className='arrowBack'></FaArrowLeft>
                    <span onClick={handleSubmitButton} className='arrowNextBack next'>Post</span>
                    <button type='submit' ref={submitRef} hidden={true}>Submit</button>
                </div>
                <div className='photoTextSideBySide'>
                    {postInfo.photoUrl ? (
                        <img src={postInfo.photoUrl} onClick={handleCropperOpen} className="photoTextPhoto" alt="Your photo isn't loading :("></img>
                    ) : (
                        <span className='photoTextPhoto' onClick={handleCropperOpen}>Select Photo</span>
                    )}
                    <textarea
                        className='photoTextText'
                        name="caption"
                        placeholder="Write a caption..."
                        maxLength={2200}
                        value={postInfo.caption}
                        onChange={handleCaptionChange}>
                    </textarea>
                </div>
                {imageCropperState.showImageSelect && <ImageCropper imageFolder={'posts'} ruleOfThirds={true} circularCrop={false} />}
                <button type='submit' hidden={true}>Submit</button>
            </form>

        </main>
    );
}

export default Post;