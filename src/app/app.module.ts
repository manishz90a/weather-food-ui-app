import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from '@auth0/auth0-angular';
// Import the injector module and the HTTP client module from Angular
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// Import the HTTP interceptor from the Auth0 Angular SDK
import { AuthHttpInterceptor } from '@auth0/auth0-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { FahrenheitToDegrees } from './pipes/fahrenheit-to-degrees.pipe';
import { AuthButtonComponent } from './components/auth-button/auth-button.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthButtonComponent,
    FahrenheitToDegrees
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    // Import the module into the application, with configuration
    AuthModule.forRoot({
      domain: 'dev-anv39zst.us.auth0.com',
      clientId: 'Jsay4n9g4bVmE6MNbvhKWDl6S0n7Icn7',
      audience: 'https://weather-food-api-app',
      scope: 'openid profile offline_access',
      httpInterceptor: {
        allowedList: [
          {
            // Match any request that starts 'https://YOUR_DOMAIN/api/v2/' (note the asterisk)
            //uri: 'https://uuvp37qaz7f5ha22mq46rhalfe0vgihw.lambda-url.ap-south-1.on.aws/get-weather-info',
            uri: 'http://localhost:3001/get-weather-info',
            tokenOptions: {
              // The attached token should target this audience
              audience: 'https://weather-food-api-app',
    
              // The attached token should have these scopes
              // scope: 'read:current_user'
            }
          }
        ]
      }
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
