import { useEffect, useMemo, useRef, useState } from 'react'
import { runFormValidation } from './formValidation'
import { deepCompare, cloneSchema } from './schemaUtils'
export function useFormEngine(schema={}) {
    const [formData,setFormData] = useState(schema);
    const formDataSnap = useRef(schema);


    const setValue = (key,value) =>{
        setFormData((prev)=>({
            ...prev,
            [key] : {
                ...prev[key],
                value : value
            }
        }))
    }

    const getValue = (key) =>{
        const field = formData[key]
        return field.value ?? field.default
    }

    const isChanged = useMemo(()=>{
       return JSON.stringify(formDataSnap.current) !== JSON.stringify(formData)
    },[formData,formDataSnap.current])


    const save = (callback)=>{
        const allValid = runFormValidation(formData).every(field =>
             field.validateStatus.every(status => status.validate === true)
        )
        console.log(allValid)
        if (!allValid) {
            // const errored = runFormValidation(schema).filter(field => 
            //     !field.validateStatus.every(status => status.validate === false)
            // )

            const errored = runFormValidation(formData)
            .map(field => {
                const failedRules = field.validateStatus.filter(status => status.validate === false)
                if (failedRules.length === 0) return null
                
                return {
                fieldName: field.filedName,
                errors: failedRules.map(r => r.err || `خطأ في قاعدة ${r.rule}`)
                }
            })
            .filter(Boolean)

             callback({
                error: true,
                fields: errored
            })
        }else{
            callback(formData) 
        }
   
    }

    const updateChanges = ()=>{
       formDataSnap.current = formData
    }
    const reset = () =>{
        setFormData(formDataSnap.current)
    }
    useEffect(()=>{
        console.log(formData)
    },[formData])
    return {
        data : formData,
        isChanged,
        save,
        updateChanges,
        reset,
        setValue,
        getValue
    }
}
