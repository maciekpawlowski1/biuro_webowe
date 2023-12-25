import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @Input() show: boolean = false;

  @Output() showChange = new EventEmitter<boolean>()

  close() {
    this.show = false;
    this.showChange.emit(false)
  }
}
