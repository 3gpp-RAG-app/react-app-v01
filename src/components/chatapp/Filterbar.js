// Filterbar.js
import React, { useState, useEffect } from 'react';

const FilterBar = ({ filters, handleFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const toggleFilterBar = () => {
    setIsOpen(!isOpen);
  };

  const handleLocalFilterChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleEntityChange = (e) => {
    const { name, checked } = e.target;
    setLocalFilters((prevFilters) => ({
      ...prevFilters,
      entities: {
        ...prevFilters.entities,
        [name]: checked,
      },
    }));
  };

  const applyFilters = () => {
    handleFilterChange(localFilters);
  };

  return (
    <div className='flex p-1 rounded-md mb-1 flex-col border bg-white'>
      <div className='flex justify-between items-center pl-5 pr-5 pt-2 pb-2'>
        <h2>3gpp Chat V0.1</h2>
        <button onClick={toggleFilterBar} className='border rounded-md p-2 w-36 lg:w-48'>
          {isOpen ? 'Collapse' : 'Filters'}
        </button>
      </div>
      {isOpen && (
        <div className='flex flex-wrap justify-center lg:w-[70%] mx-auto'>
          <div className='flex-1 p-1 min-w-[10%]'>
            <label>Spec number</label>
            <input
              type='text'
              name='specNo'
              value={localFilters.specNo}
              onChange={handleLocalFilterChange}
              className='w-full border rounded-md p-1'
            />
          </div>
          <div className='flex-1 p-1 min-w-[10%]'>
            <label>Target release</label>
            <input
              type='text'
              name='targetRelease'
              value={localFilters.targetRelease}
              onChange={handleLocalFilterChange}
              className='w-full border rounded-md p-1'
            />
          </div>
          <div className='flex-1 p-1 min-w-[10%]'>
            <label>WG status</label>
            <input
              type='text'
              name='wgStatus'
              value={localFilters.wgStatus}
              onChange={handleLocalFilterChange}
              className='w-full border rounded-md p-1'
            />
          </div>
          <div className='flex-1 p-1 min-w-[10%]'>
            <label>TSG status</label>
            <input
              type='text'
              name='tsgStatus'
              value={localFilters.tsgStatus}
              onChange={handleLocalFilterChange}
              className='w-full border rounded-md p-1'
            />
          </div>
          <div className='flex-1 p-1 min-w-[10%]'>
            <label>Meeting</label>
            <input
              type='text'
              name='meeting'
              value={localFilters.meeting}
              onChange={handleLocalFilterChange}
              className='w-full border rounded-md p-1'
            />
          </div>
          <div className='flex-1 p-1 min-w-[10%]'>
            <label>Work item</label>
            <input
              type='text'
              name='workItem'
              value={localFilters.workItem}
              onChange={handleLocalFilterChange}
              className='w-full border rounded-md p-1'
            />
          </div>
          <div className='flex-1 p-1 min-w-[10%]'>
            <label>Entities</label>
            <div className='flex space-x-2'>
              <input
                type='checkbox'
                name='entity1'
                checked={localFilters.entities.entity1}
                onChange={handleEntityChange}
              />
              <input
                type='checkbox'
                name='entity2'
                checked={localFilters.entities.entity2}
                onChange={handleEntityChange}
              />
              <input
                type='checkbox'
                name='entity3'
                checked={localFilters.entities.entity3}
                onChange={handleEntityChange}
              />
            </div>
          </div>
          <div className='flex-1 p-1 min-w-[20%] flex items-center justify-center'>
            <button onClick={applyFilters} className='w-full border rounded-md p-2'>
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;
