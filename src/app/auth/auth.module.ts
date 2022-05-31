// CORE:
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

// EXTERNAL:
import { provideAuth, getAuth } from "@angular/fire/auth";

// INTERNAL:
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { SharedModule } from "./shared/shared.module";
import { AuthRouting } from "./auth.routing";

@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent
  ],
  imports: [
    ReactiveFormsModule,
    provideAuth(() => getAuth()),
    SharedModule,
    AuthRouting
  ],
  exports: [

  ]
})
export class AuthModule {}
