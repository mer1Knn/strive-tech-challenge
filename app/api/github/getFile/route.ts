import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const { repo, sha } = await req.json();
    const [owner, repoName] = repo
      .replace("https://github.com/", "")
      .split("/");
    const url = `https://api.github.com/repos/${owner}/${repoName}/git/blobs/${sha}`;

    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` },
    });

    const content = Buffer.from(response.data.content, "base64").toString(
      "utf-8"
    );
    return NextResponse.json({ content });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch file from GitHub" },
      { status: 500 }
    );
  }
}
