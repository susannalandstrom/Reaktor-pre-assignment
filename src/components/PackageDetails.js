import React from 'react';

function PackageDetails({packages, selectedPackage, setSelectedPackage}) {
    const packageNames = packages.map(item => item.Package)

    return (
      <div className="selectedPackage">
          {selectedPackage ? 
          <div>
            <h2>{selectedPackage.Package}</h2> 
            <h3>Description:</h3>
            <p style={{ marginBottom: '20px' }}>{selectedPackage.Description}</p>
            <h3>Dependencies:</h3>
            {selectedPackage.Depends 
            ? selectedPackage.Depends.map((dependency => {
                if (packageNames.includes(dependency)) {
                    return <p   key={dependency}
                                className="dependency" 
                                onClick={() => setSelectedPackage(packages.filter(item => item.Package === dependency)[0])}>
                                {dependency}
                            </p>
                }
                else {
                    return <p key={dependency}>{dependency}</p>
                }    
            }
                
            )) 
            : "None"}
            {/* <p>Reverse dependencies: {selectedPackage.Depends ? selectedPackage.Depends : "None"}</p> */}
          </div>
          : 'Loading'}
            
      </div>
    );
  }
  
  export default PackageDetails;