import { React, useEffect, useState } from 'react';
import { SearchResult } from '../../components/SearchResult/SearchResult';
import SearchBar from '../../components/SearchBar';
import './search.css'

/**
 * Creates a dummy search page
 */
export const Search = () => {
    
    // Pseudo enum for types of search
    const SearchTypes = {
        TITLE: "title",
        TAG: "tag"
    }

    const [tags, setTags] = useState(null); // List of tags, created on initial load
    const [searchResults, setSearchResults] = useState(null); // List of user ids returned from search
    const [pageNumber, setPageNumber] = useState(1); // Current page number (1 is first page)
    const [resultsPerPage, setResultsPerPage] = useState(10);
    const [searchType, setSearchType] = useState(SearchTypes.TITLE); 

    /**
     * This runs on component load, simply loads in list of ALL tags and list of
     * all search results
     */
    useEffect(() => {
        fetchAllTags();
        fetchInitialResults();
    }, [])

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

    return (
        <>
            <h5>
                <center>Welcome to the Search Page</center>
            </h5>
            <SearchBar></SearchBar>
            <div className='search_maincontent'>
                <div className='search_results-container'>
                    {searchResults && searchResults.map(id => (
                        <SearchResult userID={id}></SearchResult>
                    ))}
                </div>
            </div>
        </>
    )
}