import { TestBed } from '@angular/core/testing';
import DashboardComponent from './dashboard.component';
import { SidemenuComponent } from './components/sidemenu/sidemenu.component';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

describe('Dashboard Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent, SidemenuComponent, HttpClientModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {},
        },
      ],
    }).compileComponents();
  });

  it('should create the component', () => {
    const fixture = TestBed.createComponent(DashboardComponent);
    const dashboard = fixture.componentInstance;
    expect(dashboard).toBeTruthy();
  });
});
