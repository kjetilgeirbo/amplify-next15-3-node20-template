//amplify/auth/pre-sign-up/resource

import { defineFunction, secret } from '@aws-amplify/backend';
import { defineAuth } from "@aws-amplify/backend";

// amplify/auth/pre-sign-up/resource.ts
export const preSignUp = defineFunction({
  name: "pre-sign-up",
  resourceGroupName: 'auth',
  environment: {
    AMPLIFY_DATA_DEFAULT_NAME: secret('AMPLIFY_DATA_DEFAULT_NAME')
  }
});