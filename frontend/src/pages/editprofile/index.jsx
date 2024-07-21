import { React, useEffect, useState } from 'react';
import './editprofile.css'
import { useParams } from 'react-router-dom';
import { AuthenticatedTemplate, useMsal, UnauthenticatedTemplate } from '@azure/msal-react';

export const EditProfile = () => {
  const { instance } = useMsal();
  let activeAccount;
  if (instance) {
    activeAccount = instance.getActiveAccount();
  }
  
  const username = activeAccount ? activeAccount.username : 'Unknown';
  const [userData, setUserData] = useState({});
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState("");
  const [file, setFile] = useState(null);

  useEffect( () => {
    fetchUserData();
  }, []
)
    

  const fetchUserData = async() => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_HOSTNAME}/api/profile/${username}`);
      const parsedUserData = await response.json();
      setUserData(parsedUserData);
      setTitle(parsedUserData.title); // Set title from fetched data
      setTags(parsedUserData.tags); // Set tags from fetched data
      setFile(parsedUserData.file)
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const handleCancel = () => {

  };

  const handleAddTag = async() => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_HOSTNAME}/api/profile/tag/${username}/${currentTag}`,
        {method: 'POST'}
      )
      setTags(tags.concat([currentTag]))
      setCurrentTag("")
    } catch (error) {
      console.error('Update failed:', error);
    }
  }

  // Function to handle removing a tag
  const handleRemoveTag = async (tagString) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_HOSTNAME}/api/profile/tag/${username}/${tagString}`,
        {method: 'DELETE'}
      )
      const newTags = tags.filter(tag => tag !== tagString)
      setTags(newTags)
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  return (
    <>
      <AuthenticatedTemplate>
        <div className="edit-container">
          <h5>Welcome to the Edit Profile page</h5>
          <div className="title-wrapper">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required/>
            <br /><br />
          </div>
          <div className="tags">
            <label htmlFor="tags">Tags</label>
            <input
                type="text"
                id="tags"
                name="tags"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
            />
            <button onClick={() => handleAddTag()}>Add Tag</button>
            <div className="tag-wrapper">
              {tags && tags.map(tag => (
                <div>
                  <p>{tag}</p>
                  <img src="/images/redTrashcanIcon.png" width="50" height="50" onClick={() => handleRemoveTag(tag)}/>
                </div>
              ))}
            </div>
            <br /><br />
          </div>
          <div className="upload"> 
            <label htmlFor="file">Upload File:</label>
            <input
              type="file"
              id="file"
              name="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <br /><br />
          </div>
          <div className="save-cancel-wrapper">
            <button className="save-btn" type="submit">SAVE</button>
            <button className="cancel-btn" type="button" onClick={handleCancel}>CANCEL</button>
          </div>
        </div>
      </AuthenticatedTemplate>    
    </>
  )

}

export default EditProfile;
