# demoblazeTest

Automated End-to-End Testing for Demoblaze Sample Store using Cypress

## About

This project provides automated end-to-end tests for the Demoblaze web application, developed with Cypress. The tests cover core shopping scenarios to ensure that essential user flows work as expected.

## Table of Contents

- [Setup Instructions](#setup-instructions)
- [How to Run the Tests](#how-to-run-the-tests)
- [Test Design and Approach](#test-design-and-approach)
- [Troubleshooting](#troubleshooting)
- [References](#references)

---

## Setup Instructions

> These steps assume no prior experience with Cypress or Node.js.

1. **Clone the Repository**
git clone https://github.com/GracielaGallas/demoblazeTest.git
cd demoblazeTest

2. **Install Node.js**
If you don't already have Node.js installed, download and install it from [nodejs.org](https://nodejs.org/).

3. **Install Project Dependencies**
Inside the project directory, install dependencies:
```bash
npm install
```

## How to run the tests

To open the graphical Cypress Test Runner (helpful for beginners):
```bash
npm run cypress:open 
```

Or, to run all tests in the terminal (headless):
```bash
npm run cypress:run 
```

Test results and screenshots (in case of error) will be saved to the `cypress/results` or `cypress/screenshots` directories.
you also can see the videos in `cypress/videos`

---

## Test Design and Approach

### What Do We Test?

- **Core Shopping Flows:** Purchasing a laptop, including both registered and guest user scenarios.
- **Form Validations:** Checks for correct handling of required fields such as name, address, and payment details.
- **Purchase Confirmation:** Verifies that users receive confirmation modals after purchase, including a unique ID, user details, and receipt information.

### Why These Scenarios?

- These cover the most business-critical paths for an online shop: product selection, purchase, and order confirmation.
- Focusing on these ensures the main value proposition for end-users is always maintained, and critical regressions can be detected early.

### Test Methodology

- **Independence:** Each test is independent and does not rely on the outcome of previous tests.
- **Fixtures:** Test data such as user details and product information are stored in files within the `cypress/fixtures` directory.
- **Selectors:** Tests use explicit text selectors (like button labels) for resilience against UI style changes.
- **Automation:** Tests mimic real user interactions as closely as possible for realistic coverage.

---

## Troubleshooting

- **Test Fails Due to Timeouts:** Ensure your internet connection is working and that the Demoblaze demo site is accessible.
- **Selectors Not Found:** The UI may have changed; update selectors in the test files as needed.
- **Dependency Issues:** Delete `node_modules` and run `npm install` again to refresh packages.
- **Cypress Not Launching:** Try running `npx cypress verify` to resolve installation issues.

---

## References

- [Cypress Documentation](https://docs.cypress.io/)
- [Demoblaze Test Application](https://www.demoblaze.com/)

---

If you need further assistance, please open an issue in this repository.





