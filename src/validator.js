import { rules } from './rulesMap'

export const validateField = (value = {}) => {
  const ruleObj = rules[value.rule]
  if (!ruleObj) {
    return {
      rule: value.rule,
      error: `There is no rule with name ${value.rule}`
    }
  }

  const validate = value.parm
    ? ruleObj.validate(value.valueInput, value.parm)
    : ruleObj.validate(value.valueInput)

  return {
    rule: value.rule,
    validate,
    ...(validate ? {} : { err: ruleObj.onError })
  }
}