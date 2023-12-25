import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripFiltersComponent } from './trip-filters.component';

describe('TripFiltersComponent', () => {
  let component: TripFiltersComponent;
  let fixture: ComponentFixture<TripFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripFiltersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TripFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
