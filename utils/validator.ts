interface Error {
    field?:string,
    error?:string,
    message?:string
}

export function validateFields(validator:{inputType:string,inputField:string,inputName?:string}[]){
    function isEmpty(field:string){
       field = field.toLowerCase()
       return field.startsWith(" ") || field == ""|| !field || field.endsWith(" ") || field.includes(" ")
    }
    function addErrors(errorArray:Error[],message:string,fieldType:string){
        errorArray.push({
            field:fieldType.toLowerCase(),
            error:`${fieldType} ${message}`
          })
    }
    function matchFormat(field:string,regex:RegExp){
      return field.match(regex) === null
    }
  
    let errors:Error[]= []
    const fieldTypeObject:{[key:string]:any} = {
       email:{
         emailRegex:/[\w+]\@\w+\.\w+(\.\w+)?$/gi,
         validate(field="",fieldName='Email'){
          if(isEmpty(field)){
            addErrors(errors,"should not be empty or contain whitespace",fieldName)
          }
          else if(matchFormat(field,this.emailRegex)){
            addErrors(errors,"format invalid",fieldName)
          }
         }
       },
       number:{
        validate(field="",fieldName="Number"){
          if(isEmpty(field.toString())){
            addErrors(errors,"should not be empty",fieldName)
          }
          else if(field.toString().match(/[0-9|.]+/g) === null){
            addErrors(errors,"should contain only numbers",fieldName)
          }
        }
       },
       link:{
        validate(field="",fieldName="Link"){
          if(isEmpty(field.toString())){
            addErrors(errors,"should not be empty",fieldName)
          }
          else if(field.toString().match(/^(http(s?):\/\/)/) == null){
            console.log(field)
            console.log(field.toString().match(/^(http(s?):\/\/)/))
            addErrors(errors,"invalid please include 'https://' or 'http://' ",fieldName)
          }
        }
       },
       password:{
         validate(field=" ",fieldName="Password"){
           if(isEmpty(field)){
            addErrors(errors,"should not be empty or contain whitespace",fieldName)
           }
           else if(field.length < 8){
            addErrors(errors,"should be atleast 8 characters long",fieldName)
           }
           else if(matchFormat(field,/[@|#]+/g) || (matchFormat(field,/\d+/g))){
            addErrors(errors,"should contain atleast a number and special characters like(@, _, #) ","Password")
           }
         }
       },
       username:{
        validate(field=" ",fieldName="Username"){
          if(isEmpty(field)){
            addErrors(errors,"should not be empty or contain whitespace",fieldName)
          }
          else if(matchFormat(field,/\w+/gi) || field.includes(" ")){
            addErrors(errors,"should contain only alphabets and numbers",fieldName)
          }
        }
       },
       text:{
        validate(field=" ",fieldName="Text"){
          if(field.startsWith(" ")|| field.endsWith(" ")){
            addErrors(errors,"should not be empty",fieldName)
          }
          else if(field.length < 3){
            addErrors(errors,"should atleast be 3 characters long",fieldName)
          }
          else if(field.match(/[\d|@|_|#|$|%|!|&]+/g) !== null){
            addErrors(errors,"should contain only alphabets",fieldName)
          }
        }
       },
       phone:{
        validate(field="",fieldName="Phone Number"){
          if(isEmpty(field)){
            addErrors(errors,"should not be empty",fieldName)
          }
          else if(field.length < 9 ){
            addErrors(errors,"should atleast be 9 digits long",fieldName)
          }
          else if(field.match(/[d|+]+/) !== null){
            addErrors(errors,"should contain only digits and +",fieldName)
          }
        }
       },
       word:{
        validate(field=" ",fieldName="Text"){
          if(isEmpty(field)){
            addErrors(errors,"should not be empty",fieldName)
          }
          else if(field.length < 2){
            addErrors(errors,"should atleast be 2 characters long",fieldName)
          }
          else if(field.match(/[\d|@|_|#|$|%|!|&]+/g) !== null){
            addErrors(errors,"should contain only alphabets",fieldName)
          }
        }
       },
       address:{
        validate(field=" ",fieldName="Address"){
          if(field.startsWith(" ")|| field.endsWith(" ")){
            addErrors(errors,"should not be empty",fieldName)
          }
          else if(field.length < 3){
            addErrors(errors,"should atleast be 3 characters long",fieldName)
          }
          else if(field.match(/[|@||#|$|%|!|&]+/g) !== null){
            addErrors(errors,"should contain only alphabets numbers or _ and -",fieldName)
          }
        }
       }
     }
   
    if(validator.length > 0){
        validator.forEach((input=>{
            const {inputType,inputField,inputName} = input
            fieldTypeObject[inputType].validate((inputField === null?" ":inputField.toString()),inputName)
        }))
    }
    else{
        errors.push({message:"no fields to validate"})
    }
     return errors
   }