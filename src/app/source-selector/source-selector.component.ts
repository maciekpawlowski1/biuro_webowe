import { Component } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DataSourceService} from "../data-source.service";

@Component({
  selector: 'app-source-selector',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './source-selector.component.html',
  styleUrl: './source-selector.component.css'
})
export class SourceSelectorComponent {
  newSource: String = "REST";

  constructor(private dataSourceService: DataSourceService) {
  }

  changeSource() {
    let isFirebase;

    switch (this.newSource) {
      case "Firebase":
        isFirebase = true
        break;
      case "REST":
        isFirebase = false;
        break;
      default:
        isFirebase = false;
    }
    this.dataSourceService.changeDataSource(isFirebase);
  }
}
