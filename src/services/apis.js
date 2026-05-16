export const fetchOrphans = async () => {
  try {
    const response = await fetch("/api/orphans");
    if (!response.ok) {
      throw new Error('Failed to fetch orphans');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching orphans:', error);
    throw error;
  }
};

