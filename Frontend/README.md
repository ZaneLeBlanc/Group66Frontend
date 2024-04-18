# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

# Group66 Intrusion Detection System (IDS) Using Machine Learning
## Project Description

As the Internet becomes more common in daily life, the rise in cyber threats underscores the urgent need for robust defense mechanisms. An Intrusion Detection System (IDS) stands as a pivotal defense tool against cyber attacks. This project aims to augment the provided open-source IDS-ML framework through the development of a user-friendly web-based interface and backend database integration, to allow users to gather analytics on intrusion detection data
and evaluate algorithm performance.

The quality of a README description often differentiates a good project from a bad project. A good one takes advantage of the opportunity to explain and showcase:

    What your application does,
    Why you used the technologies you used,
    Some of the challenges you faced and features you hope to implement in the future.

## How to Install and Run the Project

Running the ting

`thing pms`

## How to Use the Project

What all the parts do

## Credits

This was a collaborative effort between 5 people for our senior design class at UTD. We were dubbed "Group 66" for the Spring semester of 2024. The following people were involved:

- Zane LeBlanc - History
- Aaron Subichev - Test Page Styling/User Input
- Imad Siddiqui - Front-End
- Micaela Landauro - Back-End
- Amy Mendiola - Back-End
- Nhut Nguyen - Faculty Sponsor
- Rini Patel - Teaching Assistant

## MIT License

Copyright (c) 2024 UTDGROUP66-S24

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.