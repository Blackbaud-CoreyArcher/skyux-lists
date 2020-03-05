import {
  SkyDataManagerEvent,
  SkyDataManagerStateOptions,
  SkyDataManagerSortOption,
  SkyDataViewState,
  SkyDataViewStateOptions
} from '.';

export class SkyDataManagerState {
  public activeSortOption: SkyDataManagerSortOption;
  public activeViewId: string;
  public additionalData: any;
  public event: SkyDataManagerEvent | string;
  public filterData: any;
  public onlyShowSelected: boolean;
  public searchText: string;
  public selectedIds: string[];
  public views: SkyDataViewState[] = [];

  constructor(data: SkyDataManagerStateOptions) {
    if (data) {
      let views = data.views && data.views.map(view => new SkyDataViewState(view));

      this.activeSortOption = data.activeSortOption;
      this.additionalData = data.additionalData;
      this.event = data.event;
      this.filterData = data.filterData;
      this.onlyShowSelected = data.onlyShowSelected;
      this.selectedIds = data.selectedIds;
      this.searchText = data.searchText;
      this.views = views || [];
    }
  }

  public getStateOptions(): SkyDataManagerStateOptions {
    let viewStates: SkyDataViewStateOptions[] = this.views.map(view => {
      return view.getViewStateOptions();
    });

    return {
      activeSortOption: this.activeSortOption,
      additionalData: this.additionalData,
      event: this.event,
      filterData: this.filterData,
      onlyShowSelected: this.onlyShowSelected,
      searchText: this.searchText,
      selectedIds: this.selectedIds,
      views: viewStates
    };
  }

  public setActiveSortOption(activeSortOption: SkyDataManagerSortOption): SkyDataManagerState {
    return new SkyDataManagerState({
      activeSortOption,
      activeViewId: this.activeViewId,
      additionalData: this.additionalData,
      event: SkyDataManagerEvent.Sort,
      filterData: this.filterData,
      onlyShowSelected: this.onlyShowSelected,
      searchText: this.searchText,
      selectedIds: this.selectedIds,
      views: this.views
    });
  }

  public setAdditionalData(additionalData: any, event?: string): SkyDataManagerState {
    return new SkyDataManagerState({
      activeSortOption: this.activeSortOption,
      activeViewId: this.activeViewId,
      additionalData,
      event,
      filterData: this.filterData,
      onlyShowSelected: this.onlyShowSelected,
      searchText: this.searchText,
      selectedIds: this.selectedIds,
      views: this.views
    });
  }

  public setFilterData(filterData: any): SkyDataManagerState {
    return new SkyDataManagerState({
      activeSortOption: this.activeSortOption,
      activeViewId: this.activeViewId,
      additionalData: this.additionalData,
      event: SkyDataManagerEvent.Filter,
      filterData,
      onlyShowSelected: this.onlyShowSelected,
      searchText: this.searchText,
      selectedIds: this.selectedIds,
      views: this.views
    });
  }

  public setOnlyShowSelected(onlyShowSelected: boolean): SkyDataManagerState {
    return new SkyDataManagerState({
      activeSortOption: this.activeSortOption,
      activeViewId: this.activeViewId,
      additionalData: this.additionalData,
      event: SkyDataManagerEvent.Filter,
      filterData: this.filterData,
      onlyShowSelected,
      searchText: this.searchText,
      selectedIds: this.selectedIds,
      views: this.views
    });
  }

  public setSearchText(searchText: string): SkyDataManagerState {
    return new SkyDataManagerState({
      activeSortOption: this.activeSortOption,
      activeViewId: this.activeViewId,
      additionalData: this.additionalData,
      event: SkyDataManagerEvent.Search,
      filterData: this.filterData,
      onlyShowSelected: this.onlyShowSelected,
      searchText,
      selectedIds: this.selectedIds,
      views: this.views
    });
  }

  public setSelectedIds(selectedIds: string[]): SkyDataManagerState {
    return new SkyDataManagerState({
      activeSortOption: this.activeSortOption,
      activeViewId: this.activeViewId,
      additionalData: this.additionalData,
      event: SkyDataManagerEvent.Selection,
      filterData: this.filterData,
      onlyShowSelected: this.onlyShowSelected,
      searchText: this.searchText,
      selectedIds,
      views: this.views
    });
  }

  public getViewStateById(viewId: string): SkyDataViewState {
    return this.views.find(view => view.viewId === viewId);
  }

  public addOrUpdateView(viewId: string, view: SkyDataViewState): SkyDataManagerState {
    const existingViewIndex = this.views.findIndex(v => v.viewId === viewId);

    if (existingViewIndex !== -1) {
      this.views[existingViewIndex] = view;
    } else {
      this.views.push(view);
    }

    return new SkyDataManagerState({
      activeSortOption: this.activeSortOption,
      activeViewId: this.activeViewId,
      additionalData: this.additionalData,
      event: SkyDataManagerEvent.ViewState,
      filterData: this.filterData,
      searchText: this.searchText,
      selectedIds: this.selectedIds,
      views: this.views
    });
  }
}
