import { Env } from "../../api/env";

const mimeTypes: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".json": "application/json",
};

// Function to determine MIME type from file extension
function getMimeType(filename: string): string {
  const ext = filename.slice(filename.lastIndexOf(".")).toLowerCase();
  return mimeTypes[ext] || "application/octet-stream";
}

export const onRequest: PagesFunction<Env> = async (ctx) => {
  const url = new URL(ctx.request.url);
  const searchParams = new URLSearchParams(url.search);
  const key = searchParams.get("path");

  if (!key) {
    return new Response("Resource not found", {
      status: 404,
    });
  }

  switch (ctx.request.method) {
    case "GET": {
      const file = await ctx.env.POKEDEX.get(key);
      if (!file) {
        return new Response("Resource not found", {
          status: 404,
        });
      }
      const contentType = getMimeType(key);
      const eTag = `${file.httpEtag}`;

      // Respond with the file data and appropriate headers
      return new Response(file.body, {
        status: 200,
        headers: {
          "Content-Type": contentType,
          ETag: eTag,
          "Cache-Control": "max-age=3600",
        },
      });
    }
    default:
      return new Response(`${ctx.request.method} is not allowed.`, {
        status: 405,
        headers: {
          Allow: "GET",
        },
      });
  }
};
