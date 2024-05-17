// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  name: 'dev',
  firebase: {
    config: {
      apiKey: "AIzaSyADwadHQ6UubhtToXn29FclsQvAJL9QTWg",
      authDomain: "ecommerce-alcasec-e865c.firebaseapp.com",
      projectId: "ecommerce-alcasec-e865c",
      storageBucket: "ecommerce-alcasec-e865c.appspot.com",
      messagingSenderId: "378531384074",
      appId: "1:378531384074:web:665b7b07b33b84b91b88f3"
    }
  },
  url: 'http://localhost:8000/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
