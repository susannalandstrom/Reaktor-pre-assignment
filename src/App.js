import React, { useState, useEffect } from 'react';
import './App.css';
import ListOfPackages from './components/ListOfPackages';
import { readSampleFile } from './status-file/StatusFileHandler';
import PackageDetails from './components/PackageDetails';

function App() {
  const [packages, setPackages] = useState([])
  const [selectedPackage, setSelectedPackage] = useState()

  useEffect(() => {
    readSampleFile()
    .then(res => {
      setPackages(res)
      setSelectedPackage(res[0])
    })
    
  }, []);

  return (
    <div className="App">
        <ListOfPackages packages={packages} selectedPackage={selectedPackage} setSelectedPackage={setSelectedPackage}/>
        <PackageDetails packages={packages} selectedPackage={selectedPackage} setSelectedPackage={setSelectedPackage}/>
    </div>
  );
}

export default App;
