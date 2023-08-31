import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { RainEffectComponent } from 'src/app/components/rain-effect/rain-effect.component';
import { WeatherWidgetComponent } from 'src/app/pages/weather-widget/weather-widget.component';
@NgModule({
  declarations: [WeatherWidgetComponent, ButtonComponent, RainEffectComponent],
  imports: [ReactiveFormsModule, CommonModule],
  exports: [ButtonComponent, CommonModule],
})
export class WeatherModule {}
