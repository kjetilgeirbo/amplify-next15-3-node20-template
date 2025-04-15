// amplify/auth/resource.ts
import { defineAuth } from '@aws-amplify/backend';
import { preSignUp } from './pre-sign-up/resource';
// import { createAuthChallenge } from "./create-auth-challenge/resource"
// import { defineAuthChallenge } from "./define-auth-challenge/resource"
// import { verifyAuthChallengeResponse } from "./verify-auth-challenge-response/resource"
// import { updateUserLicense } from "../data/update-user-license/resource"

export const auth = defineAuth({
  loginWith: {
    email: true,
  },
  userAttributes: {
    "custom:license_key": {
      dataType: "String",
      mutable: true,
      maxLen: 10,
      minLen: 6,
    }
  },
  triggers: {
    preSignUp,
  },
  access: (allow) => [
    // allow.resource(updateUserLicense).to(["updateUserAttributes"])
  ]
});