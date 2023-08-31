import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() title: string = '';
  @Input() type: string = 'button';
  @Output() clicked: EventEmitter<void> = new EventEmitter<void>();
  @Input() class: string = 'button-white';
  @Input() disabled: boolean = false;
  handleClick() {
    this.clicked.emit();
  }
}
