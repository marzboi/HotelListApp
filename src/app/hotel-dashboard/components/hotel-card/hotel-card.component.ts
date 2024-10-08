import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Hotel } from '../../../interface/req-response';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-hotel-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './hotel-card.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HotelCardComponent {
  hotel = input.required<Hotel>();
}
