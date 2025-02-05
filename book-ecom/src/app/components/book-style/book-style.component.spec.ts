import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookStyleComponent } from './book-style.component';

describe('BookStyleComponent', () => {
  let component: BookStyleComponent;
  let fixture: ComponentFixture<BookStyleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookStyleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookStyleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
