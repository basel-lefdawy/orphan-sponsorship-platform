export const fetchOrphans = async () => {
  try {
    const response = await fetch(`https://694988891282f890d2d67124.mockapi.io/orphandata`);
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

