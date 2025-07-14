export interface DropdownSaucesProps {
  display: 'flex' | 'none';
  hideIt: () => void;
  role_Name: 'Student' | 'Parent';
  top: number;
  left: number;
  children: JSX.Element | JSX.Element[];
}
