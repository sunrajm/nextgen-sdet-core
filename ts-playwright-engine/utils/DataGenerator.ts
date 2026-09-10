// Use dynamic import to avoid importing an ESM-only package from a CommonJS context.
// This makes the functions async and loads faker at runtime.
export interface UserPayload {
    name: string;
    job: string;
    email?: string;
}

export class DataGenerator {
    /**
     * Generates dynamic user payload for POST/PUT requests
     */
    static async generateUserPayload(): Promise<UserPayload> {
        const { faker } = await import('@faker-js/faker');
        return {
            name: faker.person.fullName(),
            job: faker.person.jobTitle(),
            email: faker.internet.email()
        };
    }

    /**
     * Generates dynamic user payload with custom overrides
     */
    static async generateCustomUserPayload(overrides: Partial<UserPayload> = {}): Promise<UserPayload> {
        const defaultPayload = await this.generateUserPayload();
        return {
            ...defaultPayload,
            ...overrides
        };
    }
}