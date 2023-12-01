import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GoodsPage } from './goods.page';

describe('GoodsPage', () => {
  let component: GoodsPage;
  let fixture: ComponentFixture<GoodsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GoodsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
