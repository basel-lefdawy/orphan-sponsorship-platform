export const createDonation = async (data) => {
  const response = await fetch( "https://694907ae1ee66d04a450ee44.mockapi.io/api/donations",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  if (!response.ok) {
    throw new Error("Request failed");
  }

  return response.json(); 
};
