// api.js
const API_URL = 'http://64.226.104.45';

export const fetchOptions = async () => {
    try {
        const response = await fetch(`${API_URL}/variants`);
        if (!response.ok) {
            throw new Error('Ошибка при получении вариантов');
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const fetchStatistics = async () => {
    try {
        const response = await fetch(`${API_URL}/stat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Ошибка при получении статистики');
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const submitVote = async (selectedOption) => {
    try {
        const response = await fetch(`${API_URL}/vote`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ selectedOption }),
        });

        if (!response.ok) {
            throw new Error('Ошибка при отправке данных');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const resetStatistics = async () => {
    try {
        const response = await fetch(`${API_URL}/reset`, {
            method: 'POST',
        });

        if (!response.ok) {
            throw new Error('Ошибка при сбросе статистики');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};
