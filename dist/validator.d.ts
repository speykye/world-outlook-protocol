export type ValidationSeverity = 'error' | 'warning';
export type ValidationIssue = {
    severity: ValidationSeverity;
    code: string;
    path: string;
    message: string;
};
export type ValidationResult = {
    valid: boolean;
    errors: ValidationIssue[];
    warnings: ValidationIssue[];
};
export declare function validateWorldExportBundle(input: unknown): ValidationResult;
