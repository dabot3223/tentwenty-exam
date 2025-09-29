export async function POST(req, { params }) {

  const body = await req.json();
  const API_URL = "https://vppayload.kamsoft.co.in/api";
  const DOMAIN_NAME = process.env.NEXT_PUBLIC_DOMAIN;
  console.log(searchParams,req.url,collection, endPoint,DOMAIN_NAME,body.domain === '' ? DOMAIN_NAME : body.domain)

  try {
    const result = await fetch(`${API_URL}/${collection}/${endPoint}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: method === 'POST' ? JSON.stringify({
        ...body,
        domain: body.domain === '' ? DOMAIN_NAME : body.domain
      }) : undefined
    });

    const data = await result.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error(error);
    return new Response(error.message, { status: error.status || 500 });
  }
}