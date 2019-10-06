import React from 'react';
import classes from './Images.module.scss';

const Single = (props) => {
    return (
        <div className={classes.Single} key={props.image.id} onClick={() => props.clicked(props.image)}> 
            <img src={props.image.thumbnailUrl} alt={props.image.title} />
            <p>
                <strong>ID: {props.image.id}</strong><br/>
                {props.image.title}
            </p>
        </div>
    )
}

export default Single;