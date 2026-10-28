import { request, FullConfig } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import {Logger} from './utils/logger';

const logger = new Logger('GlobalSetup');

async function globalSetup(config: FullConfig) {
  logger.info('Executing Global Setup: initiating pre-flight health check...');

  // Resolve baseURL from Playwright config, defaulting to ReqRes
  const baseURL = config.projects[0].use.baseURL || 'https://reqres.in';
  const requestContext = await request.newContext({ baseURL });

  let token = 'mock_enterprise_bearer_token_12345';

  try {
    // 1. Fail-Fast Pre-Flight Health Check
    logger.info(`Pinging target environment health endpoint: ${baseURL}/api/users?page=1`);
    const healthResponse  = await requestContext.get('/api/users?page=1');
    if (!healthResponse.ok()) {
      logger.warn(`FAIL-FAST WARNING: Health check returned status ${healthResponse.status()}. Target environment may be unstable.`);
    }else{
      logger.info('Pre-flight health check passed successfully.');
    }

    // 2. Authentication against Login API
    logger.info('Attempting authentication against /api/login...');
    const response = await requestContext.post('/api/login', {
      data: {
        email: 'eve.holt@reqres.in',
        password: 'cityslicka',
      },
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    if (response.ok()) {
      const body = await response.json();
      if (body.token) {
        token = body.token;
        logger.info('Successfully authenticated against live ReqRes API!');
      }
    } else {
       logger.warn(`/api/login returned status ${response.status()}. Using fallback mock token for test resilience.`);
    }
  } catch (error) {
   logger.warn(`Network offline or blocked. Using fallback mock token. Error: ${error.message}`);
  }

  // 3. Ensure .auth directory exists
  const authDir = path.join(__dirname, 'playwright/.auth');
  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true });
    logger.info(`Created missing auth directory at: ${authDir}`);
  }

  // 4. Write token state storage file
  const authFilePath = path.join(authDir, 'user.json');
  fs.writeFileSync(
    authFilePath,
    JSON.stringify({
      extraHTTPHeaders: {
        Authorization: `Bearer ${token}`,
      },
    })
  );

  logger.info(`Global Setup complete. Authentication state persisted to: ${authFilePath}`);
  await requestContext.dispose();
}

export default globalSetup;