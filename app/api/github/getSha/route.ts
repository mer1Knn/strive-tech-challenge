import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const { repo, filePath } = await req.json();

    if (!repo || !filePath) {
      return NextResponse.json(
        { error: "Repository and file path are required" },
        { status: 400 }
      );
    }

    const [owner, repoName] = repo
      .replace("https://github.com/", "")
      .split("/");

    const url = `https://api.github.com/repos/${owner}/${repoName}/contents/${filePath}`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
    });

    const sha = response.data.sha;
    return NextResponse.json({ sha });
  } catch (error) {
    console.error("Error fetching SHA:", error);
    return NextResponse.json(
      {
        error:
          "Failed to fetch file SHA from GitHub. Ensure the repository and file path are correct.",
      },
      { status: 500 }
    );
  }
}
