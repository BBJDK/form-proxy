let cache = {
  value: null,
  timestamp: 0
};

export async function handler(event, context) {
  const now = Date.now();
  const oneMinute = 60 * 1000;

  // 1분 이내 캐시된 값이 있으면 그걸 사용
  if (cache.value !== null && (now - cache.timestamp < oneMinute)) {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ responseCount: cache.value, cached: true })
    };
  }

  try {
    const res = await fetch("https://script.google.com/macros/s/AKfycbzHnJb0fDbKyGv2fhIgFNskVoQT-1iXWciydBkigKyJrTMyC9M_g9KuFqYUUCssaicy/exec");
    const data = await res.json();

    // 캐시 업데이트
    cache.value = data.responseCount;
    cache.timestamp = now;

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ responseCount: data.responseCount, cached: false })
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ error: "Google API 호출 실패", detail: err.message })
    };
  }
}
