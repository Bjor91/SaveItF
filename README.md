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

## How to run

Prerequisite: Ensure the backend service is running LOCALLY (see Important Notes below).

The application is hosted on Netlify and can be accessed here: [https://main--spontaneous-banoffee-5b72ea.netlify.app/](https://main--spontaneous-banoffee-5b72ea.netlify.app/)

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

- This frontend application interfaces with a backend service to process and retrieve data from a remote PostgreSQL database.
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
- I wanted to implement a chat.gpt promp with the users Goal-description: Motivating someone requires understanding their goals, aspirations, and reasons behind those goals. So, if you were to tell me what you're saving for, I would use a mix of empathy, visualization, and positive reinforcement to motivate you. Below is what chat.GPT would contribute with if I had the know-how and time for the deadline of this project.

```bash
Here's a hypothetical scenario for demonstration purposes:

Your Goal: "I'm saving up for a two-week vacation to Japan."

My Motivation:

Visualize the Reward: "Imagine yourself wandering the bustling streets of Tokyo, feeling the rich history in Kyoto's temples, and indulging in authentic sushi right from the source. Each penny you save brings you one step closer to this dream. Picture the experiences, the memories you'll create, and the stories you'll have to tell!"

Break It Down: "By setting aside a small amount consistently, whether it's weekly or monthly, you're not just building a fund; you're constructing a bridge to your dream. Remember, every little bit counts!"

Reinforce the Importance: "This isn't just a vacation; it's an opportunity for growth, learning, and creating lifelong memories. Japan has a unique culture that can offer you perspectives you might never have considered. It's an investment in yourself."

Celebrate Milestones: "Every time you hit a savings milestone, celebrate it! Whether it's 25%, 50%, or 75% of your goal, these moments are proof of your dedication and discipline."

Overcome Setbacks: "There might be times when you face unexpected expenses or can't save as much as you planned for a month. It's okay. Stay focused on the bigger picture and remember why you started saving in the first place."

Stay Accountable: "Share your goal with a close friend or family member. Having someone to cheer you on or even join you in saving for a shared experience can be a huge boost!"

Revisit and Reflect: "Regularly remind yourself of why this goal matters to you. Maybe keep a photo of Japan on your desk or set it as your phone's wallpaper. Let it serve as a daily reminder of what you're working towards."

Remember, motivation is deeply personal. What works for one person might not work for another. But understanding the "why" behind your goal, visualizing the outcome, and regularly reminding yourself of the rewards can be powerful drivers to keep you on track!
```
