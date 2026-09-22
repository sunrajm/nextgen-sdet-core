import {test, expect} from '../../fixtures/api.fixture';
import {createUserSchema} from "../../schemas/user.schema";
import {validateSchema} from "../../utils/SchemaValidator";

const userDatasets = [
    { name: 'Sunraj', job: 'Architect', expectedStatus: 201 },
    { name: 'Tanvish', job: 'Engineer', expectedStatus: 201 },
    { name: 'Tejaswini', job: 'Consultant', expectedStatus: 201 },
];

test.describe('Data-Driven User Creation & Schema Contract Suite',()=>{
    for(const dataset of userDatasets){
        test(`POST api/users- Should create user: ${dataset.name}`,async ({apiClient})=>{
           const response= await apiClient.post('/api/users',{
               name:dataset.name,
               job:dataset.job
           });
           //Assert status code
           expect(response.status).toBe(dataset.expectedStatus);

           //Assert Dynamic payload values
           expect(response.data.name).toBe(dataset.name);
           expect(response.data.job).toBe(dataset.job);

           //Assert Schema Contract
           const schemaResult = validateSchema(createUserSchema, response.data);
           expect(schemaResult.isValid, `Schema Validation failed: ${schemaResult.errors}`).toBe(true);
        });
    }
});