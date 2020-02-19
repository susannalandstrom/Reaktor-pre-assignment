import sampleFile from './sampleFile'
import sampleFile2 from './sampleFile2'

export function readSampleFile() {
    return(
        fetch(sampleFile)
        .then(response => response.text())
        .then(data => processStatusData(data))
        .then(data => sortStatusData(data))
    )
}

function processStatusData(statusData) {
    const packages = statusData.split("\n\n")
    const propertiesToKeep = ["Package", "Description", "Depends"]

    const packageObjects = packages.map((packageItem, index) => {

        const packagesSplitIntoRows = packageItem.split("\n")
        let object = {}
        let lastAddedProperty = ""
        packagesSplitIntoRows.forEach(row => {
            if (row[0] === " " && lastAddedProperty === "Description") {
                let value = object["Description"]
                if (typeof value === 'string') 
                    value = [value]
                value.push(row)
                object["Description"] = value
            }
            else {
                const rowProperty = row.split(": ")
                lastAddedProperty = rowProperty[0]

                if (propertiesToKeep.includes(rowProperty[0])) {
                    if (rowProperty[0] === 'Depends')
                        object[rowProperty[0]] = parseDependencies(rowProperty[1])
                    else
                        object[rowProperty[0]] = rowProperty[1]
                    object["id"] = index
                }    
            }
        })
        return object
    })

    if (Object.keys(packageObjects[packageObjects.length-1]).length === 0) 
        packageObjects.splice(-1, 1)

    return packageObjects
}

function sortStatusData(statusData) {
    return statusData.sort((a, b) => a.Package > b.Package ? 1 : -1)
}

function parseDependencies(dependencies) {
    const dependenciesArray = dependencies.split("|").join(",").split(",")
    return dependenciesArray.map(dependency => {
        let startIndex = dependency.indexOf("(")
        if (startIndex > 0) {
            return dependency.substring(0, startIndex).trim()
        }
        else
            return dependency.trim()
    })
}