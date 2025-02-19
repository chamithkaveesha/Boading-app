
const email = 'email.com';

export const accountLoader = async () => {
    const response = await fetch('/api/users/email?email={email}');
    if (!response.ok) {
      throw new Response("Failed to load account data", { status: 500 });
    }
    return response.json();
  };
  