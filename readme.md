# FormEngine

A minimal, flexible, and extendable validation hook for handling structured form schemas in React. Built for developers who want full control over form state and validation logic without bulky libraries.

---

## 🚀 Features

* 🔄 Track changes with internal schema snapshot comparison
* ✅ Supports multiple validation rules per field
* 🔧 Custom rule definitions and extensions
* 🧪 Validate full form or individual fields
* 🔍 Get detailed error reports per field
* 🧼 Clone-safe and immutable snapshot handling

---

## 📦 Installation

```bash
npm i @lousin/form-engine
```

---

## 🧠 Philosophy

FormEngine is built for control. You define the schema structure, validation rules, and flow. This library does not make assumptions — it's a validation engine, not a form builder.

---

## 🛠️ Usage

### 1. Define your schema:

```js
const schema = {
  username: {
    default: '',
    required: true,
    value: '',
    validate: [
      { rule: 'required' },
      { rule: 'string' },
      { rule: 'min', parm: 3 },
      { rule: 'max', parm: 15 },
    ]
  },
  email: {
    default: '',
    required: true,
    value: '',
    validate: [
      { rule: 'required' },
      { rule: 'email' }
    ]
  }
}
```

### 2. Use the hook:

```js
import { useFormEngine } from 'lib/formEngine';

const {
  data,
  setValue,
  getValue,
  save,
  reset,
  updateChanges,
  isChanged
} = useFormEngine(schema);
```

### 3. Validate and Save:

```js
save((result) => {
  if (result.error) {
    console.log("Validation failed:", result.fields);
  } else {
    console.log("Form data:", result);
  }
});
```

---

## 🧪 Utilities

You can use the internal functions directly if needed:

### Validate a single rule manually

```js
import { validateField } from 'lib/formEngine';

const result = validateField({
  rule: 'email',
  valueInput: 'test@example.com'
});
```

### Run full validation on schema manually

```js
import { runFormValidation } from 'lib/formEngine';
const results = runFormValidation(schema);
```

### Access built-in rules

```js
import { rules } from 'lib/formEngine';

rules.customPhone = {
  validate: (value) => /^\d{10}$/.test(value),
  onError: 'Please enter a valid 10-digit phone number'
};
```

---

## 🧱 Schema Shape

Each field in the schema can include:

* `default`: default value
* `required`: whether field is mandatory
* `value`: current value (can be updated internally)
* `validate`: array of rule objects

Each rule object includes:

* `rule`: string name of the rule (must exist in rules map)
* `parm` (optional): parameter passed to the rule

---

## 📤 Exports

```js
import {
  useFormEngine,
  runFormValidation,
  validateField,
  rules
} from 'lib/formEngine';
```

---

## 🧪 Built-in Rules

| Rule     | Description                   |
| -------- | ----------------------------- |
| required | Field must not be empty       |
| string   | Must be alphabetical string   |
| number   | Must be a valid number        |
| min      | Minimum length/value          |
| max      | Maximum length/value          |
| email    | Must be a valid email address |

> All rules can be extended or overridden.

---

## 🧼 Roadmap Ideas

* Async validation support
* `useField` hook
* Form context for nested forms
* Better deep cloning with symbols/Date support

---

## 📄 License

MIT License

Copyright (c) 2025 Lousin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

However, redistribution of the internal validation logic (such as the `rulesMap`, `validator.js`, or schema utilities) in competing libraries or frameworks, with minimal or no modification, is **prohibited**.

If you wish to use this logic in a separate package or product, please contact the original author for permission.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

---

## Made with ⚡ by KhALiLXD The Founder of Lousin
