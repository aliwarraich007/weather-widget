import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { Forcast } from 'src/app/interfaces/forecast.interface';
import { WeatherService } from 'src/app/services/api/weather.api.service';
@Component({
  selector: 'app-daily-chart',
  templateUrl: './daily-chart.component.html',
  styleUrls: ['./daily-chart.component.scss'],
})
export class DailyChartComponent implements OnInit {
  public chart: any;
  public donutChart: any;
  weather!: Forcast;
  labels: string[] = [];
  data: number[] = [];
  daily_humidity: number[] = [];
  constructor(private weatherData: WeatherService) {}
  ngOnInit(): void {
    this.weatherData.current_weather().subscribe((data) => {
      this.weather = data;
    });
    this.weather.daily.forEach((element) => {
      const toStringDate = new Date(element.dt * 1000).toLocaleDateString();
      this.labels.push(toStringDate);
      this.data.push(element.temp.max);
      this.daily_humidity.push(element.humidity);
    });

    this.createChart();
    this.createPieChart();
  }

  createChart() {
    this.chart = new Chart('MyChart', {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [
          {
            label: 'temperature',
            data: this.data,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(255, 159, 64, 0.2)',
              'rgba(255, 205, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(201, 203, 207, 0.2)',
            ],
            borderColor: [
              'rgb(255, 99, 132)',
              'rgb(255, 159, 64)',
              'rgb(255, 205, 86)',
              'rgb(75, 192, 192)',
              'rgb(54, 162, 235)',
              'rgb(153, 102, 255)',
              'rgb(201, 203, 207)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        aspectRatio: 2.5,
      },
    });
  }

  createPieChart() {
    this.donutChart = new Chart('donutChart', {
      type: 'doughnut',
      data: {
        labels: this.labels,
        datasets: [
          {
            label: 'Humidity',
            data: this.daily_humidity,
            backgroundColor: [
              'rgba(255, 99, 132)',
              'rgba(255, 159, 64)',
              'rgba(255, 205, 86)',
              'rgba(75, 192, 192)',
              'rgba(54, 162, 235)',
            ],
            hoverOffset: 4,
          },
        ],
      },
    });
  }
}
