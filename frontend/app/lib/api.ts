const API_BASE = 'http://localhost:5000/api/tasks';

export async function fetchTasks() {
  const res = await fetch(API_BASE, {
    method: 'GET',
    credentials: 'include',
  });
  return res.json();
}

export async function addTask(task: any) {
  const res = await fetch(API_BASE, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  console.log('Response from addTask:', res);
  return res.json();
}

export async function markAsDone(id: number) {
  const res = await fetch(`${API_BASE}/${id}/done`, {
    method: 'PUT',
    credentials: 'include',
  });
  return res.json();
}

export async function markasUndone(id: number) {
  const res = await fetch(`${API_BASE}/${id}/undone`, {
    method: 'PUT',
    credentials: 'include',
  });
  return res.json();
}

export async function fetchUpcoming(range: 'week' | 'month') {
  const res = await fetch(`${API_BASE}/upcoming/${range}`, {
    method: 'GET',
    credentials: 'include',
  });
  return res.json();
}

export const deleteTask = async (id: number) => {
  const res = await fetch(`${API_BASE}/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Failed to delete task');
  return data;
};

export const loginUser = async (email: any, password: any) => {
  const res = await fetch('http://localhost:5000/api/auth/login', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  return await res.json();
};

export const registerUser = async (email: any, password: any) => {
  const res = await fetch('http://localhost:5000/api/auth/register', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  return await res.json();
};
