import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbourCardComponent } from './abour-card.component';

describe('AbourCardComponent', () => {
  let component: AbourCardComponent;
  let fixture: ComponentFixture<AbourCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbourCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbourCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
