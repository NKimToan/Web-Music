import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

function History() {
    return (
        <div>
            <FontAwesomeIcon icon={faArrowLeft} size="2x" className="thin-icon" color="#585261" />
            <FontAwesomeIcon icon={faArrowRight} size="2x" className="ms-4 this-icon" color="#585261" />
        </div>
    )
}

export default History;