import { storage } from './firebase';
import {
    ref, 
    deleteObject
} from 'firebase/storage';


async function deleteFile(imageFileUrl: string) {
    const imageRef = ref(storage, imageFileUrl);
    if (imageFileUrl === process.env.REACT_APP_DEFAULT_PROFILE_PICTURE || imageFileUrl === process.env.REACT_APP_NOT_FOUND_PICTURE) {
        return new Promise((resolve, reject) => reject("Guest profile picture and not found picture cannot be deleted"))
    }
    return deleteObject(imageRef)
        .then(snapshot => {
            return "File deleted"
        })
        .catch(err => {
            console.error(err)
            throw new Error(err)
        })
};

export default deleteFile