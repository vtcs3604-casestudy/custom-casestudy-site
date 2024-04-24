import { React, useEffect, useRef, useState } from 'react';
import { AuthenticatedTemplate, useMsal, UnauthenticatedTemplate } from '@azure/msal-react';
import './editprofile.css'

export const EditProfile = () => {
    const [title, setTitle] = useState("");
    const [tags, setTags] = useState('');
    const [file, setFile] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
    };

    const handleCancel = () => {

    };

    const handleAddTag = () => {

    }

    return (
        <>
            <div className="edit-container">
                <h5>Welcome to the Edit Profile page</h5>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="title">Title</label>
                    <input
                    type="text"
                    id="title"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required/>
                    <br /><br />
                    <label htmlFor="tags">Tags</label>
                    <input
                        type="text"
                        id="tags"
                        name="tags"
                        value={tags}
                        onChange={(e) => setTags(e.target.value)}
                    />
                    <button type="button" onClick={handleAddTag}>Add Tag</button>
                    <br /><br />
                    <label htmlFor="file">Upload File:</label>
                    <input
                        type="file"
                        id="file"
                        name="file"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <br /><br />
                    <div className="save-cancel-wrapper">
                        <button className="save-btn" type="submit">SAVE</button>
                        <button className="cancel-btn" type="button" onClick={handleCancel}>CANCEL</button>
                    </div>
                
                </form>
            </div>      
        </>
    )

}

export default EditProfile;
