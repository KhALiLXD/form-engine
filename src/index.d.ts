export interface ValidationRule {
  rule: string;
  parm?: any;
  valueInput: any;
}

export interface ValidationResult {
  rule: string;
  validate: boolean;
  err?: string;
  error?: string;
}

export interface FieldValidation {
  filedName: string;
  validateStatus: ValidationResult[];
}

export interface UseFormEngineOptions {
  [fieldName: string]: {
    value: any;
    default?: any;
    validate: ValidationRule[];
  };
}

export interface UseFormEngineReturn {
  data: UseFormEngineOptions;
  isChanged: boolean;
  save: (callback: (data: any) => void) => void;
  updateChanges: () => void;
  reset: () => void;
  setValue: (field: string, value: any) => void;
  getValue: (field: string) => any;
}

export declare function useFormEngine(
  initialState: UseFormEngineOptions
): UseFormEngineReturn;

export declare function runFormValidation(
  data: UseFormEngineOptions
): FieldValidation[];

export declare function validateField(rule: ValidationRule): ValidationResult;

export declare const rules: {
  [key: string]: {
    validate: (value: any, parm?: any) => boolean;
    onError: string;
  };
};
