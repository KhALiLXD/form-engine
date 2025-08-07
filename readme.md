# @lousin/FormEngine

A minimal, flexible, and extendable validation hook for handling structured form schemas in React. Built for developers who want full control over form state and validation logic without bulky libraries.

---

## 🚀 Features

* 🔄 Track changes by comparing current value with default
* ✅ Supports multiple validation rules per field
* 🔧 Custom rule definitions and extensions
* 🧪 Validate full form or individual fields
* 🧼 Clone-safe and immutable field comparison
* 📌 Auto-infers default values unless provided manually
* 🧹 Dynamic fields are auto-registered at runtime

---

## 📦 Installation

```bash
npm i @lousin/form-engine
```

---

## 🧠 Philosophy

FormEngine is built for developers who want **real control**. It's not a form builder — it’s a validation core. You decide how things look and behave.

---

## ⚒️ Schema Types

### Manual Schema (Static)
You're in full control:
```js
const schema = {
  username: {
    value: '',
    default: '', // optional
    validate: [
      { rule: 'required' },
      { rule: 'string' },
      { rule: 'min', parm: 3 }
    ]
  }
}
```
You can define custom rules, dynamic validations, and even override built-in behavior.

### Dynamic Schema (Runtime)
When fields are added dynamically using `setInputField`, they are initialized automatically with:
```js
{
  value: '',
  default: '',
  validate: [ { rule: 'required' } ]
}
```
By default, dynamic fields only use the `required` rule.

<!-- If you want to change how these fields behave when initialized, override the `createDefaultField()` function exported from the engine. This utility controls how default fields are shaped at runtime.

```js
import { createDefaultField } from 'form-engine';

// You can override it globally like this:
createDefaultField.override((key) => ({
  value: '',
  default: '',
  validate: [ { rule: 'required' }, { rule: 'string' } ]
}))
``` -->

---

## 🔧 Setter / Getter Modes

FormEngine supports two styles:

### 1. Manual (by key):
```js
setValue('email', e.target.value)
getValue('email')
```

### 2. Automatic Binding:
```js
<input {...setInputField('email')} />
```
This will automatically register the field (if not already registered) and handle value updates.

---

## 🔧 Utilities

You can also use the core engine utilities directly if you're building custom validators, UI systems, or automation logic:

### `validateField()`
Validates a single value against a rule:
```js
import { validateField } from 'form-engine';

const result = validateField({
  rule: 'email',
  valueInput: 'test@example.com'
});
```

### `runFormValidation()`
Runs validation across a full schema:
```js
import { runFormValidation } from 'form-engine';

const result = runFormValidation(schema);
```

### `rules`
The full rules map used by the engine. Can be extended or modified:
```js
import { rules } from 'form-engine';

rules.phone = {
  validate: (val) => /^\d{10}$/.test(val),
  onError: 'Invalid phone number'
};
```

---

## 📄 Usage Example

```js
const schema = {
  email: {
    value: '',
    validate: [
      { rule: 'required' },
      { rule: 'email' }
    ]
  }
}

const {
  data, // get formData (without validation)
  setValue,
  getValue,
  save,
  reset,
  isChanged,
  setInputField,
  updateChanges
} = useFormEngine(schema);

<input {...setInputField('email')} />

save((result) => {
  if (result.error) console.log(result.fields);
  else console.log('Valid data:', result);
});
```

> When validate test is failed `resault` will return'
```js
{
  error: true,
  fields: [
      {
        errors:  [ 
          'Only alphabit characters are allowed', 
          'You cannot leave this field empty'
          ], // error messages
        fieldName: "username"
      },
      // ...other fields
  ] 
}
```
> In success condition it will return all `data` normally
```js
{
  username: {
    value: 'khalil',
    default: '',
    validate: [
      {rule: 'required'}
    ]
  },
  // ...other fields
}
```


---

## 📤 Exports
```js
import {
  useFormEngine,
  runFormValidation,
  validateField,
  rules,
  createDefaultField
} from 'form-engine';
```

---

## 🧪 Built-in Rules

| Rule     | Description                   |
|----------|-------------------------------|
| required | Field must not be empty       |
| string   | Must be alphabetical string   |
| number   | Must be a valid number        |
| min      | Minimum length/value          |
| max      | Maximum length/value          |
| email    | Must be a valid email address |

> Rules can be overridden or extended via `rules` object.

---

## 📄 License

MIT License

However, redistribution of the internal validation logic (such as the `rulesMap`, `validator.js`, or schema utilities) in competing libraries or frameworks, with minimal or no modification, is **prohibited**.

---

## Made with ⚡ by [KhALiLXD](https://github.com/KhALiLXD), Founder of [Lousin](https://lous.in)
