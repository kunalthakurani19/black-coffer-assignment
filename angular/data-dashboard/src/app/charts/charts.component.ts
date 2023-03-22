import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as d3 from 'd3';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})
export class ChartsComponent implements OnInit {
  private svg: any;
  private margin = 50;
  private width = 750 - (this.margin * 2);
  private height = 400 - (this.margin * 2);

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getData().subscribe(data => {
      this.createChart(data);
    });
  }

  getData() {
    return this.http.get<any[]>('http://localhost:8080/data');
  }

  createChart(data: any[]): void {
    // Remove any existing chart
    if (this.svg) {
      this.svg.remove();
    }

    // Create the SVG element
    this.svg = d3.select('figure#chart')
      .append('svg')
      .attr('width', this.width + (this.margin * 2))
      .attr('height', this.height + (this.margin * 2))
      .append('g')
      .attr('transform', 'translate(' + this.margin + ',' + this.margin + ')');

    // Set up the scales and axis
    const x = d3.scaleBand().range([0, this.width]).padding(0.4);
    const y = d3.scaleLinear().range([this.height, 0]);
    x.domain(data.map(d => d.year));
    y.domain([0, d3.max(data, d => d.intensity)]);
    this.svg.append('g')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3.axisBottom(x));
    this.svg.append('g')
      .call(d3.axisLeft(y));

    // Add the bars
    this.svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d: { year: string; }) => x(d.year))
      .attr('y', (d: { intensity: d3.NumberValue; }) => y(d.intensity))
      .attr('width', x.bandwidth())
      .attr('height', (d: { intensity: d3.NumberValue; }) => this.height - y(d.intensity))
      .attr('fill', '#fde101');
  }
}
