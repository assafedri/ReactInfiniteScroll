import React from 'react';
import classes from './Panel.module.scss';

const Panel = props => {
    let dropdown = '';

    if(props.albums.length){
        dropdown = (
            <select onChange={props.albumChanged}>
                <option>All Albums</option>
                {props.albums.map(album => <option key={album.id} value={album.id}>{album.id} - {album.title}</option>)}
            </select>
        )
    }

    return (
        <div className={classes.Panel}>
            <h1>JSONPlaceholder Infinite Scoll</h1>
            <div className={classes.Dropdown}>{dropdown}</div>
            <hr/>
        </div>
    );
};

export default Panel;