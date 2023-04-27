import React from 'react';

function MySelect(props) {
    return (
        <div className={'select__container'}>
            <span className="logIn__item_title">{props.title}</span>
            <select className='gender__select'>
                <option selected disabled>Choose your gender</option>
                <option className='gender__var'>{props.name1}</option>
                <option className='gender__var'>{props.name2}</option>
            </select>
        </div>
    );
}

export default MySelect;