import { Component, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TokenService } from './services/token.service';
import { MessageComponent } from './message/message.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MessageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnDestroy{
  title = 'plantas';

  constructor(private tokenService:TokenService){}

  ngOnDestroy(): void {
    //destruir el timeout de tokenservice y las cookies
    this.tokenService.logOut();
  }
}
