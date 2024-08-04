"use client";
import React from 'react';
import D3Visualization from './D3Visualization';

interface FilteredDataProps {
  data: any[];
}

const FilteredData: React.FC<FilteredDataProps> = ({ data }) => {
  const transformedData = data.map(item => ({
    end_year: item.end_year,
    intensity: item.intensity,
    sector: item.sector,
    topic: item.topic,
    region: item.region,
    relevance: item.relevance,
    pestle: item.pestle,
    likelihood: item.likelihood,
    country: item.country
  }));

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Filtered Data</h2>
      {data.length > 0 ? (
        <>
          <ul className="list-disc pl-6 mb-4">
            {data.map((item, index) => (
              <li key={index} className="mb-2">
                <pre>{JSON.stringify(item, null, 2)}</pre>
              </li>
            ))}
          </ul>
          <D3Visualization data={transformedData} />
        </>
      ) : (
        <div className="text-center">No data available.</div>
      )}
    </div>
  );
};

export default FilteredData;
