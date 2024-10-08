import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HotelsService } from '../../../services/hotels.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { of, switchMap } from 'rxjs';

@Component({
  selector: 'app-hotel-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './hotel-detail.component.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HotelDetailComponent {
  private route = inject(ActivatedRoute);
  private hotelsService = inject(HotelsService);

  public hotel = toSignal(
    this.route.params.pipe(
      switchMap(({ id }) => {
        return of(this.hotelsService.hotels().find((hotel) => hotel.id === id));
      })
    )
  );
}
