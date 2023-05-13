import React, {FC} from 'react';
import './MySelect.css';

interface mySelectProps {
    title: string,
}
const MySelect:FC<mySelectProps> = ({title}) => {
    return (
        <div className={'select__container'}>
            <span className={'select__title'}>{title}</span>
            <select className={'select__myselect'}>
                <option selected className={'select__myselect_option'}>gender</option>
                <option className={'select__myselect_option'}>male</option>
                <option className={'select__myselect_option'}>female</option>
            </select>
        </div>
    );
};

export default MySelect;