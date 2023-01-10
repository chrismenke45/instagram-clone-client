import { storage } from './firebase';
import {
    ref,
    uploadString,
    getDownloadURL,
} from 'firebase/storage';
import { v4 } from "uuid"

async function uploadFile(imageFile: string, imageFolder: string) {
    const imageRef = ref(storage, `${imageFolder}/${v4()}`);
    return uploadString(imageRef, imageFile, 'data_url')
        .then(snapshot => getDownloadURL(snapshot.ref))
        .then((url) => url);
};

export default uploadFile