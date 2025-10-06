import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/Services/auth.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent {
  constructor( private As :AuthService,private router :Router) {

   }
   logout() {
    this.As.signOut().then(() => {
      console.log('Logged out successfully');
      this.router.navigate(['/login']);  
    }
    ).catch((error) => {
      console.error('Error logging out:', error);
    }
    );
   }

}