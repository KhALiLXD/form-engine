export const cloneSchema = (schema)=>{
    return JSON.parse(schema)
}

export const deepCompare = (a, b) => {
  return JSON.stringify(a) === JSON.stringify(b)
}