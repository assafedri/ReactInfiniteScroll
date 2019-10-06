import React, {useState, useEffect} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import Single from './Single';
import classes from './Images.module.scss';

const Images = props => {
    // State declerations
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState(false);
    const [displayedimages, setDisplayedImages] = useState([]);

    // After the component mounted
    useEffect( () => {
        // Load the recieved images into the images-to-display state
        if(props.images.length){
            setDisplayedImages(props.images)
        }
       // If Filtering by Album, disable infinite Scroll
        if(props.currentAlbum){
            setActiveFilter(true);
        }else{
            setActiveFilter(false);
        }
    },[props.images, props.currentAlbum])

    // Handle search input field
    const textFilterHandler = e => {
        const etv = e.target.value;
        setSearchQuery(etv);
        setActiveFilter(etv ? true : false);
        setDisplayedImages( props.images.filter( img => img.title.toLowerCase().includes(etv.toLowerCase())));
    }

    // In case there are no results, clicking the Clear button will trigger this method
    // which will revert this component to it's initial state - showing all loaded images
    const clearInputHandler = () => {
        setSearchQuery('')
        setActiveFilter(false)
        setDisplayedImages(props.images)
    }

    // Initial content for image list area
    // Will be displayed if no image found after filtering by title
    let listHTML = (
        <div>
            <h2>No Results</h2>
            <p>Please, check your search query</p>
            <p>Note: you cannot load more images if any filter is active (by album or text)</p>
            <button onClick={clearInputHandler}>Clear search</button>
        </div>
    )

    // Will initalize the InfiniteScroll component
    // and load the relevant images (All / filter Results)
    if(displayedimages.length ){
        listHTML = (
            <div id="scroll" className={classes.Scrollable}>
                <InfiniteScroll
                    className={classes.Items}
                    dataLength={displayedimages.length}
                    next={props.fetch}
                    hasMore={activeFilter ? false : true}
                    loader={<h4>Loading...</h4>}
                    scrollableTarget='scroll'
                    >
                    {displayedimages.map(img => {
                        return <Single 
                        key={img.id}
                        image={img}
                        clicked={props.clicked} />
                    })}
                </InfiniteScroll>
            </div>
        )
    }

    return(
        <div className={classes.Images}>
            <h4>Showing {displayedimages.length} / {props.images.length} Loaded Images</h4>
            <input 
                type="text" 
                placeholder="Filter by name..." 
                value={searchQuery} 
                onChange={textFilterHandler}
            />
            {listHTML}
        </div>
    )
} 

export default Images;

