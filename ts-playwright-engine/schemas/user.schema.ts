export const createUserSchema = {
    type: 'object',
    properties: {
        name: { type: 'string' },
        job: { type: 'string' },
        id: { type: 'string' },
        createdAt: { type: 'string' },
        _meta: { type: 'object' },
    },
    required: ['name', 'job', 'id', 'createdAt'],
    additionalProperties: true,
};