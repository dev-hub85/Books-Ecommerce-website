import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookscatComponent } from './bookscat.component';

describe('BookscatComponent', () => {
  let component: BookscatComponent;
  let fixture: ComponentFixture<BookscatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookscatComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookscatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
