import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
  visible = true;
  title = 'angular';

  supportedLanguages = ['en', 'es'];
  
  constructor (private translateService: TranslateService) {
    this.translateService.addLangs(this.supportedLanguages);
    const cuurentLang = localStorage.getItem('language') || 'en';
    this.translateService.use(cuurentLang);
  }

  ngOnInit(): void {}

  change() {  
    const lang = localStorage.getItem('language') === 'en'? 'es' : localStorage.getItem('language') ==='es'? 'en' : 'en';
    localStorage.setItem('language', lang);
    this.translateService.use(lang);
  }

}
