export async function handler(event, context) {
  try {
    const res = await fetch("https://script.google.com/macros/s/AKfycbzHnJb0fDbKyGv2fhIgFNskVoQT-1iXWciydBkigKyJrTMyC9M_g9KuFqYUUCssaicy/exec");

    if (!res.ok) {
      throw new Error("응답 실패: " + res.status);
    }

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
      body: JSON.stringify({ error: "Google API 호출 실패", detail: err.message })
    };
  }
}
