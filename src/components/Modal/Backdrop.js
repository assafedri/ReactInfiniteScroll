import React, {useEffect} from 'react';
import classes from './Modal.module.scss';

const Backdrop = (props) => {

    useEffect( () => {
        if(props.show) document.body.style.overflow = "hidden";
        return () => document.body.style.overflow = "auto"
    })

    return(
        props.show ? <div className={classes.Backdrop} onClick={props.clicked}></div> : null
    )
}
export default Backdrop;