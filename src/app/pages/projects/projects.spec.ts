import { ComponentFixture, TestBed } from '@angular/core/testing';
import { projects } from './projects';

describe('projects', () => {
  let component: projects;
  let fixture: ComponentFixture<projects>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [projects],
    }).compileComponents();

    fixture = TestBed.createComponent(projects);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
