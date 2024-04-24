import { React, useEffect, useRef, useState } from 'react';
import { SearchResult } from '../../components/SearchResult/SearchResult';
import './search.css'

/**
 * Creates a dummy search page
 */
export const Search = () => {
    
    // Pseudo enum for types of search
    const SearchTypes = {
        TITLE: "Title",
        TAG: "Tag"
    }

    const [tags, setTags] = useState(null); // List of tags, created on initial load
    const [searchResults, setSearchResults] = useState(null); // List of user ids returned from search
    const [pageNumber, setPageNumber] = useState(1); // Current page number (1 is first page)
    const [resultsPerPage, setResultsPerPage] = useState(10);
    const [searchType, setSearchType] = useState(SearchTypes.TITLE);

    const searchQuery = useRef('')

    /**
     * This runs on component load, simply loads in list of ALL tags and list of
     * all search results
     */
    useEffect(() => {
        fetchAllTags();
        fetchInitialResults();
    }, [])

    /**
     * This runs upon the search results being updated
     */

    /**
     * Gets the list of all tags
     */
    const fetchAllTags = async () => {
        try {
            const tagResponse = await fetch('http://localhost:4000/api/search/tags');
            const tagData = await tagResponse.json();
            
            setTags(tagData)

        } catch (error) {
            console.error('Error fetching tags:', error)
        }
    }

    /**
     * Gets the list of all ids for the initial loading of the page
     */
    const fetchInitialResults = async () => {
        try {
            const idResponse = await fetch('http://localhost:4000/api/search/all');
            const idData = await idResponse.json();
            
            setSearchResults(idData)

        } catch (error) {
            console.error('Error fetching inital load:', error)
        }
    }

    const onSearchClick = async () => {
        const searchValue = searchQuery.current.value
        console.log(searchValue)

        try {

            // Search by title
            if (searchType == SearchTypes.TITLE) {
                
                // Handle empty case
                if (!searchValue) {
                    fetchInitialResults();
                    return
                }
                
                const idResponse = await fetch(`http://localhost:4000/api/search/title/${searchValue}`);
                const rawIdData = await idResponse.json()

                console.log(rawIdData)

                // raw data in array of objects like {_id: "id number"}, so convert that
                const ids = rawIdData.map((obj) => obj._id);
                console.log(ids);
                setSearchResults(ids);
            }
            
            // Search by tag
            else {
                const idResponse = await fetch(`http://localhost:4000/api/search/tag/${searchValue}`);
                const rawIdData = await idResponse.json()

                // raw data in array of objects like {_id: "id number"}, so convert that
                const ids = rawIdData.map((obj) => obj._id);
                console.log(ids);
                setSearchResults(ids);
            }
        } catch (error) {
            console.log("Search error occured:", error)
        }
    }

    const onTypeClick = (type) => {
        setSearchType(type);
    }

    return (
        <>
            <h5>
                <center>Welcome to the Search Page</center>
            </h5>

            <div className="search_container">
                <input
                    type="text"
                    placeholder="Search by keyword, title, description"
                    ref={searchQuery}
                    style={{ width: '600px' }}
                    onKeyDown={(event) => {
                        if (event.key === 'Enter') {
                            onSearchClick()
                        }
                    }}
                />
                <button onClick={onSearchClick} className='search_button'>
                    <img src="/searchIcon.svg" alt="Search Icon"/>
                </button>
            </div>

            <div className='search_type-toggle-container'>
                <p className='search_type-description'>Search by Title or Tag</p>
                <button 
                    className='search_type-button'
                    onClick={() => onTypeClick(SearchTypes.TITLE)}
                    style={{backgroundColor: searchType === SearchTypes.TITLE ? '#861f41' : 'gray'}}
                >{SearchTypes.TITLE}</button>
                <button 
                    className='search_type-button'
                    onClick={() => onTypeClick(SearchTypes.TAG)}
                    style={{backgroundColor: searchType === SearchTypes.TAG ? '#861f41' : 'gray'}}
                >{SearchTypes.TAG}</button>
            </div>

            <div className='search_maincontent'>
                <div className='search_results-container'>
                    {searchResults && searchResults.map(id => (
                        <SearchResult key={id} userID={id}></SearchResult>
                    ))}
                </div>
            </div>
        </>
    )
}