document.getElementById('dataForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const department = document.getElementById('department').value.trim();
  const age = document.getElementById('age').value;
  const outputDiv = document.getElementById('output');
  const submitBtn = document.querySelector('button[type="submit"]');

  // Basic validation
  if (!name || !department || age <= 0) {
    outputDiv.innerText = 'Please fill all fields correctly.';
    outputDiv.style.color = 'red';
    return;
  }

  try {
    submitBtn.disabled = true;
    submitBtn.innerText = 'Submitting...';

    const response = await fetch('/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, department, age })
    });

    const result = await response.json();

    if (response.ok) {
      outputDiv.innerText = result.message;
      outputDiv.style.color = 'green';
      document.getElementById('dataForm').reset();
    } else {
      outputDiv.innerText = result.error || 'Submission failed.';
      outputDiv.style.color = 'red';
    }
  } catch (error) {
    console.error(error);
    outputDiv.innerText = 'Error connecting to the server.';
    outputDiv.style.color = 'red';
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerText = 'Submit';
  }
});
