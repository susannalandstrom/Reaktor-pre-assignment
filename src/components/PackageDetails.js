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
            <div style={{ display: 'inline-block' }}>
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
            </div>
            <h3>Reverse dependencies:</h3>
            <div style={{ display: 'inline-block' }}>
                {selectedPackage.ReverseDependencies 
                ? selectedPackage.ReverseDependencies.map((dependency => {
                    if (packageNames.includes(dependency)) {
                        return <p   key={'rd' + dependency}
                                    className="dependency" 
                                    onClick={() => setSelectedPackage(packages.filter(item => item.Package === dependency)[0])}>
                                    {dependency}
                                </p>
                    }
                    else {
                        return <p key={'rd' + dependency}>{dependency}</p>
                    }    
                }
                    
                )) 
                : "None"}
            </div>
          </div>
          : 'Loading'}
            
      </div>
    );
  }
  
  export default PackageDetails;