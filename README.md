# AI Career Assistant

An intelligent web application designed to empower job seekers by leveraging the power of Google's Gemini API. This tool helps users craft professional resumes and discover suitable career paths based on their unique background and experience.

## ✨ Key Features

- **Comprehensive Profile Builder:** A user-friendly, collapsible form to input all essential career information, including personal details, a professional summary, skills, work experience, and education history.
- **Generic Resume Generation:** Instantly creates a well-structured, general-purpose resume in Markdown format from the user's profile.
- **Custom Resume Tailoring:** Generates a resume specifically tailored to a target job description. The AI analyzes the user's profile and the job requirements to highlight the most relevant skills and experiences.
- **AI-Powered Job Recommendations:** Provides a list of suitable job titles based on an analysis of the user's skills and work history.
- **Responsive & Modern UI:** Built with Tailwind CSS for a clean, responsive, and accessible user experience on all devices.

## 🚀 Technology Stack

- **Frontend:** React, TypeScript
- **Styling:** Tailwind CSS
- **AI Model:** Google Gemini API (`@google/genai`)

## 🔧 How It Works

1.  **Data Collection:** The user fills in their professional details in the "Your Professional Profile" section. The form is designed to be intuitive, allowing users to dynamically add or remove work experience and education entries.
2.  **Action Selection:** The user chooses one of three actions from the control panel:
    - Generate a generic resume.
    - Paste a job description and generate a custom resume.
    - Request job title recommendations.
3.  **Prompt Engineering:** The application constructs a detailed, context-rich prompt based on the user's profile data and the selected action.
4.  **API Interaction:** The prompt is sent to the Google Gemini API (`gemini-2.5-flash` model). For job title recommendations, the app requests a structured JSON response to ensure data consistency.
5.  **Displaying Results:** The generated content (resume text or job titles) is displayed in the results panel, providing immediate value to the user. The UI includes loading states and error handling for a smooth experience.

## 🏃 Getting Started

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/ai-career-assistant.git
    cd ai-career-assistant
    ```

2.  **Install dependencies:**
    This project is set up to use a CDN via an `importmap`, so no local installation of packages like React or `@google/genai` is needed. Simply open the `index.html` file in a browser.

3.  **Set up your API Key:**
    This application requires a Google Gemini API key. The application is designed to securely access the key from an environment variable (`process.env.API_KEY`). You will need to ensure this variable is available in your deployment environment.

4.  **Run the application:**
    Since this is a simple frontend application with no build step, you can run it using a local web server. A common way is to use the `serve` package or a VS Code extension like "Live Server".

    ```bash
    # If you have Node.js and npm installed
    npx serve
    ```
    Then, open your browser to the provided local address.

## 📂 Project Structure

```
.
├── components/          # Reusable React components
│   ├── icons/           # SVG icon components
│   ├── ActionsPanel.tsx   # UI for the three main actions
│   ├── Loader.tsx         # Loading spinner component
│   ├── ResultsDisplay.tsx # Component to show generated content
│   └── UserInputForm.tsx  # The main form for user profile data
├── services/            # Modules for external API calls
│   └── geminiService.ts # Logic for interacting with the Gemini API
├── App.tsx              # Main application component, manages state
├── index.html           # The main HTML file
├── index.tsx            # React application entry point
├── metadata.json        # Application metadata
├── README.md            # You are here!
└── types.ts             # TypeScript type definitions for the app
```
