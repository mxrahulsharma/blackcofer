"use client";
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface DataPoint {
  end_year: number;
  intensity: number;
  sector: string;
  topic: string;
  region: string;
  relevance: number;
  pestle: string;
  likelihood: number;
  country: string;
}

interface D3VisualizationProps {
  data: DataPoint[];
}

const D3Visualization: React.FC<D3VisualizationProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (svgRef.current) {
      const svg = d3.select(svgRef.current);

      // Set up dimensions and margins
      const width = 928;
      const height = 500;
      const margin = { top: 30, right: 30, bottom: 30, left: 40 };

      svg.attr('width', width).attr('height', height);

      // Set up scales
      const x = d3
        .scaleBand()
        .domain(data.map(d => d.country))
        .range([margin.left, width - margin.right])
        .padding(0.1);

      const y = d3
        .scaleLinear()
        .domain([0, d3.max(data, d => d.intensity) ?? 0])
        .nice()
        .range([height - margin.bottom, margin.top]);

      // Clear existing contents
      svg.selectAll('*').remove();

      // Append bars
      svg
        .selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', d => x(d.country) ?? margin.left)
        .attr('y', d => y(d.intensity) ?? height - margin.bottom)
        .attr('height', d => y(0) - y(d.intensity))
        .attr('width', x.bandwidth())
        .attr('fill', 'steelblue');

      // Add x-axis
      svg
        .append('g')
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x).tickSizeOuter(0));

      // Add y-axis
      svg
        .append('g')
        .attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft(y));

      // Add labels
      svg
        .append('text')
        .attr('x', width / 2)
        .attr('y', margin.top / 2)
        .attr('text-anchor', 'middle')
        .style('font-size', '16px')
        .style('text-decoration', 'underline')
        .text('Intensity by Country');
    }
  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default D3Visualization;
