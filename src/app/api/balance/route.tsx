/**
 * Handles GET requests to fetch balance from the external API.
 *
 * @param {Request} request - The incoming request object.
 * @returns {Promise<NextResponse>} - The response object containing the balance data or an error message.
 */
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const xIdp = request.headers.get("X-idp-id-token");
  const xCtn = request.headers.get("X-CTN");
  if (!xIdp || !xCtn) {
    return NextResponse.json({ error: "No headers provided" }, { status: 400 });
  }
  const response = await fetch(`${process.env.EXTERNAL_API_DOMAIN}/mobile/api/v1/balance/main`, {
    headers: {
      "X-idp-id-token": xIdp,
      "X-CTN": xCtn,
    },
  });

  if (!response.ok) {
    return NextResponse.json({ error: "Failed to fetch balance" }, { status: response.status });
  }

  const data = await response.json();
  return NextResponse.json(data);
}
