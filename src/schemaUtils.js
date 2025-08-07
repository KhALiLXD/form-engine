export const cloneSchema = (schema)=>{
    return JSON.parse(schema)
}

// export const deepCompare = (a, b) => {
//   return JSON.stringify(a) === JSON.stringify(b)
// }

export function deepCompare(current = {}, snapshot = {}) {
  const keys = new Set([...Object.keys(current), ...Object.keys(snapshot)])

  for (const key of keys) {
    const curVal = current[key]?.value
    const snapVal = snapshot[key]?.value

    if (curVal !== snapVal) return false
  }

  return true
}
