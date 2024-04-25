import { React, useEffect, useRef, useState } from 'react';
import { SearchResult } from '../../components/SearchResult/SearchResult';
import './search.css'
import API_HOSTNAME from '../../config';

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
    const [searchResults, setSearchResults] = useState([]); // List of user ids returned from search
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

    // Updates upon a new search
    useEffect(() => {
        setPageNumber(1)
    }, [searchResults])

    /**
     * This runs upon the search results being updated
     */

    /**
     * Gets the list of all tags
     */
    const fetchAllTags = async () => {
        try {
            const tagResponse = await fetch(`${API_HOSTNAME}/api/search/tags`);
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
            const idResponse = await fetch(`${API_HOSTNAME}/api/search/all`);
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

            // Handle empty case
            if (!searchValue) {
                fetchInitialResults();
                return
            }
            
            // Search by title
            if (searchType === SearchTypes.TITLE) {
                
                const idResponse = await fetch(`${API_HOSTNAME}/api/search/title/${searchValue}`);
                const rawIdData = await idResponse.json()

                console.log(rawIdData)

                // raw data in array of objects like {_id: "id number"}, so convert that
                const ids = rawIdData.map((obj) => obj._id);
                console.log(ids);
                setSearchResults(ids);
            }
            
            // Search by tag
            else {
                const idResponse = await fetch(`${API_HOSTNAME}/api/search/tag/${searchValue}`);
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

    const onTypeClick = (event) => {
        setSearchType(event.target.value);
    }

    const onResultsPerPageChange = (event) => {
        const newValue = parseInt(event.target.value, 10); // Convert value to integer
        setResultsPerPage(newValue);
    };

    const onPageChange = (type) => {
        if (type === "INC" && pageNumber < Math.ceil(searchResults.length / resultsPerPage)) {
            setPageNumber(pageNumber + 1);
        }
        else if (type === "DEC" && pageNumber > 0) {
            setPageNumber(pageNumber - 1);
        }
    }

    return (
        <>
            <h5>
                <center>Welcome to the Search Page</center>
            </h5>
            <div className='search_maincontent-wrapper'>
                <div className='search_maincontent'>
                    <div className="search_container">
                        <input className='search_text-bar'
                            type="text"
                            list={searchType===SearchTypes.TAG ? 'tags-list' : ''}
                            placeholder="Search by keyword, title, description"
                            ref={searchQuery}
                            onKeyDown={(event) => {
                                if (event.key === 'Enter') onSearchClick();
                            }}
                        />
                        <datalist id='tags-list'>
                            {tags && tags.map(tag => (
                                <option value={tag}/>
                            ))}
                        </datalist>
                        <select id='typeSelect' value={searchType} onChange={onTypeClick}>
                            <option value={SearchTypes.TITLE}>Title</option>
                            <option value={SearchTypes.TAG}>Tag</option>
                        </select>
                        <button onClick={onSearchClick} className='search_button'>
                            <img src="/searchIcon.svg" alt="Search Icon"/>
                        </button>
                    </div>

                    <div className='search_page-container'>
                        <div className='search_page-num-wrapper'>
                            <button className='search_page-button' id='prev-page' onClick={() => onPageChange("DEC")}>&lt;</button>
                            <p className='search_page-readout'>Page {pageNumber} of {Math.ceil((searchResults.length/resultsPerPage))}</p>
                            <button className='search_page-button' id='prev-page' onClick={() => onPageChange("INC")}>&gt;</button>
                        </div>
                        <select id='resultsPerPageSelect' value={resultsPerPage} onChange={onResultsPerPageChange}>
                            <option value='12'>12 per page</option>
                            <option value='24'>24 per page</option>
                            <option value='48'>48 per page</option>
                        </select>
                    </div>
                    
                    <div className='search_results-container'>
                        {searchResults && searchResults
                        .slice((pageNumber - 1) * resultsPerPage, pageNumber * resultsPerPage)
                        .map(id => (
                            <SearchResult key={id} userID={id}></SearchResult>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}