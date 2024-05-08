export const onRequest: PagesFunction = async (context) => {
  // const req = context.request as Request;

  // if (req.method !== "GET" && req.url.indexOf("/api/asset?") !== -1)
  //   return context.next();

  // const auth = req.headers.get("Authorization");

  // if (auth !== "Example auth header") {
  //   return new Response("Missing or invalid auth header", {
  //     status: 401,
  //   });
  // }

  return context.next();
};
