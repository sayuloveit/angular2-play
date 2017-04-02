import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

// services
import { AlignHeightService } from './services/align-height.service';

// directives
import { AlignHeightDirective } from './directives/align-height/align-height.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AlignHeightService
  ],
  exports: [
    AlignHeightDirective
  ]
})
export class SharedModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        AlignHeightService
      ]
    };
  }

}
