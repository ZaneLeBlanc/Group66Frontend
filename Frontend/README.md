# Group66 Intrusion Detection System (IDS) Using Machine Learning
## Project Description

As the Internet becomes more common in daily life, the rise in cyber threats underscores the urgent need for robust defense mechanisms. An Intrusion Detection System (IDS) stands as a pivotal defense tool against cyber attacks. This project aims to augment the provided open-source IDS-ML framework through the development of a user-friendly web-based interface and backend database integration, to allow users to gather analytics on intrusion detection data and evaluate algorithm performance.

## How to Install and Run the Project

Running the project requires node package manager, python3, React, and vite.

[NPM Download Link](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm), `npm install vite`,
`npm install react`

This project uses plenty of other packages panaged by npm or pip. A few include `flask`, `scikit-learn`, and more.

When running with `npm run dev`, npm will return any dependency-based errors.

In order to run parallel with the back-end, see the [back-end repository](https://github.com/ZaneLeBlanc/Group66Backend).

## How to Use the Project

The front-end repository can be split up into a few components. At the highest level, the front-end is split between the test page, and the previous runs page.
- Test page: The user can input parameters and run individual models here

- Previous Runs: The user can view runs recorded by the system in the past, and alter parameters to compare how a previous run could have gone differently given alternative parameters.

## Credits

This was a collaborative effort between 5 people for our senior design class at UTD. We were dubbed "Group 66" for the Spring semester of 2024. The following people were involved:

- Zane LeBlanc - History Page Development / Re-Run Comparison Logic
- Aaron Subichev - Test Page Styling/User Input
- Imad Siddiqui - User Experience
- Micaela Landauro - Back-End
- Amy Mendiola - Back-End
- Nhut Nguyen - Faculty Sponsor / Helicopter Parent
- Rini Patel - Teaching Assistant / Grader

More information can be found about the back-end component with a [link](https://github.com/ZaneLeBlanc/Group66Backend) to the repository here.

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