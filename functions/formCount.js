export async function handler(event, context) {
  try {
    const res = await fetch("https://script.google.com/macros/s/AKfycbyRUjBQOlzB6AiOnM2NnghYfHQotWVylkfYDEunHF5jyLWeLRM2UAdI-28mXkGpKGO8/exec");
    const data = await res.json();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Google API 호출 실패" })
    };
  }
}
