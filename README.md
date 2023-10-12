## Task description

This React application provides an interface to monitor and manage financial transactions and account details.

Features:

- Dynamic Time Filtering: Users can filter transactions based on specific months and years, with preset options available for convenience.
- Category Management: Each transaction can be mapped to a predefined category such as 'Dagligvare', 'Cafè', 'Sportsutstyr', etc. A comprehensive
- keyword-to-category mapping ensures that transaction details, such as vendor names, can be automatically categorized.
- Account and Transaction Monitoring: The app provides capabilities to view transaction details of a specified account, including the capability to sort transactions.
- Balance Tracking: Users can monitor the current balance of an account, including the currency type.
- Visibility Controls: There are toggles to control the visibility of certain UI elements, such as transactions, savings goals, income, and expenses.
- Savings Goal: Users can set and monitor savings goals, providing motivation and clear financial targets.

## Prerequisites:

Node.js and npm: Before running this application locally, ensure that you have Node.js and npm (comes with Node.js) installed on your machine.

Ensure the backend service is running LOCALLY (see Important Notes below).

## How to run

To run the app locally:

1. Navigate to the project folder in your terminal.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server
   ```bash
   npm run dev
   ```

## Important Notes

- This frontend application interfaces with a backend service to process that you have to run locally. You can find it here: https://github.com/Bjor91/SavingApp--backends.

- At present, the frontend is set up to communicate with the backend service running LOCALLY. This means that for seamless operation and data access, the backend service should be running on the same machine when using this web application.

For optimal functionality, please ensure the Spring Boot backend is actively running on localhost when accessing this frontend.

## Comments

Design choices:

I wanted the design to be simple:

- I want the user to to easily see where their money is being spent.
- I want to see how they are progressing towards their goal.

Improvements and Reflections

- Allow user to set goals in reducing expenses or increasing savings in relation to previous months (maybe compare with similar month, last year)
- Gamification: allow user to achieve some sort of badge/level/achievement to be shared locally amongst friends (like Strava). Not sure how this would be implented.
- A chat.gpt promp with the users Goal-description would be cool.
