import {
  Component,
  Input,
  OnInit
} from '@angular/core';

import {
  SkyDataManagerState,
  SkyDataViewConfig,
  SkyDataManagerService
} from '../../public/modules/data-manager/';
import { SkyDataManagerFiltersModalDemoComponent } from './data-filter-modal.component';

@Component({
  selector: 'data-view-repeater',
  templateUrl: './data-view-repeater.component.html'
})
export class DataViewRepeaterComponent implements OnInit {

  public get dataState(): SkyDataManagerState {
    return this._dataState;
  }

  @Input()
  public set dataState(value: SkyDataManagerState) {
    this._dataState = value;
    this.displayedItems = this.filterItems(this.searchItems(this.items));
  }

  public viewConfig: SkyDataViewConfig = {
    id: 'repeaterView',
    name: 'Repeater View',
    icon: 'list',
    searchEnabled: true,
    columnPickerEnabled: true,
    filterButtonEnabled: true,
    filterModalComponent: SkyDataManagerFiltersModalDemoComponent,
    columnOptions: [
      {
        id: '1',
        label: 'Column 1',
        isSelected: true,
        description: 'This is a column.'
      },
      {
        id: '2',
        label: 'Column 2',
        isSelected: false,
        description: 'This is also a column, but it is a different column.'
      }
    ],
    additionalOptions: {
      soText: true
    }
  };

  public items: any[] = [
    {
      name: 'Orange',
      description: 'A round, orange fruit.',
      type: 'citrus',
      color: 'orange'
    },
    {
      name: 'Mango',
      description: 'Delicious in smoothies, but don\'t eat the skin.',
      type: 'other',
      color: 'orange'
    },
    {
      name: 'Lime',
      description: 'A sour, green fruit used in many drinks.',
      type: 'citrus',
      color: 'green'
    },
    {
      name: 'Strawberry',
      description: 'A red fruit that goes well with shortcake.',
      type: 'berry',
      color: 'red'
    },
    {
      name: 'Blueberry',
      description: 'A small, blue fruit often found in muffins.',
      type: 'berry',
      color: 'blue'
    }

  ];

  public displayedItems = this.items;

  private _dataState: SkyDataManagerState = new SkyDataManagerState();

  constructor(private dataManagerService: SkyDataManagerService) {
  }

  public ngOnInit(): void {
    this.dataManagerService.dataState.subscribe(state => {
      this.dataState = state;
    });
  }

  public searchItems(items: any[]): any[] {
    let searchedItems = items;
    let searchText = this.dataState && this.dataState.searchText;

    if (searchText) {
      searchedItems = items.filter(function (item: any) {
        let property: any;

        for (property in item) {
          if (item.hasOwnProperty(property) && (property === 'name' || property === 'description')) {
            const propertyText = item[property].toLowerCase();
            if (propertyText.indexOf(searchText) > -1) {
              return true;
            }
          }
        }

        return false;
      });
    }
    return searchedItems;
  }

  public filterItems(items: any[]): any[] {
    let filteredItems = items;
    let filterData = this.dataState && this.dataState.filterData;

    if (filterData) {
      filteredItems = items.filter((item: any) => {
        if (((filterData.hideOrange && item.color !== 'orange') || !filterData.hideOrange) &&
            ((filterData.type !== 'any' && item.type === filterData.type) || (!filterData.type || filterData.type === 'any'))) {
              return true;
            }
        return false;
      });
    }

    return filteredItems;
  }
}
