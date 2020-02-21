import sampleFile from './sampleFile'

export function readSampleFile() {
    return(
        fetch(sampleFile)
        .then(response => response.text())
        .then(data => processStatusData(data))
        .then(data => sortStatusData(data))
        .then(data => findReverseDependencies(data))
    )
}

function processStatusData(statusData) {
    const packages = statusData.split("\n\n")
    const propertiesToKeep = ["Package", "Description", "Depends"]

    const packageObjects = packages.map((packageItem) => {

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
                const splittedRow = row.split(": ")
                lastAddedProperty = splittedRow[0]

                if (propertiesToKeep.includes(splittedRow[0])) {
                    if (splittedRow[0] === 'Depends')
                        object[splittedRow[0]] = parseDependencies(splittedRow[1])
                    else
                        object[splittedRow[0]] = splittedRow[1]
                }    
            }
        })
        return object
    })
    // remove empty object at the end
    if (Object.keys(packageObjects[packageObjects.length-1]).length === 0) 
        packageObjects.splice(-1, 1)

    return packageObjects
}

function parseDependencies(dependencies) {
    const dependenciesArray = dependencies.split("|").join(",").split(",")

    let dependenciesWithoutVersions = dependenciesArray.map(dependency => {
        let startIndex = dependency.indexOf("(")
        if (startIndex > 0) {
            return dependency.substring(0, startIndex).trim()
        }
        else
            return dependency.trim()
    })
    // remove duplicates
    let set = new Set(dependenciesWithoutVersions)
    return Array.from(set)
}

function sortStatusData(statusData) {
    return statusData.sort((a, b) => a.Package > b.Package ? 1 : -1)
}

function findReverseDependencies(packages) {
    const packagesWithDependencies = packages.filter(packet => packet.Depends !== undefined)

    const packagesWithReverseDependencies = packages.map(item => {
        const reverseDependencies = packagesWithDependencies.filter(packet => packet.Depends.includes(item.Package))

        if (reverseDependencies.length > 0) {
            item["ReverseDependencies"] = reverseDependencies.map(dependency => dependency.Package)
        }
        return item
    })
    return packagesWithReverseDependencies
}