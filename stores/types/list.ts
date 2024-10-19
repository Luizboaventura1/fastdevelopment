import Card from "./card";

export default interface List {
  title: string;
  stateModal: boolean;
  cards: Card[];
}