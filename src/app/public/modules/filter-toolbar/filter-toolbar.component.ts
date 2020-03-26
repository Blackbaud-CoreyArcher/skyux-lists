import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import {
  // SkyModalCloseArgs,
  // SkyModalService,
  SkyConfirmService,
  SkyConfirmInstance,
  SkyConfirmType
} from '@skyux/modals';

import {
  FilterValue// ,
  // FilterOperator
} from './models';

// import { ListFiltersModalContext } from '../list-filter-modal/list-filter-modal-context';
// import { ListFiltersModalComponent } from '../list-filter-modal/list-filter-modal.component';
// import { FilterDialogService } from '../../services/filter-dialog.service';
import { SkyAppResourcesService } from '@skyux/i18n';
import { forkJoin } from 'rxjs';
import { flatMap } from 'rxjs/operators';

@Component({
  selector: 'sky-filter-toolbar',
  templateUrl: './filter-toolbar.component.html',
  styleUrls: ['./filter-toolbar.component.scss']
})
export class SkyFilterToolbarComponent {

  public filters: FilterValue[];
  public hasFilters: boolean = false;
  public hasActiveFilters: boolean = false;
  private _filterValues: FilterValue[];

  @Input()
  public set filterValues(filterValues: FilterValue[]) {
    this._filterValues = filterValues;
    this.filters = this.updateFilters(this._filterValues);
    this.hasFilters = this.filters && this.filters.length > 0;
    if (this.hasFilters) {
      this.hasActiveFilters = this.filters.some(f => f.value !== undefined);
    }
  }

  public get filterValues(): FilterValue[] {
    return this._filterValues;
  }

  @Output()
  public filterValueSelected = new EventEmitter<FilterValue>();

  @Output()
  public addFilterActionClick = new EventEmitter();

  @Output()
  public filtersApplied = new EventEmitter<FilterValue[]>();

  constructor(
    // private modalService: SkyModalService,
    // private filterDialogService: FilterDialogService,
    private confirmService: SkyConfirmService,
    private resourceService: SkyAppResourcesService
  ) { }

  public onFilterSelected(fieldId: string) {
    let field = this._filterValues.find(item => item.id === fieldId);

    if (this.filterCanBeUpdated(field)) {
      // TODO: Add Async GetFilterValueValues here
      this.filterValueSelected.emit(field);

      // this.showFilterValueModal(field);
    }
  }

  public onFilterAddClick() {
    this.addFilterActionClick.emit();
  }

  public onClearFilters() {
    // TODO: log analytics for clicking button
    forkJoin([
      this.resourceService.getString('skyux_filter_toolbar_clear_confirm_message'),
      this.resourceService.getString('skyux_filter_toolbar_clear_confirm_detail'),
      this.resourceService.getString('skyux_filter_toolbar_clear_confirm_yes'),
      this.resourceService.getString('skyux_filter_toolbar_clear_confirm_cancel')
    ]).pipe(flatMap(([message, body, yesButton, cancelButton]) => {
      const dialog: SkyConfirmInstance = this.confirmService.open({
        message: message,
        body: body,
        type: SkyConfirmType.Custom,
        buttons: [
          { text: yesButton, action: 'yes', styleType: 'primary' },
          { text: cancelButton, action: 'cancel', autofocus: true, styleType: 'link' }
        ]
      });

      return dialog.closed.toPromise();
    })).subscribe(result => {
      if (result.action === 'yes') {
        let filtersCleared: FilterValue[] = [];

        this._filterValues.forEach(filterValue => {
          if (filterValue.value) {
            filtersCleared.push(filterValue);
          }
          filterValue.value = undefined;
          filterValue.operator = undefined;
          this.updateFilterBar(filterValue);
        });

        this.filtersApplied.emit(filtersCleared);
      }
    });
  }

  // public showPopover(filterValue: FilterValue): boolean {
  //   return this.filterDialogService.showQuickFilterPopover(filterValue);
  // }

  // public getPopoverText(filterValue: FilterValue): string {
  //   return this.filterDialogService.getQuickFilterPopoverText(filterValue);
  // }

  // public getLookupOperatorText(filterOperator: FilterOperator): string {
  //   return this.filterDialogService.getLookupOperatorTextForPopover(filterOperator);
  // }

  public filterCanBeUpdated(filterValue: FilterValue): boolean {
    if (filterValue.options && (filterValue.options.hidden || filterValue.options.locked) ) {
      return false;
    }
    return true;
  }

  private updateFilters(filterFields: FilterValue[]): FilterValue[] {
    return filterFields.map(item => {
      return {
        id: item.id,
        name: item.name,
        type: item.type,
        value: item.value
      };
    });
  }

  // private showFilterValueModal(filterValue: FilterValue) {
  //   const instance = this.modalService.open(ListFiltersModalComponent, {
  //     providers: [{
  //       provide: ListFiltersModalContext,
  //       useValue: {
  //         filterValue: filterValue,
  //         dataModel: this.modelName,
  //         useLegacyClient: this.useLegacyClient
  //       }
  //     }],
  //     size: this.filterDialogService.getFilterSize(filterValue.type)
  //   });
  //   instance.closed.subscribe((result: SkyModalCloseArgs) => {
  //     if (result.reason === 'save') {
  //       if (result.data) {
  //         filterValue.value = result.data.value;
  //         filterValue.operator = result.data.operator;
  //       } else {
  //         filterValue.value = undefined;
  //         filterValue.operator = undefined;
  //       }

  //       this.updateFilterBar(filterValue);
  //       this.filtersApplied.emit([filterValue]);
  //     }
  //   });
  // }

  private updateFilterBar(updatedFilter: FilterValue) {
    let field = this.filters.find(item => item.id === updatedFilter.id);

    if (field) {
      field.value = updatedFilter.value;
      field.operator = updatedFilter.operator;
    }

    if (this.hasFilters) {
      this.hasActiveFilters = this.filters.some(f => f.value !== undefined);
    }
  }
}
