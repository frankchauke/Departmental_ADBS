    document.getElementById('dataForm').addEventListener('submit', async function (e) {
      e.preventDefault(); // Prevent page refresh

      const name = document.getElementById('name').value;
      const department = document.getElementById('department').value;
      const age = document.getElementById('age').value;

      try {
        const response = await fetch('/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, department, age })
        });

        const result = await response.json();
        const outputDiv = document.getElementById('output');

        if (response.ok) {
          outputDiv.innerHTML = `<p style="color: green;">${result.message}</p>`;
          document.getElementById('dataForm').reset();
        } else {
          outputDiv.innerHTML = `<p style="color: red;">${result.error || 'Submission failed'}</p>`;
        }
      } catch (error) {
        console.error('Submission error:', error);
        document.getElementById('output').innerHTML = `<p style="color: red;">Error submitting form.</p>`;
      }
    });
