import Label from "./label";

export default interface Card {
  title: string;
  description: string;
  stateModal: boolean;
  labels: Label[];
  dateFeatures: {
    date: null | Date;
    complete: boolean;
  };
}