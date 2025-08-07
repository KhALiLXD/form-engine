import { useMemo, useRef, useState} from 'react'
import { runFormValidation } from './formValidation'
import { deepCompare } from './schemaUtils'

// استنتاج default تلقائي
const normalizeField = (field = {}) => ({
  ...field,
  default: field.hasOwnProperty('default') ? field.default : field.value
})

export function useFormEngine(initialSchema = {}) {
  // تطبيع السكيم من البداية
  const normalizedSchema = Object.fromEntries(
    Object.entries(initialSchema).map(([key, field]) => [key, normalizeField(field)])
  )

  const [formData, setFormData] = useState(normalizedSchema)
  const formDataSnap = useRef(normalizedSchema)

  // fallback عند إضافة حقل جديد
  const createDefaultField = () => ({
    value: '',
    default: '',
    validate: [
        {rule: 'required'}
    ] // في المستقبل ممكن تقرأ من تفضيلات المستخدم
  })

  const setValue = (key, value) => {
    setFormData(prev => ({
      ...prev,
      [key]: normalizeField({
        ...(prev[key] ?? createDefaultField()),
        value
      })
    }))
  }

  const getValue = (key) => {
    const field = formData[key]
    if (!field) return ''
    return field.value ?? field.default ?? ''
  }

    const isChanged = useMemo(() => {
    return Object.values(formData).some(field => field.value !== field.default);
    }, [formData]);


  const save = (callback) => {
    const validationResults = runFormValidation(formData)
    const allValid = validationResults.every(field =>
      field.validateStatus.every(status => status.validate === true)
    )

    if (!allValid) {
      const errored = validationResults
        .map(field => {
          const failedRules = field.validateStatus.filter(status => status.validate === false)
          if (failedRules.length === 0) return null

          return {
            fieldName: field.filedName, // typo fix from "filedName"
            errors: failedRules.map(r => r.err || `خطأ في قاعدة ${r.rule}`)
          }
        })
        .filter(Boolean)

      callback({
        error: true,
        fields: errored
      })
    } else {
      callback(formData)
    }
  }

  const setInputField = (fieldName) => {
  // Inject field on first use if it doesn’t exist
  if (!formData[fieldName]) {
    setFormData(prev => ({
      ...prev,
      [fieldName]: normalizeField(createDefaultField())
    }));
  }

  return {
    value: getValue(fieldName),
    onChange: (e) => setValue(fieldName, e.target.value)
  };
};


  const updateChanges = () => {
    setFormData(prev => {
      const updated = Object.fromEntries(
        Object.entries(prev).map(([key, field]) => [
          key,
          { ...field, default: field.value } // تحديث الـ default للقيمة الحالية
        ])
      )
      formDataSnap.current = updated
      return updated
    })
  }

  const reset = () => {
    const resetData = Object.fromEntries(
      Object.entries(formData).map(([key, field]) => [
        key,
        { ...field, value: field.default }
      ])
    )
    setFormData(resetData)
  }

  return {
    data: formData,
    isChanged,
    save,
    updateChanges,
    reset,
    setInputField,
    setValue,
    getValue
  }
}
