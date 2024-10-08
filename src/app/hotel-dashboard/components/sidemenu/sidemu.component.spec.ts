import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SidemenuComponent } from './sidemenu.component';
import { DropdownMenuComponent } from '../dropdown-menu/dropdown-menu.component';
import { HttpClientModule } from '@angular/common/http';

describe('SidemenuComponent', () => {
  let component: SidemenuComponent;
  let fixture: ComponentFixture<SidemenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterModule,
        SidemenuComponent,
        DropdownMenuComponent,
        HttpClientModule,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {},
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidemenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render dropdown menu component', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-dropdown-menu')).toBeTruthy();
  });
});
