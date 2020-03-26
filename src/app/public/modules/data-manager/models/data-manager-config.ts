import {
  SkyDataManagerSortOption
} from './data-manager-sort-option';

import {
  FilterValue
} from '../../filter-toolbar';

export interface SkyDataManagerConfig {
  additionalOptions?: Object;
  filterModalComponent?: any;
  sortOptions?: SkyDataManagerSortOption[];
  filterToolbarOptions?: FilterValue[];
}
