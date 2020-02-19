import React from 'react';

function PackageDetails({selectedPackage}) {
    return (
      <div className="selectedPackage">
          {selectedPackage ? 
          <div>
            <h1 style={{ color: '#CF3727', marginTop: '20px' }}>{selectedPackage.Package}</h1> 
            <h2>Description:</h2>
            <p>{selectedPackage.Description}</p>
            <h2>Dependencies:</h2>
            <p>{selectedPackage.Depends ? selectedPackage.Depends.join(", ") : "None"}</p>
            {/* <p>Reverse dependencies: {selectedPackage.Depends ? selectedPackage.Depends : "None"}</p> */}
          </div>
          : 'Loading'}
            
      </div>
    );
  }
  
  export default PackageDetails;