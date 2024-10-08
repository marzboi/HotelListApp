import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DropdownMenuComponent } from './dropdown-menu.component';
import { HotelsService } from '../../../services/hotels.service';
import { HttpClientModule } from '@angular/common/http';

describe('DropdownMenuComponent', () => {
  let component: DropdownMenuComponent;
  let fixture: ComponentFixture<DropdownMenuComponent>;
  let hotelsService: HotelsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        DropdownMenuComponent,
        HttpClientModule,
      ],
      providers: [{ provide: HotelsService }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownMenuComponent);
    component = fixture.componentInstance;
    hotelsService = TestBed.inject(HotelsService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
