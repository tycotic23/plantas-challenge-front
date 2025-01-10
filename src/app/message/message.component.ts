import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessagesService } from '../message.service';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message.component.html',
  styleUrl: './message.component.css'
})
export class MessageComponent {
  constructor(public messageService:MessagesService){}
}
