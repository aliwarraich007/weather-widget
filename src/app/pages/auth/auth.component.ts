import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  authForm!: FormGroup;
  message!: string;
  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.authForm = new FormGroup({
      username: new FormControl('forenax', Validators.required),
      password: new FormControl('forenax', Validators.required),
    });
  }

  onSubmit() {
    const username: string = this.authForm.value['username'];
    const password: string = this.authForm.value['password'];
    this.auth.login(username, password);
  }
}
