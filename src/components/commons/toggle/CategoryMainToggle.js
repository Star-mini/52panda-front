import React, { useState, useEffect } from 'react';
import '../../../static/styles/css/category-toggle.css'
import CategoryButton from '../button/CategoryButton';

const categories = ['전자기기', '여성의류', '가구인테리어', '티켓_교환권', '남성의류', '액세서리','생활가전', '생활주방', '가공식품','식물', '반려동물용품', '뷰티_미용','도서_음반', '유아용품', '스포츠_레저','게임_취미', '기타']; 

function CategoryToggle() {
  const [showAll, setShowAll] = useState(false);
  const [categoriesPerRow, setCategoriesPerRow] = useState(9);
  const [firstRowCategories, setFirstRowCategories] = useState([]);
  
  
  const handleCategoryClick = (category) => {
    //category를 넘겨주기
  };
  
  useEffect(() => {
    function handleResize() {
      const windowWidth = window.innerWidth;
      let newCategoriesPerRow;
      if(windowWidth > 1400 ){
        newCategoriesPerRow = 9;
      }
      else if (windowWidth > 1000) {
        newCategoriesPerRow = 6;
      } else if (windowWidth > 768) {
        newCategoriesPerRow = 4;
      } else if ( windowWidth > 500){
        newCategoriesPerRow = 3;
      } else{
        newCategoriesPerRow = 2;
      }
      setCategoriesPerRow(newCategoriesPerRow);
    }

    handleResize(); 
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize); 
  }, []);

  useEffect(() => {
    setFirstRowCategories(categories.slice(0, categoriesPerRow));
  }, [categoriesPerRow]);

  const toggleAllCategories = () => {
    setShowAll(!showAll);
    if (!showAll) {
        setFirstRowCategories(categories); 
    } else {
        setFirstRowCategories(categories.slice(0, categoriesPerRow)); 
    }
  };

  return (
    <div className='category-main-toggle'>
      <div className='all-category-btn'>
        <div className='category-icon'>
        <CategoryButton category="전체" onClick={toggleAllCategories}/>
        </div>

        <div>
            {[...Array(Math.ceil(firstRowCategories.length / categoriesPerRow))].map((_, index) => (
              <div key={index} className='all-category-btn'>
                {firstRowCategories.slice(index * categoriesPerRow, (index + 1) * categoriesPerRow).map((category) => (
              <div key={category} className='category-icon'>
                <CategoryButton category={category} onClick={handleCategoryClick}/>
            </div>
        ))}
      </div>
    ))}
  </div>
      </div>
    </div>
  );
}

export default CategoryToggle;
