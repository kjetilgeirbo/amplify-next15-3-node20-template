//amplify/auth/pre-sign-up/handler

import { type Schema } from "../../data/resource";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
import { getAmplifyDataClientConfig } from '@aws-amplify/backend/function/runtime';
// import { env } from "$amplify/env/pre-sign-up"
import { env } from "./../../../.amplify/generated/env/pre-sign-up"
import type { PreSignUpTriggerHandler } from 'aws-lambda';
// .amplify/generated/env/pre-sign-up.ts
console.log('Modules imported');

const { resourceConfig, libraryOptions } = await getAmplifyDataClientConfig(
    env
);

Amplify.configure(resourceConfig, libraryOptions);
const client = generateClient<Schema>();

export const handler: PreSignUpTriggerHandler = async (event) => {
    console.log("PRESIGNUP STARTED")
    const submittedLicenseKey = event.request.userAttributes["custom:license_key"];
    if (!submittedLicenseKey) {
        throw new Error('License key is required');
    }

    try {
        const foundLicenses = await client.models.License.list({
            filter: {
                license_key: {
                    eq: submittedLicenseKey
                }
            }
        });
        
        const licenses = foundLicenses.data;

        if (!licenses || licenses.length === 0) {
            throw new Error('Finner ikke lisens. Sjekk om du har tastet riktig');
        }

        const license = licenses[0];
        console.log('License:\n', JSON.stringify(license))
        if (license.active === false) {
            throw new Error('Lisens er ikke aktiv');
        }

        return event;
    } catch (error) {
        throw error;
    }
};