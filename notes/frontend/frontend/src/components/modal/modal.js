import React, {useEffect, useCallback} from "react";
import ReactDOM from "react-dom";
import {CSSTransition} from "react-transition-group";
import './modal.css';

export default function Modal(props){
   // pressing escape to close
    const onClose = props.onClose;
    const nodeRef = React.useRef(null)
    
    // Redo de closure if the onClose changes eventually (this not happen)
    const closeOnEscapeKeyDown = useCallback(e => {
        if ((e.charCode || e.keyCode) === 27){
            onClose();
        }
    }, [onClose]);

    useEffect(()=>{
        document.body.addEventListener('keydown', closeOnEscapeKeyDown);
        return () =>{
            document.body.removeEventListener('keydown', closeOnEscapeKeyDown);
        }
    }, [closeOnEscapeKeyDown])

    // Avoid to render -> now managed by css
    // if (!props.show)  {
    //     return null
    // }
    
    
    return(
        ReactDOM.createPortal(
        <CSSTransition
            in={props.show}
            nodeRef={nodeRef}
            unmountOnExit
            timeout={{enter: 300,
                     exit: 300,}}
            >
        <div className="modal" ref={nodeRef} onClick={props.onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()} >
                <div className="modal-header">
                    <h4 className="modal-title"> {props.title}</h4>
                </div>
                <div className="modal-body">
                    {props.children}
                </div>
                <div className="modal-footer">
                    <button className="modal-button" onClick={props.onClose}>
                        close
                    </button>
                </div>
            </div>
        </div>
        </CSSTransition>,
        document.getElementById("root")
        )
    )
}