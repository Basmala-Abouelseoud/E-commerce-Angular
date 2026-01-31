import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishlistPagComponent } from './wishlist-pag.component';

describe('WishlistPagComponent', () => {
  let component: WishlistPagComponent;
  let fixture: ComponentFixture<WishlistPagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WishlistPagComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WishlistPagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
