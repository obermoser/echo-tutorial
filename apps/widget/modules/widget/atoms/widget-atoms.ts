import { WidgetScreen } from "@/modules/types";
import { atom } from "jotai";

//Basic widget state atoms

export const screenAtom = atom<WidgetScreen>("auth");

export const errorMessageAtom = atom<string | null>(null);