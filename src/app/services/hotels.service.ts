import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Hotel, HotelResponse } from '../interface/req-response';

interface State {
  hotels: Hotel[];
  loading: boolean;
  filters: {
    stars: boolean[];
    name: string;
    rating: number | null;
    price: number | null;
  };
}

@Injectable({
  providedIn: 'root',
})
export class HotelsService {
  private http = inject(HttpClient);

  private hotelsArray: Hotel[] = [];
  private itemsPerPage = 9;
  private page = 1;
  private next!: number | null;

  #state = signal<State>({
    loading: false,
    hotels: [],
    filters: {
      stars: [false, false, false, false, false],
      name: '',
      rating: null,
      price: null,
    },
  });

  public hotels = computed(() => this.#state().hotels);
  public loading = computed(() => this.#state().loading);
  public filters = computed(() => this.#state().filters);

  constructor() {
    this.fetchHotels();
  }

  fetchHotels(loadMore: boolean = false) {
    if (loadMore && this.next === null) return;

    this.#state.set({
      ...this.#state(),
      loading: true,
    });

    const pageToFetch = loadMore ? this.page + 1 : this.page;

    this.http
      .get<HotelResponse>(
        `http://localhost:3000/hotels?_page=${pageToFetch}&_per_page=${this.itemsPerPage}`
      )
      .subscribe((res) => {
        this.hotelsArray = loadMore
          ? [...this.hotelsArray, ...res.data]
          : res.data;
        this.next = res.next;
        if (loadMore) this.page++;

        this.#state.set({
          loading: false,
          hotels: this.applyFilters(this.hotelsArray),
          filters: this.#state().filters,
        });
      });
  }

  filterBy(
    type: string,
    value: string | number | boolean | null,
    index?: number
  ) {
    let newFilters = { ...this.#state().filters };

    if (type === 'stars' && typeof index === 'number') {
      const newStars = [...newFilters.stars];
      newStars[index] = value as boolean;
      newFilters = { ...newFilters, stars: newStars };
    } else {
      newFilters = { ...newFilters, [type]: value };
    }

    this.#state.set({
      ...this.#state(),
      filters: newFilters,
      hotels: this.applyFilters(this.hotelsArray, newFilters),
    });
  }

  clearFilters() {
    this.#state.set({
      ...this.#state(),
      filters: {
        stars: [false, false, false, false, false],
        name: '',
        rating: null,
        price: null,
      },
      hotels: this.hotelsArray,
    });
  }

  private applyFilters(
    hotels: Hotel[],
    filters = this.#state().filters
  ): Hotel[] {
    let filtered = hotels;

    if (filters.stars.some((value) => value)) {
      filtered = filtered.filter((hotel) => filters.stars[hotel.stars - 1]);
    }

    if (filters.name) {
      filtered = filtered.filter((hotel) =>
        hotel.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }

    if (filters.rating !== null) {
      filtered = filtered.filter((hotel) => hotel.rate >= filters.rating!);
    }

    if (filters.price !== null) {
      filtered = filtered.filter((hotel) => hotel.price <= filters.price!);
    }

    return filtered;
  }
}
