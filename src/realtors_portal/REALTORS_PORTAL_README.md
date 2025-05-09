# Packages to Install

When adding realtors portal to the store theme, some packages have to be installed in your project.
These packages include:

## Packages that your application probably already has installed

[`react`](https://www.npmjs.com/package/react)
[`react-dom`](https://www.npmjs.com/package/react-dom) [`next`](https://www.npmjs.com/package/next)
[`axios`](https://www.npmjs.com/package/axios) [`moment`](https://www.npmjs.com/package/moment)
[`react-icons`](https://www.npmjs.com/package/react-icons)
[`react-query`](https://www.npmjs.com/package/react-query)
[`@chakra-ui/react`](https://www.npmjs.com/package/@chakra-ui/react)
[`@chakra-ui/icons`](https://www.npmjs.com/package/@chakra-ui/icons)
[`@emotion/styled`](https://www.npmjs.com/package/@emotion/styled) (and all other necessary chakra
ui packages)

## Packages that neeed installing

[`react-textarea-autosize`](https://www.npmjs.com/package/react-textarea-autosize)
[`react-table`](https://www.npmjs.com/package/react-table)
[`react-phone-input-2`](https://www.npmjs.com/package/react-phone-input-2)
[`react-dropzone`](https://www.npmjs.com/package/react-dropzone)
[`react-csv`](https://www.npmjs.com/package/react-csv)
[`react-datepicker`](https://www.npmjs.com/package/react-datepicker)
[`formik`](https://www.npmjs.com/package/formik)
[`fast-equals`](https://www.npmjs.com/package/fast-equals)(for maps)
[`@googlemaps/react-wrapper`](https://www.npmjs.com/package/@googlemaps/react-wrapper)(for maps)

To ensure you install all these you can try running

```bash

yarn add moment react-phone-input-2 react-dropzone react-csv react-datepicker react-textarea-autosize fast-equals @googlemaps/react-wrapper

```

Run `yarn add` not `npm install` to prevent conflicting lockfiles

Install other packages as needed by comparing what you do not have in package.json with the packages
listed here.

In the event of a conflict with the package versions listed here and the previous versions already
installed in your project, a meeting will be required to ascertain how to move forward.

# Getting Started

In order to use the realtors portal, a few things must be provided by the containing store
application.

- Your code should be contained in the src directory
- Your `jsconfig.json` or `tsconfig.json` file must have the following setup

```js
  {
    "compilerOptions": {
      "paths": {
        "@/*": ["./src/*"]
      }
    }
  }
```

- Inside the `src` folder you must have a utils folder with the `sessionmanagers.js` file and the
  `useGetSession` hook in the `getSession.js` file. it should also have the `isMobile` value in the
  extras file. Refer to stores where this is already defined for reference.

- Inside the `src` folder you must have a `constants` folder with a `routes.js` file. This file can
  be duplicated from any existing store. It must also have a `country.js` file with a `MY_COUNTRY`
  value exported. This file too should be obtained from prviously existing stores.

- After integrating realtors portal, the following folders are the only ones subject to custom
  changes. `pages/agents/auth` and `realtors_portal/components/auth`. These folders change relative
  to the store you are in to reflect the theme of said store. when integrating ensure that these
  folders have whatever files and packages they request from the parent store. it might be more or
  less than what has been outlined above.

# Handling Updates

In order to add updates to the realtors portal, it comes down to a case of copy and paste. The
folders `pages/agents` and `realtors_portal` are copied from the theme with the updated realtor
portal and pasted here, replacing the outdated files on the store

## NOTE

- When updating, take care to preserve the files in `pages/agents/auth` and
  `realtors_portal/components/auth` so as not to overwritethe theme auth specific configuration of
  the theme you are working on with the auth configuration of the theme you are getting the updated
  realtors portal from. How one might do this would be to take those folders, and move them to
  adifferent part of the file structure or from the projct ntirely, then update the `pages/agents`
  and `realtors_portal` by deleting what was already there and replacing it with the new. Once that
  is done, you can then move the folders you preserved back into their original locations.

- Also, if you are in charge of updating realtors portal, make sure to update this file with
  whatever new packages become necessary for the core realtors portal to function(again, excluding
  auth flow) and also add the package name to the install commands in this file

## Conclusion.

Thanks and continue building!
