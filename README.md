# **STRIVE Tech Challenge**

This is a Next.js project built as part of the STRIVE Tech Challenge. The app takes a GitHub repository and file SHA as inputs, fetches the file content, and analyzes its code quality using an LLM (Large Language Model) backend.

---

## **Features**

- Fetch file contents from a GitHub repository using the file SHA.
- Analyze code quality via an LLM backend.
- Display a quality score and reasoning for the evaluation.

---

## **Requirements**

### **Prerequisites**

1. **Node.js**: Version 18 or higher
2. **npm**: Comes bundled with Node.js.
3. **GitHub Personal Access Token**: Needed to access GitHub APIs.
4. **LLM Backend URL**: Endpoint for the LLM backend to analyze the code.

---

## **Setup Instructions**

### **1. Clone the Repository**

```bash
git clone https://github.com/mer1knn/strive-tech-challenge.git
cd strive-tech-challenge
```

### **2. Install Dependencies**

```bash
npm install
```

### **3. Environment Variables**

Create a `.env.local` file in the root of the project and add the following variables:

```
BASE_URL=http://localhost:3000

# GitHub API Key
GITHUB_ACCESS_TOKEN=your_github_personal_access_token

# OpenAI API Key
OPENAI_API_KEY=http://your_openai_api-key
```

#### **How to Get a GitHub Personal Access Token**

1. Go to [GitHub Personal Access Tokens](https://github.com/settings/tokens).
2. Click **Generate new token** (Classic).
3. Generate the token and copy it.
4. Paste it in the `.env.local` file under `GITHUB_ACCESS_TOKEN`.

---

## **Running the Application Locally**

### **1. Start the Development Server**

```bash
npm run dev
```

### **2. Open the App**

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## **Using the App**

1. Enter the GitHub repository URL (e.g., `https://github.com/user/repo`).
2. Enter the file SHA for the file you want to analyze.
3. Submit the form to fetch the file and analyze its quality.

---

## **API Routes**

### **1. `/api/github/getSha`**

Fetches the SHA of a file in the specified repository.

**Request**:

```json
{
  "repo": "https://github.com/user/repo",
  "filePath": "path/to/file"
}
```

**Response**:

```json
{
  "sha": "file_sha_value"
}
```

---

### **2. `/api/llm/analyzeCode`**

Analyzes the quality of the fetched file using the LLM backend.

**Request**:

```json
{
  "repo": "https://github.com/user/repo",
  "filePath": "path/to/file"
}
```

**Response**:

```json
{
  "score": 85,
  "reasoning": "The code follows best practices but could improve on error handling."
}
```

---

## **Technologies Used**

- **Next.js** (App Router) - For the frontend and backend logic.
- **TypeScript** - For type safety.
- **LangChain** - For integrating with the LLM backend.
- **Tailwind CSS** - For styling.

---
