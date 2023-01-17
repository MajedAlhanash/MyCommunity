import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { LoadingService } from 'src/app/services/loading/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private router: Router,
    private authSer: AuthService,
    private loading: LoadingService
  ) {
    this.loginForm = this._fb.group({
      Email: ['', Validators.required],
      Password: ['']
    });
  }

  ngOnInit(): void {
  }

  onSumbit(form: any) {
    this.router.navigate(['/']);
    // this.loading.showLoading()    
    // this.authSer.login(form).subscribe(res => {
    //   this.loading.hideLoading
    //   localStorage.setItem('token', res.value.token)
    //   this.router.navigate(['/']);
    // })
  }


}
