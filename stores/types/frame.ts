import List from "./list";
import Label from "./label";

export default interface Frame {
  title: string;
  labels: Label[];
  lists: List[];
}