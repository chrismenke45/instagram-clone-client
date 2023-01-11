import { storage } from './firebase';
import {
    ref, 
    deleteObject
} from 'firebase/storage';


async function deleteFile(imageFileUrl: string) {
    const imageRef = ref(storage, imageFileUrl);
    return deleteObject(imageRef)
        .then(snapshot => {
            return "File deleted"
        })
};

export default deleteFile