import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostFormComponent } from './post-form.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

describe('PostFormComponent', () => {
  let component: PostFormComponent;
  let fixture: ComponentFixture<PostFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostFormComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: ActivatedRoute, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PostFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
