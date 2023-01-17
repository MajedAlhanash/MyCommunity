import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public src = './assets/images/users/default.png';

  //Sidebar
  public items!: MenuItem[];

  constructor(
    private router :Router
  ) { }

  ngOnInit(): void {
    
  }


  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/login'])
  }
}
