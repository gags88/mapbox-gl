import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { AppComponent } from './app.component';
import { MockComponent } from 'ng-mocks';
import { MapComponent } from './components/map/map.component';

describe('AppComponent', () => {
  let spectator: Spectator<AppComponent>;
  const createComponent = createComponentFactory({
    component: AppComponent,
    declarations: [MockComponent(MapComponent)],
  });

  it('shall create the component', () => {
    spectator = createComponent({
      detectChanges: false,
    });
    expect(spectator.component).toBeTruthy();
  });
});
