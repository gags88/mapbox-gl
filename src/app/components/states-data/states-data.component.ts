import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StateCapitals } from 'src/app/models/StateCapitals';

@Component({
  selector: 'app-states-data',
  templateUrl: './states-data.component.html',
  styleUrls: ['./states-data.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatesDataComponent {
  @Input('states') states: StateCapitals[];
  @Output('menuItemClicked') menuItemClicked: EventEmitter<StateCapitals> = new EventEmitter();

  clickedIndex: number;

  onStateClick(data: StateCapitals, index: number): void {
    this.toggleActiveState(index);
    this.menuItemClicked.next(data);
  }

  toggleActiveState(index: number): void {
    this.clickedIndex = index;
  }
}
