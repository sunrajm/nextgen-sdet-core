import { request, FullConfig } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

async function globalSetup(config: FullConfig) {
  const baseURL = config.projects[0].use.baseURL || 'https://reqres.in';
  const requestContext = await request.newContext({ baseURL });

  let token = 'mock_enterprise_bearer_token_12345';

  try {
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
        console.log('✅ Successfully authenticated against live ReqRes API!');
      }
    } else {
      console.warn(`⚠️ /api/login returned status ${response.status()}. Using fallback mock token.`);
    }
  } catch (error) {
    console.warn(`⚠️ Network offline/blocked. Using fallback mock token. Error: ${error.message}`);
  }

  // Ensure .auth directory exists
  const authDir = path.join(__dirname, 'playwright/.auth');
  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true });
  }

  // Write token state
  const authFilePath = path.join(authDir, 'user.json');
  fs.writeFileSync(
    authFilePath,
    JSON.stringify({
      extraHTTPHeaders: {
        Authorization: `Bearer ${token}`,
      },
    })
  );

  await requestContext.dispose();
}

export default globalSetup;