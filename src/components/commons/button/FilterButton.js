import React from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import '../../../static/styles/css/filter-button.css';

function FilterButton({ handleFilterChange, selectedRegion, selectedTradingMethod }) {
  
  const regions = ['전체', '강남구', '강동구', '강북구', '강서구', '관악구', '광진구', '구로구', '금천구', '노원구', '도봉구', '동대문구', '동작구', '마포구', '서대문구', '서초구', '성동구', '성북구', '송파구', '양천구', '영등포구', '용산구', '은평구', '종로구', '중구', '중랑구','기타'];
  const traidingMethods = ['전체', '택배', '직거래'];

  return (
    <div className='filter-btns'>
      <DropdownButton id="region-dropdown" variant="success" title={selectedRegion} className='dropdown-button'>
        {regions.map(region => (
          <Dropdown.Item key={region} onClick={() => handleFilterChange('region', region)}>
            {region}
          </Dropdown.Item>
        ))}
      </DropdownButton>

      <DropdownButton id="trading-method-dropdown" variant="success" title={selectedTradingMethod}>
        {traidingMethods.map(method => (
          <Dropdown.Item key={method} onClick={() => handleFilterChange('tradingMethod', method)}>
            {method}
          </Dropdown.Item>
        ))}
      </DropdownButton>
    </div>
  );
}

export default FilterButton;