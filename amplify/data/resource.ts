import { type ClientSchema, a, defineData } from '@aws-amplify/backend';
import { preSignUp } from "../auth/pre-sign-up/resource";
// import { licenseValidation } from "../functions/license-validation/resource"
// import { updateUserLicense } from "./update-user-license/resource"

const schema = a.schema({
    // updateUserLicense: a
    //   .mutation()
    //   .arguments({
    //     userId: a.string().required(),
    //     licenseKey: a.string().required(),
    //   })
    //   .authorization((allow) => [allow.group("ADMINS")])
    //   .handler(a.handler.function(updateUserLicense))
    //   .returns(a.json()),
    Todo: a
    .model({
      content: a.string(),
      done: a.boolean().required().default(false),
    }),
    Category: a.model({
      id: a.id(),
      name: a.string().required(),
      slug: a.string().required(),
      rank: a.integer().required(),
      videos: a.hasMany('Video', 'categoryId'),
    }),
    
    Video: a.model({
      id: a.id(),
      title: a.string().required(),
      slug: a.string().required(),
      fileName: a.string().required(),
      posterTime: a.float(),
      categoryId: a.id(),
      category: a.belongsTo('Category', 'categoryId'),
      chapters: a.hasMany('Chapter', 'videoId'),
    }),
  
    Chapter: a.model({
      id: a.id(),
      title: a.string().required().default("untitled"),
      start: a.float().required(),
      posterTime: a.float().required().default(10),
      videoId: a.id(),
      video: a.belongsTo('Video', 'videoId'),
    }),

    License: a.model({
      customer_name: a.string().required(),
      license_key: a.string().required(),
      active: a.boolean().required(),
      start_date: a.date().required(),
    })
})
.authorization(allow => [
  allow.resource(preSignUp).to(['query', 'listen']),
  allow.authenticated().to(['create', 'update', 'delete', 'read']),
  // allow.resource(licenseValidation).to(['query', 'listen']),
  // allow.publicApiKey()
])

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    // defaultAuthorizationMode: 'iam',
    defaultAuthorizationMode: 'userPool', // was iam
    // apiKeyAuthorizationMode: {
    //   expiresInDays: 30,
    // },
  },
});