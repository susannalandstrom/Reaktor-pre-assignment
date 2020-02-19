import React from 'react';
import './../App.css';

function ListOfPackages({packages, selectedPackage, setSelectedPackage}) {
    return (
      <div className="list">
          <h1>Packages</h1>
          <ul className="packageList">
            {packages.map((item) => 
                <li 
                    key={item.Package} 
                    onClick={() => setSelectedPackage(item)} 
                    style={item === selectedPackage 
                        ? {color: '#CF3727', backgroundColor: '#FFDAD6', borderRadius: '5px'} 
                        : {}}>
                    {item.Package}
                </li>
            )}
          </ul>
      </div>
    );
  }
  
  export default ListOfPackages;