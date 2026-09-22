import Ajv from 'ajv';
//ajv => another json schema validator
const ajv = new Ajv({allErrors: true});

export function validateSchema(schema: object, data: object): { isValid: boolean; errors: string } {
    const validate = ajv.compile(schema);
    const isValid = validate(data);

    if(!isValid){
        const errorDetails = validate.errors?.map((err)=>`${err.instancePath} ${err.message}`)
            .join(', ');
        return {isValid:false,errors:errorDetails || 'Unknown schema error'};
    }
    return {isValid: true, errors: ''};
}
