import React from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import '../../../static/styles/css/filter-button.css';

function FilterButton({ handleFilterChange, selectedRegion, selectedTradingMethod }) {
  
  const regions = ['전체', '관악구', '동작구', '서초구', '송파구'];
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