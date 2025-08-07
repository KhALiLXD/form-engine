import { validateField } from "./validator"
export const runFormValidation = (schema = {})=>{
    
    return Object.entries(schema).map(([key,value])=>({
     filedName : key,
     validateStatus : value.validate.map(validtion => validateField({
        ...validtion,
        valueInput : value.value
     }))
    }))
}