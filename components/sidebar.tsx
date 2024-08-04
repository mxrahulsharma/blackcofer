"use client";
import React, { useState, useEffect } from 'react';
import { Popover } from './ui/popover';
import { ComboboxDemo } from './ui/combobox';

interface FilterData {
  end_year: string;
  topic: string;
  sector: string;
  region: string;
  pestle: string;
  source: string;
  swot: string;
  country: string;
  city: string;
}

const Sidebar: React.FC = () => {
  const [filters, setFilters] = useState<FilterData>({
    end_year: '',
    topic: '',
    sector: '',
    region: '',
    pestle: '',
    source: '',
    swot: '',
    country: '',
    city: ''
  });

  const [endYears, setEndYears] = useState<string[]>([]);
  const [topics, setTopics] = useState<string[]>([]);
  const [sectors, setSectors] = useState<string[]>([]);
  const [regions, setRegions] = useState<string[]>([]);
  const [pestles, setPestles] = useState<string[]>([]);
  const [sources, setSources] = useState<string[]>([]);
  const [countries, setCountries] = useState<string[]>([]);
  const [options, setOptions] = useState<string[]>([]); // State to hold fetched options

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/mongo");
        const data = await response.json();
        setCountries(data.country || []);
        setEndYears(data.end_year || []);
        setTopics(data.topic || []);
        setSectors(data.sector || []);
        setRegions(data.region || []);
        setPestles(data.pestle || []);
        setSources(data.source || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleFilterChange = (key: keyof FilterData, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  // Assuming the correct prop name for your ComboboxDemo is 'items'
  interface ComboboxProps {
    selectedValue: string;
    onChange: (value: string) => void;
    items: string[]; 
    filterKey: string;
    setData: (data: any[]) => void;
  }

  return (
    <div>
      <aside className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0">
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <span className="flex-2 ms-6 text-left rtl:text-right whitespace-nowrap text:orange">
              Filters
            </span>
            {[
              { key: 'country', options: countries },
              { key: 'end_year', options: endYears },
              { key: 'topic', options: topics },
              { key: 'sector', options: sectors },
              { key: 'region', options: regions },
              { key: 'pestle', options: pestles },
              { key: 'source', options: sources },
            ].map(({ key, options }) => (
              <li key={key}>
                <button
                  type="button"
                  className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                  aria-controls="dropdown-example"
                  data-collapse-toggle="dropdown-example"
                >
                  <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </span>
                </button>
                <ComboboxDemo
                  choices={options} // Using the correct prop name 'items'
                  selectedValue={filters[key as keyof FilterData]}
                  onChange={(value) => handleFilterChange(key as keyof FilterData, value)}
                  filterKey={key}
                  setData={(data: any[]) => console.log(data)}
                />
              </li>
            ))}
          </ul>
        </div>
        <Popover />
      </aside>
    </div>
  );
};

export default Sidebar;