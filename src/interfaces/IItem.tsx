export interface IItem {
  id: string;
  element: React.ReactNode;
  onClick?: (id: string) => void;
  className?: string;
  As?: 'a' | 'li' | 'button' | 'div';
  href?: string;
}