 # ChefClaude.com

 ChefClaude is a smart recipe generator that takes a list of ingredients and crafts a full recipe just for you.
 It's built with React and Node.js, and deployed on AWS using S3, CloudFront, API Gateway, Lambda, and EC2.

 ---

 ## 🌐 Live Website

 👉 [https://www.chefclaude.com](https://www.chefclaude.com)

 ---

 ## 📦 Tech Stack

 ### Frontend:
 - React (Vite)
 - CSS Modules

 ### Backend:
 - Node.js with Express
 - AWS Lambda
 - AWS API Gateway

 ### Hosting & Infrastructure:
 - S3 + CloudFront (Static React app)
 - API Gateway + Lambda (Serverless backend)
 - EC2 (Optional workers or dev utilities)
 - Route 53 / Squarespace (Domain management)

 ---

 ## ✨ Features

 - ✅ Ingredient validation from Spoonacular API ingredients list
 - ✅ AI-generated recipes using Claude (Anthropic)
 - ✅ Fully serverless backend (API Gateway + Lambda)
 - ✅ Modern UI with responsive layout
 - ✅ Hosted entirely on AWS

 ---

 ## 🚀 Local Development Setup

 ### Prerequisites

 - Node.js (v18 or newer recommended)
 - npm or yarn
 - Git
 - (Optional) Credentials for API testing

 ---

 ## 📁 Project Structure

 ```text
 chefclaude/
 ├── Frontend/            # React frontend (Vite)
 ├── Backend/             # Node.js backend (Express)
 └── README.md
 ```

 ## 🧑‍💻 Getting Started Locally

 ### 1. Clone the Repository
 ```bash
 git clone https://github.com/chrislpjones/chefclaude.git
 cd chefclaude
 ```

 ### 2. Setup the Frontend (React)
 ```bash
 cd Frontend
 npm install
 npm run dev
 ```
 - Starts the frontend on: `http://localhost:5173`

 ### 3. Setup the Backend (Node + Express)
 ```bash
 cd ../Backend
 npm install
 node index.js
 ```
 - Starts the backend on: `http://localhost:3001`

 ### 4. Configure Environment Variables

 Create `.env` files in both `Frontend/` and `Backend/`.

 #### `.env` (in `/Backend`)
 ```env
 PORT=3001
 CLAUDE_API_KEY=your_claude_api_key
 ```

 #### `.env` (in `/Frontend`)
 ```env
 VITE_API_BASE_URL=http://localhost:3001
 ```

 ---

 ## 🛠️ Deployment (High-Level Summary)

 1. **Frontend**:
    - Build React app with `npm run build`
    - Upload `dist/` to S3 bucket
    - Invalidate CloudFront cache

 2. **Backend**:
    - Deploy Lambda via zip or tools (Serverless Framework, AWS SAM, etc.)
    - API Gateway routes requests to Lambda

 3. **Domain**:
    - Use Route 53 or configure Squarespace to point to CloudFront distribution

 ---

 ## 📬 Contact

 Questions or feedback? Reach out at christianlpjones.dev@outlook.com

 ---

 ## 📄 License

 MIT License.
