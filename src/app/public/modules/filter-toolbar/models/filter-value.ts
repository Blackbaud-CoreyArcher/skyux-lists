export interface FilterValue {
  id: string;
  value?: any;
  name: string;
  type: string;
  operator?: string;
  options?: FilterValueOptions;
}

interface FilterValueOptions {
  hidden: boolean;
  locked: boolean;
  operators: string[];
  values: string[];
}
