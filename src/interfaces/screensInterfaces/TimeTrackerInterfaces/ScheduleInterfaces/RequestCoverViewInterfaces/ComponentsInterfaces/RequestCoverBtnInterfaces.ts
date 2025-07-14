export interface RequestCoverBtnInterface {
  onCoverSubmit: () => void;
  handleModalState: (mdState: boolean) => void;
  isSavingCover: boolean;
  loading: boolean;
}
