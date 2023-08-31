import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { WeatherInterceptor } from './services/interceptors/weather.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NavComponent } from './components/nav/nav.component';
import { CardComponent } from './components/card/card.component';
import { LoaderComponent } from './components/loader/loader.component';
import { MainComponent } from 'src/app/layout/main/main.component';
import { AuthComponent } from './pages/auth/auth.component';
import { WeatherModule } from './helper/modules/weather.module';
@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NavComponent,
    CardComponent,
    LoaderComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    WeatherModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: WeatherInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
