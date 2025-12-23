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

export const fetchActivities = async () => {
  try {
    const response = await fetch('https://mocki.io/v1/0f346fc4-1c35-49b2-97c8-551d28034522');
    if (!response.ok) {
      throw new Error('Failed to fetch activities');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching activities:', error);
    throw error;
  }
};
