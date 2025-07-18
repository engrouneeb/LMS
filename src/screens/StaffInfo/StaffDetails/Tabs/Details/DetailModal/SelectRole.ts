export function SelectRole(RoleType: number) {
  switch (RoleType) {
    case 1:
      return 'Coordinator';
    case 2:
      return 'Instructor';
    case 3:
      return 'Teacher';
    case 191:
      return 'staff role';
    case 192:
      return 'Support';
  }
  return null;
}
