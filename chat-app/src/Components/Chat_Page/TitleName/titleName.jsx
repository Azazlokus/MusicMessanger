import React from 'react';
import '../TitleName/titleName.css'

function TitleName(props) {
    return (
        <div className="local__title">
            <h2 className="local__title_text">{props.name}</h2>
        </div>
    );
}

export default TitleName;