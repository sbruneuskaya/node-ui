import { Box, LinearProgress, Typography } from '@mui/material';
import React from 'react';

export const RenderStatistics = ({ statistics, getPercentage }) => {
    const options = ['option1', 'option2', 'option3'];

    return (
        <>
            <Typography variant="h6">Статистика голосов</Typography>
            {options.map((option, index) => (
                <Box key={option} mt={2}>
                    <Typography variant="body1">
                        Вариант {index + 1}: {statistics[option]} голосов / {getPercentage(statistics[option]).toFixed(2)}%
                    </Typography>
                    <LinearProgress
                        variant="determinate"
                        value={getPercentage(statistics[option])}
                        sx={{ backgroundColor: 'lightblue', '& .MuiLinearProgress-bar': { backgroundColor: index === 0 ? 'blue' : index === 1 ? 'red' : 'black' } }}
                    />
                </Box>
            ))}
        </>
    );
};
