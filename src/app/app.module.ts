import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { MenubarComponent } from './menubar/menubar.component';
import { HamburgerComponent } from './ui-component/hamburger/hamburger.component';
import { UserService } from './user.service';
import { HttpClient} from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './/app-routing.module';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth/auth.service';
import { HttpModule } from '@angular/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './Shared/auth.interceptor';
import { HeaderComponent } from './auth/ui-components/header/header.component';
import { PopupMessageComponent } from './ui-component/popup-message/popup-message.component';
import { Config } from './config.service';



@NgModule({
  declarations: [
    AppComponent,
    MenubarComponent,
    HamburgerComponent,
    SignUpComponent,
    HomeComponent,
    LoginComponent,
    HeaderComponent,
    PopupMessageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    UserService,
    HttpClient,
    AuthService,
    Config
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
