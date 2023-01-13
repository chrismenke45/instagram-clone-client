import React, { useState, useContext, useEffect, useRef } from 'react';
import ImageCropperContext from '../../stateManagement/contexts/ImageCropperContext';
import ImageCropper from '../inner/ImageCropper';
import imageCropperActions from '../../stateManagement/actions/imageCropperActions';
import deleteFile from '../../firebase/deleteFile';
import buildFormData from '../../functions/fetch/buildFormData';
import fetchData from '../../functions/fetch/fetchData';
import getUserObject from '../../functions/user/getUserObject';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"

const Post: React.FC = () => {
    const [postInfo, setPostInfo] = useState({ photoUrl: "", caption: "" })
    const { imageCropperState, imageCropperDispatch } = useContext(ImageCropperContext)
    const submitRef = useRef<HTMLButtonElement>(null)
    const navigate = useNavigate()

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
        if (postInfo.photoUrl) {
            let data = buildFormData([
                ["post[caption]", postInfo.caption],
                ["post[picture_url]", postInfo.photoUrl],
            ])
            const userObject = getUserObject()
            fetchData("posts", "POST", data, (userObject ? userObject.jwt : undefined))
                .then(data => {
                    console.log(data)
                    navigate('/')
                })
        }
    }
    const handleSubmitButton = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
        e.preventDefault()
        if (submitRef?.current) {
            submitRef.current.click()
        }
    }

    return (
        <main>
            <form onSubmit={handleSubmit}>
                <div id='postBanner'>
                    <Link to="/">
                        <FaArrowLeft className='arrowNextBack'></FaArrowLeft>
                    </Link>
                    <FaArrowRight onClick={handleSubmitButton} className='arrowNextBack next'></FaArrowRight>
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