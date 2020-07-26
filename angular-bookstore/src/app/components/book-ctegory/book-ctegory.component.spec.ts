import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCtegoryComponent } from './book-ctegory.component';

describe('BookCtegoryComponent', () => {
  let component: BookCtegoryComponent;
  let fixture: ComponentFixture<BookCtegoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookCtegoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookCtegoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
