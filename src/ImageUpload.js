
import React,{useState} from 'react'
import firebase from "firebase"
import { db, storage } from './firebase'
import './ImageUpload.css'


function ImageUpload({username}) {
    const [ image, setImage] = useState('')
    const [ progress, setProgress] = useState(0)
    const [ caption, setCaption] = useState('')

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handleUpload = () => {
       const upLoadTask = storage.ref(`images/${image.name}`).put(image);

       upLoadTask.on(
           "state_changed",
           (snapshot) => {
               // progress function ...
               const progress = Math.round(
                   (snapshot.bytesTransferred / snapshot.totalBytes) * 100
               );
               setProgress(progress)
           },
           (error) => {
               //Error function ...
               console.log(error);
               alert(error.message);
           },
           () => {
               // complete function
               storage
                 .ref("images")
                 .child(image.name)
                 .getDownloadURL()
                 .then(url => {
                     //post image inside db
                     db.collection("posts").add({
                         timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                         caption: caption,
                         imageUrl: url,
                         username: username
                     });

                     setProgress(0);
                     setCaption('');
                     setImage(null)

                 })
           }
       )
    }


    return (
        <div className="imageupload">
            <progress className="imageupload__progress" value={progress} max="100" />
            <textarea className="question__textarea" type="text" placeholder="Enter a question..." onChange={event => setCaption(event.target.value)} value={caption} />
            <input type="file" onChange={handleChange} />
            <button className="upload__button" onClick={handleUpload}>
                Upload
            </button>
        </div>
    )
}

export default ImageUpload
