import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import HotelListComponent from './hotel-list.component';
import { HotelCardComponent } from '../../components/hotel-card/hotel-card.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { HotelsService } from '../../../services/hotels.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

class MockHotelsService {
  hotels = of([]);
  loading = of(false);
  filters = of({});

  fetchHotels() {}
  clearFilters() {}
}

describe('HotelListComponent', () => {
  let component: HotelListComponent;
  let fixture: ComponentFixture<HotelListComponent>;
  let hotelsService: HotelsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        HotelCardComponent,
        InfiniteScrollModule,
        HttpClientTestingModule,
        HotelListComponent,
      ],
      providers: [{ provide: MockHotelsService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelListComponent);
    component = fixture.componentInstance;
    hotelsService = TestBed.inject(HotelsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call fetchHotels on scroll', () => {
    spyOn(hotelsService, 'fetchHotels');
    component.onScroll();
    expect(hotelsService.fetchHotels).toHaveBeenCalledWith(true);
  });

  it('should call clearFilters on clear', () => {
    spyOn(hotelsService, 'clearFilters');
    component.clear();
    expect(hotelsService.clearFilters).toHaveBeenCalled();
  });
});
