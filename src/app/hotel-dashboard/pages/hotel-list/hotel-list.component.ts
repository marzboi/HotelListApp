import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HotelCardComponent } from '../../components/hotel-card/hotel-card.component';
import { HotelsService } from '../../../services/hotels.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-hotel-list',
  standalone: true,
  imports: [CommonModule, HotelCardComponent, InfiniteScrollModule],
  templateUrl: './hotel-list.component.html',
  styles: `
    div{
      -ms-overflow-style: none;
      scrollbar-width: none;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class HotelListComponent {
  public hotelsService = inject(HotelsService);

  onScroll() {
    this.hotelsService.fetchHotels(true);
  }

  clear() {
    this.hotelsService.clearFilters();
  }
}
