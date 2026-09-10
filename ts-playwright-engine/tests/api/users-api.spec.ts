import Ajv from "ajv";
import addFormats from "ajv-formats";
import userSchema  from "../../schemas/user.schema.json";
import {expect, test} from "@playwright/test";
import {ApiClient} from "../../utils/ApiClient";
import {DataGenerator} from "../../utils/DataGenerator";
const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

const validateUserSchema = ajv.compile(userSchema);

test.describe('API Suite: User Management & Schema Validation',()=>{
    let apiClient:ApiClient;

    test.beforeEach(async({request})=>{
        apiClient = new ApiClient(request, 'https://reqres.in/api');
    });

    test('POST /api/users - Create user with dynamic payload and validate schema',async ()=>{
        // 1. Generate dynamic payload asynchronously
        const payload = await DataGenerator.generateUserPayload();

        // 2. Execute POST request
        const response = await apiClient.post('/users', payload);
        expect(response.status()).toBe(201);

        // 3. Parse JSON response
        const responseData = await response.json();
        console.log('Response Data:', responseData);

        // 4. Validate data integrity
        expect(responseData.name).toBe(payload.name);
        expect(responseData.job).toBe(payload.job);

        // 5. Validate response against JSON schema
        const isValid = validateUserSchema(responseData);
        if (!isValid) {
            console.error('Schema validation errors:', validateUserSchema.errors);
        }
        expect(isValid).toBe(true);
    });
});