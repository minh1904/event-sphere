export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
  role?: 'user' | 'admin';
}) {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || 'Không thể tạo tài khoản');
  }
  return result;
}
