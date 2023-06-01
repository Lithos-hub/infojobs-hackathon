# Infojobs Hackathon

This app is my submission for the Infojobs Hackathon 2023.

The following list contains the main features of the app I have developed:

- Dark/Light modes.
- Three.js animations.
- Smart search engine powered by OpenAI Whisper (to use voice recognition for better accessibility), and OpenAI ChatGPT to find jobs based on your description.
- A chatbot powered by ChatGPT to receive advices and tips to improve your CV, interviews skills, find jobs, etc.
- An aptitude test generator depending on the job and its requirements using chatGPT.
- A smart evaluator tool to check your tests results using chatGPT.

## Setup

To run this project, install it locally using npm:

```
npm i
```

Run in development mode:


__Important note: The feature of voice recognition doesn't work in development mode, you need to run the app in production mode to use it.__

```
npm run dev
```


Run in production mode:
```
npm run build
npm run preview
```
## Environment variables

You need to create a `.env.local` file in the root of the project with the following variables:

```
VITE_OPENAI_API_KEY=Your api key
VITE_BASE_URL=https://infojobs-hackathon-backend-production.up.railway.app/api/v1/infojobs // Backend proxy to avoid CORS issues
```
