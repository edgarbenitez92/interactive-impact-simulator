import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideContainerComponent } from './slide-container.component';

describe('SlideContainerComponent', () => {
  let component: SlideContainerComponent;
  let fixture: ComponentFixture<SlideContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlideContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlideContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
