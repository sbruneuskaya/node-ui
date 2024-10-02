import React, { useState, useEffect } from 'react';
import { Radio, RadioGroup, FormControlLabel, Button, Box } from '@mui/material';
import { fetchOptions, fetchStatistics, submitVote, resetStatistics } from '../api/api';
import { RenderStatistics } from './renderStatistics';

const RadioForm = () => {
    const [selectedOption, setSelectedOption] = useState('');
    const [statistics, setStatistics] = useState({ option1: 0, option2: 0, option3: 0 });
    const [options, setOptions] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const optionsData = await fetchOptions();
                setOptions(optionsData);
                console.log(optionsData)
                const statisticsData = await fetchStatistics();
                setStatistics(statisticsData);
            } catch (error) {
                console.error('error fetchData:', error);
            }
        };

        fetchData();
    }, []);

    const handleVote = async (event) => {
        event.preventDefault();
        try {
            await submitVote(selectedOption);
            const updatedStatistics = await fetchStatistics();
            setStatistics(updatedStatistics);
        } catch (error) {
            console.error('error handleVote:', error);
        }
    };

    const handleReset = async () => {
        try {
            await resetStatistics();
            const updatedStatistics = await fetchStatistics();
            setStatistics(updatedStatistics);
        } catch (error) {
            console.error('error handleReset:', error);
        }
    };

    const totalVotes = statistics.option1 + statistics.option2 + statistics.option3;

    const getPercentage = (optionVotes) => {
        return totalVotes > 0 ? (optionVotes / totalVotes) * 100 : 0;
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="100vh">
            <form onSubmit={handleVote}>
                <RadioGroup value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
                    {options.map(option => (
                        <FormControlLabel
                            key={option.code}
                            control={<Radio />}
                            label={option.text}
                            value={option.code}
                        />
                    ))}
                </RadioGroup>
                <Button type="submit" variant="contained" color="primary">
                    Отправить
                </Button>
                <Button onClick={handleReset} variant="contained" color="secondary">
                    Сбросить
                </Button>
            </form>

            <Box mt={4} width="100%">
                <RenderStatistics statistics={statistics} getPercentage={getPercentage} />
            </Box>
        </Box>
    );
};

export default RadioForm;
