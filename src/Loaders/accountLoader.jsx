

const accountLoader = async () => {
    const response = await fetch('/api/account-data');
    if (!response.ok) {
      throw new Response("Failed to load account data", { status: 500 });
    }
    return response.json();
  };
  

export default accountLoader;