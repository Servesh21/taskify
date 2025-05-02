const API_BASE = 'http://localhost:5000/api/tasks';

export async function fetchTasks() {
  const res = await fetch(API_BASE);
  return res.json();
}

export async function addTask(task: any) {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  console.log('Response from addTask:', res);
  return res.json();
}

export async function markAsDone(id: number) {
  const res = await fetch(`${API_BASE}/${id}/done`, {
    method: 'PUT',
  });
  return res.json();
}

export async function markasUndone(id: number) {
  const res = await fetch(`${API_BASE}/${id}/undone`, {
    method: 'PUT',
  });
  return res.json();    
}

export async function fetchUpcoming(range: 'week' | 'month') {
  const res = await fetch(`${API_BASE}/upcoming/${range}`);
  return res.json();
}
