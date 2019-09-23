import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsVisualComponent } from './items-visual.component';

describe('ItemsVisualComponent', () => {
  let component: ItemsVisualComponent;
  let fixture: ComponentFixture<ItemsVisualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemsVisualComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsVisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
