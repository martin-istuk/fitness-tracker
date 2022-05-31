// CORE:
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
// EXTERNAL:
import { MaterialModule } from "src/app/material.module";

@NgModule({
  imports: [
    CommonModule, FormsModule, MaterialModule
  ],
  exports: [
    CommonModule, FormsModule, MaterialModule
  ]
})
export class SharedModule {}
