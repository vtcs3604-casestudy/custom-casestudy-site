import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'

import useFetchWithMsal from '../../hooks/useFetchWithMsal';
import { loginRequest, protectedResources } from "../../authConfig";

import './user.css';

export const UserPage = () => {

  const { username } = useParams();
  const [userData, setUserData] = useState({})

  const { error, execute } = useFetchWithMsal({
    scopes: protectedResources.apiProfile.scopes.write
  });

  useEffect(() => {
    if (!userData) {
      execute("GET", `${protectedResources.apiProfile.endpoint}/${username}`).then((response) => {
        setUserData(response.json())
      });
    }
  }, [execute, userData])

  if (error) {
    console.log("error");
  }

  // Runs on component load to get user data
  useEffect(() => {
    fetchUserData();
  }, [])

  const fetchUserData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_HOSTNAME}/api/profile/${username}`);
      const parsedUserData = await response.json();
      setUserData(parsedUserData);
    } catch (error) {
      console.error('Error fetching user data:', error);
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
        <div>
          {userData.documents && userData.documents.map(doc => (
            <div>
              <Link to={`${process.env.REACT_APP_FILE_HOSTNAME}/${userData.username}/${doc}`}>{doc}</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}