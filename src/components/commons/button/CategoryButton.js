import React from 'react';
import '../../../static/styles/css/category-button.css';

function CategoryButton({ category, onClick, isSelected}) {

    const imageUrl =  require(`../../../static/styles/images/category/${category}.png`);
    return (
        <button
            className={`circular-button ${isSelected ? 'selected' : ''}`}
            onClick={() => onClick(category)}>
            <img src={imageUrl} alt={category} className='category-image'/>
            <span className='button-font'>{category}</span>
        </button>
    );
}

export default CategoryButton;
