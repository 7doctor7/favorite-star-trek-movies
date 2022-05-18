export interface IToastDataInterface {
  header?: string;
  message?: string;
  duration?: number;
  position?: 'top' | 'bottom' | 'middle';
  cssClass?: string;
  color?: string;
  buttons?: any[];
}
