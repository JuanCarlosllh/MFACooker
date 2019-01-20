const removeDuplicates = (propertyName, inputArray) => {
  const testObject = {}
  return inputArray.filter(item => {
    let duplicated = false
    const itemPropertyName = item[propertyName]

    if (itemPropertyName in testObject) {
      testObject[itemPropertyName] = item
      duplicated = true
    }
    testObject[itemPropertyName] = item
    return !duplicated
  })
}

module.exports = {
  removeDuplicates
}
