import fetch from 'node-fetch';
import { execSync } from 'child_process';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const rollbarServerToken = process.env.ROLLBAR_SERVER_TOKEN;
const environment = process.env.NEXT_PUBLIC_ROLLBAR_ENVIRONMENT || 'production';

async function notifyDeploy() {
    if (!rollbarServerToken) {
        console.error('ROLLBAR_SERVER_TOKEN not found in environment variables.');
        return;
    }

    try {
        const revision = execSync('git rev-parse HEAD').toString().trim();
        const localUsername = execSync('whoami').toString().trim();

        const response = await fetch('https://api.rollbar.com/api/1/deploy', {
            method: 'POST',
            headers: {
                'X-Rollbar-Access-Token': rollbarServerToken,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                environment,
                revision,
                local_username: localUsername,
                comment: 'Deployment notified via script',
            }),
        });

        if (response.ok) {
            console.log(`Successfully notified Rollbar of deployment: ${revision} (${environment})`);
        } else {
            const errorData = await response.json();
            console.error('Failed to notify Rollbar of deployment:', errorData);
        }
    } catch (error) {
        console.error('Error during Rollbar deployment notification:', error);
    }
}

notifyDeploy();
