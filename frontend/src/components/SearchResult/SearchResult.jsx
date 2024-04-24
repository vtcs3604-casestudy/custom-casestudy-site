import { React, useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import './SearchResult.css'

export const SearchResult = ({ userID }) => {
  const [userData, setUserData] = useState(null)

  // Get user data from ID
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/profile/id/${userID}`)
        const data = await response.json()
        console.log(data)
        console.log("Here")
        setUserData(data)
      } catch (error) {
        console.error("Error loading user data: ", error)
      }
    };
    console.log("Fired")
    fetchUserData()
  }, [])


  return (
    <div className="searchresult_container">
      <div className="searchresult_file-preview">
        
      </div>
      <div className="searchresult_title-section">
        <p>
          <strong>Title: </strong>
          <Link to={`/${userData && userData.username}`}>{userData && userData.title}</Link>
        </p>
      </div>
      <div className="searchresult_tags">
        <strong>Tags:</strong>
        {userData && userData.tags.map(tag => (
          <p>{tag}</p>
        ))}
      </div>
    </div>
  )
}