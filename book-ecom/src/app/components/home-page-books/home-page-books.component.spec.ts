import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageBooksComponent } from './home-page-books.component';

describe('HomePageBooksComponent', () => {
  let component: HomePageBooksComponent;
  let fixture: ComponentFixture<HomePageBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePageBooksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomePageBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
