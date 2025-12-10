document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('userForm');
  const message = document.getElementById('message');
  const usersList = document.getElementById('usersList');

  async function fetchUsers() {
    try {
      const res = await fetch('/api/users');
      const data = await res.json();
      usersList.innerHTML = '';
      data.users.forEach(u => {
        const li = document.createElement('li');
        li.textContent = `${u.name} — ${u.email} — ${u.department}`;
        usersList.appendChild(li);
      });
    } catch (err) {
      console.error(err);
    }
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    message.textContent = '';
    const payload = {
      name: document.getElementById('name').value.trim(),
      email: document.getElementById('email').value.trim(),
      department: document.getElementById('department').value
    };

    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) {
        message.textContent = data.error || 'Error submitting form';
        message.className = 'error';
        return;
      }
      message.textContent = 'User saved successfully.';
      message.className = 'success';
      form.reset();
      fetchUsers();
    } catch (err) {
      console.error(err);
      message.textContent = 'Network error';
      message.className = 'error';
    }
  });

  fetchUsers();
});
