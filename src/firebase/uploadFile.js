import { storage } from './firebase';
import {
    ref,
    uploadString,
    getDownloadURL,
} from 'firebase/storage';
import { v4 } from "uuid"

const uploadFile = (imageFile) => {
    if (imageFile == null) return;
    const imageRef = ref(storage, `posts/${v4()}`);
    uploadString(imageRef, imageFile, 'data_url').then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
            console.log(url)
        });
    });
};

export default uploadFile