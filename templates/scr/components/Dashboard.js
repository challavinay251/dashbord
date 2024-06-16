// src/components/Dashboard.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as d3 from 'd3';

const Dashboard = () => {
    const [data, setData] = useState([]);
    const [filters, setFilters] = useState({
        endYear: '',
        topic: '',
        sector: '',
        region: '',
        pestle: '',
        source: '',
        swot: '',
        country: '',
        city: '',
    });

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (data.length) {
            drawChart();
        }
    }, [data]);

    const fetchData = (filterParams = {}) => {
        axios.get('http://localhost:8000/api/data/', { params: filterParams })
            .then(response => setData(response.data))
            .catch(error => console.error('Error fetching data:', error));
    };

    const drawChart = () => {
        const svg = d3.select('#chart')
            .append('svg')
            .attr('width', 800)
            .attr('height', 400);

        svg.selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .attr('x', (d, i) => i * 50)
            .attr('y', d => 400 - d.intensity * 10)
            .attr('width', 40)
            .attr('height', d => d.intensity * 10)
            .attr('fill', 'blue');
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: value,
        });
    };

    const applyFilters = () => {
        fetchData(filters);
    };

    return (
        <div>
            <h1>Data Dashboard</h1>
            <div>
                <input type="text" name="endYear" placeholder="End Year" onChange={handleFilterChange} />
                <input type="text" name="topic" placeholder="Topic" onChange={handleFilterChange} />
                <input type="text" name="sector" placeholder="Sector" onChange={handleFilterChange} />
                <input type="text" name="region" placeholder="Region" onChange={handleFilterChange} />
                <input type="text" name="pestle" placeholder="PEST" onChange={handleFilterChange} />
                <input type="text" name="source" placeholder="Source" onChange={handleFilterChange} />
                <input type="text" name="swot" placeholder="SWOT" onChange={handleFilterChange} />
                <input type="text" name="country" placeholder="Country" onChange={handleFilterChange} />
                <input type="text" name="city" placeholder="City" onChange={handleFilterChange} />
                <button onClick={applyFilters}>Apply Filters</button>
            </div>
            <div id="chart"></div>
        </div>
    );
};

export default Dashboard;
