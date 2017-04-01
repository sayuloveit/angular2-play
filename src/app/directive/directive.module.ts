import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// services
import { AlignHeightService } from './services/align-height.service';

// directives
import { AlignHeightDirective } from './align-height/align-height.directive';



@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    AlignHeightService
  ],
  declarations: [
    AlignHeightDirective
  ],
  exports: [
    AlignHeightDirective
  ]
})
export class DirectiveModule { }
