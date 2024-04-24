import React from 'react';
import '../../../static/styles/css/category-button.css';

function CategoryButton({ category, onClick, isSelected,type}) {

    const imageUrl =  require(`../../../static/styles/images/category/${category}.png`);
    
    const buttonClass = `circular-button ${isSelected ? 'selected' : ''} ${type === 'main' ? 'main-type' : ''}`;
    return (
        <button
            className={buttonClass}
            onClick={() => onClick(category)}>
            <img src={imageUrl} alt={category} className='category-image'/>
            <span className='button-font'>{category}</span>
        </button>
    );
}

export default CategoryButton;
