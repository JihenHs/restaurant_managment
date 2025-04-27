import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCuisinierComponent } from './dashboard-cuisinier.component';

describe('DashboardCuisinierComponent', () => {
  let component: DashboardCuisinierComponent;
  let fixture: ComponentFixture<DashboardCuisinierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardCuisinierComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardCuisinierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
