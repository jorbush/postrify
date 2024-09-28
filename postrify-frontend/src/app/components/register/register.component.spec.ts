import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { AuthService } from '../../services/auth.service';
import { of, throwError } from 'rxjs';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['register']);

    await TestBed.configureTestingModule({
      imports: [FormsModule, RegisterComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: ActivatedRoute, useValue: {} },
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call register on AuthService and handle success', () => {
    authService.register.and.returnValue(
      of({ message: 'User registered successfully!' }),
    );

    component.username = 'testuser';
    component.email = 'testuser@example.com';
    component.password = 'testpass';

    component.onSubmit();

    expect(authService.register).toHaveBeenCalledWith(
      'testuser',
      'testuser@example.com',
      'testpass',
    );
  });

  it('should call register on AuthService and handle error', () => {
    authService.register.and.returnValue(
      throwError(() => new Error('Error registering')),
    );

    component.username = 'testuser';
    component.email = 'testuser@example.com';
    component.password = 'testpass';

    component.onSubmit();

    expect(authService.register).toHaveBeenCalledWith(
      'testuser',
      'testuser@example.com',
      'testpass',
    );
  });
});
