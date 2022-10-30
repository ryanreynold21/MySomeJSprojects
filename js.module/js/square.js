 const name = "I'm square"
 function area(w){
    return showresult( w**2 +" sqft")
 }

 const showresult = (text) => {
    return "the answer of square is " + text
 }

 export default {name,area,showresult}