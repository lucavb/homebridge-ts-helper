
export interface IValidationConfig {
    rules?: {
        key: string;
        required?: boolean;
        regex?: RegExp;
        isArray?: boolean;
    }[];
}

export interface IValidationResult {
    valid: boolean;
    offenses?: {
        key: string;
        rule: 'regex' | 'required' | 'isArray';
    }[];
}

export const validateConfig = (config: {[key: string]: number | string | null}, rules: IValidationConfig): IValidationResult => {
    const result: IValidationResult = {
        valid: true,
        offenses: [],
    };
    for (const rule of rules.rules ?? []) {
        const key = rule.key;
        if (rule.required && config[key] === undefined) {
            result.valid = false;
            result.offenses.push({key, rule: 'required'});
        }

        if (rule.regex && (config[key] == undefined || !rule.regex.test(config[key]?.toString())) ) {
            result.valid = false;
            result.offenses.push({key, rule: 'regex'});
        }

        if (rule.isArray && !Array.isArray(config[key])) {
            result.valid = false;
            result.offenses.push({key, rule: 'isArray'});
        }
    }
    return result;
};
