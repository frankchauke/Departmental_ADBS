document.getElementById('dataForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const department = document.getElementById('department').value.trim();
  const age = document.getElementById('age').value;

  try {
    const response = await fetch('http://localhost:3000/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, department, age })
    });

    const result = await response.json();

    if (response.ok) {
      document.getElementById('output').innerText = result.message;
      document.getElementById('dataForm').reset();
    } else {
      document.getElementById('output').innerText = result.error || 'Submission failed.';
    }
  } catch (error) {
    console.error(error);
    document.getElementById('output').innerText = 'Error connecting to the server.';
  }
});
