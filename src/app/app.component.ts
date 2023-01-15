import { Component } from '@angular/core';
import { StoreService } from './store/store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'rxjs-app';

  color: string = '#000000';

  constructor(
    public store:StoreService
  ) {
    this.store.color$.subscribe((color) => {
      this.color = color;
    })
}

}
