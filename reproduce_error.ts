async function testAPI() {
  const endpoints = [
    'http://localhost:4000/management/courses',
    'http://localhost:4000/management/properties',
    'http://localhost:4000/management/instructors',
    'http://localhost:4000/management/faqs'
  ];

  for (const url of endpoints) {
    try {
      console.log(`Testing ${url}...`);
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        console.log(`✅ Success: ${url} returned ${data.length} items.`);
      } else {
        console.log(`❌ Error: ${url} returned status ${res.status}`);
        const text = await res.text();
        console.log(`Response: ${text}`);
      }
    } catch (e: any) {
      console.log(`❌ Failed to connect to ${url}: ${e.message}`);
    }
  }
}

testAPI();
