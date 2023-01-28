import { Component } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  options: AnimationOptions = {    
    path: './assets/46541-nature-visite-travel.json'  
  };  

  constructor() { }  

  onAnimate(animationItem: AnimationItem): void {    
    console.log(animationItem);  
  }
}
