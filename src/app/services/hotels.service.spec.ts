import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HotelsService } from './hotels.service';
import { Hotel, HotelResponse } from '../interface/req-response';

describe('HotelsService', () => {
  let hotelsService: HotelsService;
  let httpMock: HttpTestingController;

  function handleInitialRequest(httpMock: HttpTestingController) {
    const req = httpMock.expectOne(
      'http://localhost:3000/hotels?_page=1&_per_page=9'
    );
    req.flush({
      data: [],
      next: null,
      prev: null,
      total: 0,
    });
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HotelsService],
    });
    hotelsService = TestBed.inject(HotelsService);
    httpMock = TestBed.inject(HttpTestingController);
    handleInitialRequest(httpMock);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('The service should be created', () => {
    expect(hotelsService).toBeTruthy();
  });

  describe('The fetchHotels method', () => {
    it('should fetch hotels and update state', () => {
      const mockResponse: HotelResponse = {
        data: [
          {
            id: '1',
            name: 'Hotel A',
            stars: 4,
            rate: 8.5,
            price: 100,
          } as Hotel,
          { id: '2', name: 'Hotel B', stars: 3, rate: 7.5, price: 80 } as Hotel,
        ],
        next: 2,
        prev: null,
        items: 2,
      } as HotelResponse;

      hotelsService.fetchHotels();

      const req = httpMock.expectOne(
        'http://localhost:3000/hotels?_page=1&_per_page=9'
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);

      expect(hotelsService.hotels()).toEqual(mockResponse.data);
      expect(hotelsService.loading()).toBeFalse();
    });

    it('should append hotels when loading more', () => {
      const initialHotels: Hotel[] = [
        {
          id: '1',
          name: 'Hotel A',
          stars: 4,
          rate: 8.5,
          price: 100,
          image: '',
          address: '',
        },
      ];
      hotelsService['hotelsArray'] = initialHotels;
      hotelsService['page'] = 1;
      hotelsService['next'] = 2;

      const mockResponse: HotelResponse = {
        data: [
          {
            id: '2',
            name: 'Hotel B',
            stars: 3,
            rate: 7.5,
            price: 80,
            image: '',
            address: '',
          },
        ],
        next: null,
        prev: 1,
        items: 2,
      } as HotelResponse;

      hotelsService.fetchHotels(true);

      const req = httpMock.expectOne(
        'http://localhost:3000/hotels?_page=2&_per_page=9'
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);

      expect(hotelsService.hotels()).toEqual([
        ...initialHotels,
        ...mockResponse.data,
      ]);
      expect(hotelsService['page']).toBe(2);
      expect(hotelsService['next']).toBeNull();
    });
  });

  describe('The filterBy method', () => {
    beforeEach(() => {
      hotelsService['hotelsArray'] = [
        {
          id: '1',
          name: 'Hotel A',
          stars: 4,
          rate: 8.5,
          price: 100,
          image: '',
          address: '',
        },
        {
          id: '2',
          name: 'Hotel B',
          stars: 3,
          rate: 7.5,
          price: 80,
          image: '',
          address: '',
        },
        {
          id: '3',
          name: 'Hotel C',
          stars: 5,
          rate: 9.0,
          price: 150,
          image: '',
          address: '',
        },
      ];
    });

    it('Should filter by stars', () => {
      hotelsService.filterBy('stars', true, 3);
      expect(hotelsService.hotels().length).toBe(1);
      expect(hotelsService.hotels()[0].name).toBe('Hotel A');
    });

    it('Should filter by name', () => {
      hotelsService.filterBy('name', 'B');
      expect(hotelsService.hotels().length).toBe(1);
      expect(hotelsService.hotels()[0].name).toBe('Hotel B');
    });

    it('Should filter by rating', () => {
      hotelsService.filterBy('rating', 8.0);
      expect(hotelsService.hotels().length).toBe(2);
      expect(hotelsService.hotels().map((h) => h.name)).toEqual([
        'Hotel A',
        'Hotel C',
      ]);
    });

    it('Should filter by price', () => {
      hotelsService.filterBy('price', 120);
      expect(hotelsService.hotels().length).toBe(2);
      expect(hotelsService.hotels().map((h) => h.name)).toEqual([
        'Hotel A',
        'Hotel B',
      ]);
    });
  });

  describe('The clearFilters method', () => {
    it('Should reset filters and show all hotels', () => {
      hotelsService['hotelsArray'] = [
        {
          id: '1',
          name: 'Hotel A',
          stars: 4,
          rate: 8.5,
          price: 100,
          image: '',
          address: '',
        },
        {
          id: '2',
          name: 'Hotel B',
          stars: 3,
          rate: 7.5,
          price: 80,
          image: '',
          address: '',
        },
      ];
      hotelsService.filterBy('name', 'A');
      expect(hotelsService.hotels().length).toBe(1);

      hotelsService.clearFilters();

      expect(hotelsService.hotels().length).toBe(2);
      expect(hotelsService.filters()).toEqual({
        stars: [false, false, false, false, false],
        name: '',
        rating: null,
        price: null,
      });
    });
  });
});
