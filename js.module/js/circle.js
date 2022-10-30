class Circle {
    name = "I'm circle";
    area(r){
        return  this.showresult(Math.PI * (r**2))
    }
  showresult(text){
        return "the answer of circle is " + text
     }
}

export default Circle