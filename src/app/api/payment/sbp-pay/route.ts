/**
 * Handles GET requests to fetch balance from the external API.
 *
 * @param {Request} request - The incoming request object.
 * @returns {Promise<NextResponse>} - The response object containing the balance data or an error message.
 */
import { NextResponse } from "next/server";
import { z } from 'zod';

const amountSchema = z.object({
  amount: z.number(),
});

export async function POST(request: Request) {
  const xIdp = request.headers.get("X-idp-id-token");
  const xCtn = request.headers.get("X-CTN");

  if (!xIdp || !xCtn) {
    return NextResponse.json({ error: "No headers provided" }, { status: 400 });
  }

  const body = await request.json();
  const parsedBody = amountSchema.safeParse(body);

  if (!parsedBody.success) {
    console.log('uncess')
    return new Response(JSON.stringify({ error: parsedBody.error.errors }), { status: 400 });
  }

  const { amount } = parsedBody.data;

  const response = await fetch(`${process.env.EXTERNAL_API_DOMAIN}/mobile/api/v2/payment/sbpPay?ctn=${xCtn}`, {
    method: 'POST',
    headers: {
      "X-idp-id-token": xIdp,
      "X-CTN": xCtn,
    },
    body: JSON.stringify({
      "createBinding": false,
      "amount": amount
    })
  });

  if (!response.ok) {
    return NextResponse.json({ error: "Failed to fetch balance" }, { status: response.status });
  }

  const data = await response.json();
  return NextResponse.json(data);
}
