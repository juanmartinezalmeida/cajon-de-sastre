// define the arrays
var applicantsInterviewed = [2, 3, 4];
var applicantsTotal = [4, 3, 16];
var nationalInterviewed = [4, 6 ,7];
var nationalTotal = [6, 8 , 19];

// to store results
var applicantsResults = [];
var nationalResults = [];

console.log(applicantsInterviewed);
console.log(applicantsTotal);
console.log(nationalInterviewed);
console.log(nationalTotal);

// calculate percentages
for (i = 0; i < applicantsInterviewed.length; i++) {

    // if the number of total applicants is 0 we add 0 and skip the operation
    // as it would result in NaN
    if (applicantsTotal[i] != 0) {
        applicantsResults.push(applicantsInterviewed[i] / applicantsTotal[i] * 100);
    } else {
        applicantsResults.push(0);
    }
    if (nationalTotal[i] != 0) {
        nationalResults.push(nationalInterviewed[i] / nationalTotal[i] * 100);
    } else {
        nationalResults.push(0);
    }

}

console.log(applicantsResults);
console.log(nationalResults);

// send data to Bubble
bubble_fn_agency(applicantsResults);
bubble_fn_national(nationalResults);