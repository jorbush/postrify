import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';
import { of, throwError } from 'rxjs';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);

    await TestBed.configureTestingModule({
      imports: [FormsModule, LoginComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: ActivatedRoute, useValue: {} },
        provideHttpClientTesting,
      ],
    }).compileComponents();

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call login on AuthService and handle success', () => {
    authService.login.and.returnValue(
      of({ token: 'jwt_token', username: 'jordi' }),
    );

    component.username = 'jordi';
    component.password = '123456';

    component.onSubmit();

    expect(authService.login).toHaveBeenCalledWith('jordi', '123456');
  });

  it('should call login on AuthService and handle error', () => {
    authService.login.and.returnValue(
      throwError(() => new Error('Login failed')),
    );

    component.username = 'jordi';
    component.password = '123456';

    component.onSubmit();

    expect(authService.login).toHaveBeenCalledWith('jordi', '123456');
  });
});
