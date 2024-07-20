import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import './user.css';

export const UserPage = () => {

  const { username } = useParams();
  const [userData, setUserData] = useState({})
  const [pdfUrl, setPdfUrl] = useState(null);

  // Runs on component load to get user data
  useEffect(() => {
    fetchUserData();
  }, [])

  // Loads the pdf
  useEffect(() => {
    fetchPdf();
  }, [userData]);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_HOSTNAME}/api/profile/${username}`);
      const parsedUserData = await response.json();
      setUserData(parsedUserData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  const fetchPdf = async () => {
    try {
      // console.log(userData.documentId)
      // const response = await fetch(`${process.env.REACT_APP_API_HOSTNAME}/files/${username}/${userData.documentId}`);
      // const pdfBlob = await response.blob();
      // const url = URL.createObjectURL(pdfBlob);
      setPdfUrl(`${process.env.REACT_APP_FILE_HOSTNAME}/${username}/${userData.documentId}`);
    } catch (error) {
      console.error('Error fetching PDF:', error);
    }
  }
  
  return (
    <div className="userpage_main-content">
      <div className="userpage_main-wrapper">
        <center>
          <h4><strong>Title:&nbsp;</strong>{userData.title}</h4>
        </center>
        <p><strong>Author:&nbsp;</strong>{userData.username}</p>
        <div className="userpage_tag-group">
          <p className="userpage_tag-header"><strong>Tags:&nbsp;</strong></p>
          {userData.tags && userData.tags.map(tag => (
            <p className="userpage_tag-label">{tag}</p>
          ))}
        </div>
        {pdfUrl && (
        <iframe src={pdfUrl} className="userpage_pdf"/>
      )}
      </div>
    </div>
  )
}