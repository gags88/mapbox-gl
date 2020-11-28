import { MatCardModule, MatList, MatListItem, MatListModule } from '@angular/material';
import { Spectator, createComponentFactory } from '@ngneat/spectator';
import { StatesDataComponent } from './states-data.component';

describe('StatesDataComponent', () => {
  let spectator: Spectator<StatesDataComponent>;
  const createComponent = createComponentFactory({
    component: StatesDataComponent,
    imports: [MatCardModule, MatListModule],
  });

  beforeEach(
    () =>
      (spectator = createComponent({
        props: {
          states: [
            {
              lon: -12,
              lat: 12,
              state: 'Hawaii',
              city: 'Honolulu',
            },
          ],
        },
        detectChanges: false,
      }))
  );

  it('should create component', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should create mat list items same as of state data', () => {
    spectator.detectChanges();
    expect(spectator.query(MatList)).toExist();
    expect(spectator.queryAll(MatListItem).length).toEqual(1);
  });

  it('should emit state data and call activeStateSpy upon clicking mat list item', () => {
    const activeStateSpy = spyOn(spectator.component, 'toggleActiveState');
    const emitSpy = spyOn(spectator.component.menuItemClicked, 'next');
    spectator.detectChanges();
    spectator.click('.mat-list-item');
    expect(emitSpy).toHaveBeenCalledWith(spectator.component.states[0]);
    expect(activeStateSpy).toHaveBeenCalled();
  });

  it('should assign clicked state index to clickedIndex', () => {
    spectator.detectChanges();
    spectator.click('.mat-list-item');
    expect(spectator.component.clickedIndex).toEqual(0);
  });
});
