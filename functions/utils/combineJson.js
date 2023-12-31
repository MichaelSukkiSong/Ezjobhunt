function combineJson(jsonString1, jsonString2) {
  try {
    // Parse the JSON strings into objects
    const object1 = JSON.parse(jsonString1);
    const object2 = JSON.parse(jsonString2);

    // Combine the objects
    const combinedObject = { ...object1, ...object2 };

    // Return the combined object
    return combinedObject;
  } catch (error) {
    // Handle any errors that might occur during the parsing or combining process
    console.error("Error combining JSON:", error);
    return null;
  }
}

module.exports.combineJson = combineJson;
