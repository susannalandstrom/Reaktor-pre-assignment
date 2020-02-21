import React from 'react';

function PackageDetails({packages, selectedPackage, setSelectedPackage}) {
    const packageNames = packages.map(item => item.Package)

    return (
      <div className="selectedPackage">
          {selectedPackage ? 
          <div>
            <h2>{selectedPackage.Package}</h2>

            <h3>Description:</h3>
            <div style={{ display: 'inline-block' }}>
                <p style={{ width: '100%' }}>{selectedPackage.Description[0]}</p>
                {selectedPackage.Description.slice(1).map(line => {
                    if (line.trim() === '.') {
                        return <br></br>
                    }
                    else return line
                })}
            </div>
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
          : <h2>Loading...</h2>}
            
      </div>
    );
  }
  
  export default PackageDetails;