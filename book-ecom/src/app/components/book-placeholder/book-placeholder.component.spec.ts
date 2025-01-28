import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookPlaceholderComponent } from './book-placeholder.component';

describe('BookPlaceholderComponent', () => {
  let component: BookPlaceholderComponent;
  let fixture: ComponentFixture<BookPlaceholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookPlaceholderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
