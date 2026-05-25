import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarotPageComponent } from './tarot-page.component';

describe('TarotPageComponent', () => {
  let component: TarotPageComponent;
  let fixture: ComponentFixture<TarotPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarotPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TarotPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
