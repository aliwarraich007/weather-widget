import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MainComponent } from './layout/main/main.component';
import { AuthGuard } from './guards/auth.guard';
import { forecastResolver } from './services/resolver/forecast.resolver';
import { AuthenticatedGuard } from './guards/authenticated.guard';
import { WeatherWidgetComponent } from './pages/weather-widget/weather-widget.component';
import { AuthComponent } from './pages/auth/auth.component';
import { DailyChartComponent } from './pages/daily-chart/daily-chart.component';
const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
  {
    path: 'weather',
    canActivate: [AuthGuard],
    component: WeatherWidgetComponent,
    resolve: [forecastResolver],
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
  },
  {
    path: 'auth',
    component: AuthComponent,
    canActivate: [AuthenticatedGuard],
  },
  {
    path: 'forcast-chart',
    component: DailyChartComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
