import { ComponentFixture, TestBed } from '@angular/core/testing';
import { experience } from './experience';

describe('experience', () => {
  let component: experience;
  let fixture: ComponentFixture<experience>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [experience],
    }).compileComponents();

    fixture = TestBed.createComponent(experience);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
