# InsightExpress - AI-Powered Newsletter Agent
### Powered By Langflow

## Overview
InsightExpress is a Next.js application that generates AI-powered research reports based on user-provided topics and emails them to users. The application leverages Langflow for its AI capabilities and features a modern, responsive UI built using NextJS.


https://github.com/user-attachments/assets/3d364aef-8a1b-4bd2-a782-a9fb8b33b735


## Prerequisites

Before running the application, ensure you have the following installed:
- Node.js (version 14 or later)
- npm (Node package manager)
- Python (version 3.9 or later) - for running Langflow
- pip (Python package manager)

## Installation Steps

### 1. Install and Run Langflow

First, you'll need to set up Langflow locally:

```bash
# Install Langflow using pip
pip install langflow

# Start Langflow server
langflow run
```

Once Langflow is running:
1. Access the Langflow UI at `http://localhost:7860`
2. Create a new flow for research generation
3. Note down the following details:
   - Your Langflow URL (typically `http://localhost:7860`)
   - Your Flow ID (found in the flow's URL)
   - Your API token (found in Settings > API Keys), in case auth enabled in the api settings

### 2. Set Up the Next.js Application

```bash
# Clone the repository
git clone https://github.com/misbahsy/InsightExpress.git
cd insightexpress

# Install dependencies
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
LANGFLOW_URL=http://localhost:7860
FLOW_ID=your_flow_id_here
LANGFLOW_TOKEN=your_langflow_api_token_here
```

Replace the values with your actual Langflow configuration.

### 4. Run the Application

```bash
# Start the development server
npm run dev
```

The application will be available at `http://localhost:3000`

## Usage

1. Access the application in your browser
2. Enter a research topic in the provided field
3. Enter your email address
4. Click "Generate Research Report"
5. Wait for the AI to generate your report
6. The report will be displayed on screen and sent to your email

## Project Structure

```
insightexpress/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── page.tsx           # Main page component
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # UI components
│   └── LoadingSteps.tsx  # Loading indicator
├── lib/                   # Utility functions
├── public/               # Static assets
└── styles/               # Global styles
```

## Features

- 🎨 Modern, responsive UI with dark mode support
- 🤖 AI-powered research generation
- 📧 Email delivery of reports
- ⚡ Real-time loading indicators
- 🎯 Error handling and notifications


## Troubleshooting

### Common Issues

1. **Langflow Connection Error**
   - Ensure Langflow is running locally
   - Verify your environment variables are correct
   - Check if your Flow ID is valid

2. **Email Delivery Issues**
   - Verify the email address format
   - Check your Langflow flow configuration esp. Composio connection

3. **Build Errors**
   - Run `npm clean-install` to refresh dependencies
   - Ensure all required dependencies are installed

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Support

For support, please open an issue in the GitHub repository or contact the maintainers.
