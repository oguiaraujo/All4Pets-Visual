'use server';

export async function getServices() {
  const res = await fetch('http://localhost:8000/api/services/');
  return res.json();
}