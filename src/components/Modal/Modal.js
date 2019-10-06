import React from 'react';
import Backdrop from './Backdrop';
import classes from './Modal.module.scss';

const Modal = (props) => {
    let modalHtml = '';

    if(props.show){
        modalHtml = (
            <>
                <Backdrop show clicked={props.closed}/>
                <div className={classes.Modal} style={{
                    display: props.show ? 'block' : 'none',
                    opacity: props.show ? '1': '0',
                }}>
                    <div className={classes.Content}>
                        <h3>{props.image.title}</h3>
                        <img src={props.image.url} alt={props.image.title} />
                        <p>Photo ID: {props.image.id}</p>
                        <p>
                            <small>From the album</small><br/>
                            <strong>{props.image.albumId} - {props.albumTitle()}</strong>
                        </p>
                    </div>
                    <button onClick={props.closed}>Close</button>
                </div>
            </>
        )
    }

    return modalHtml;
}

export default Modal;