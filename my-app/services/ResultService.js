export async function fetchResults(age, sex, location, timeslot, conditions, symptoms) {
    var urlString = `/api/key?name=${age},${sex},${location.geometry.location.lat()},${location.geometry.location.lng()},`;
    urlString += "^"

    console.log(conditions);
    console.log(symptoms);

    for (let i=0;i<conditions.length;i++) {
        if (i != 0) {
            urlString += "@" + conditions[i];
        } else {
            urlString += conditions[i];
        }
    }

    urlString += "^,*"

    for (let i=0;i<symptoms.length;i++) {
        if (i != 0) {
            urlString += "@" + symptoms[i];
        } else {
            urlString += symptoms[i];
        }
    }

    urlString += "*"

    console.log(urlString);

    const response = await fetch(urlString);
    return await response.json();
}