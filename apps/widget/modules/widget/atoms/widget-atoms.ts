import { WidgetScreen } from "@/modules/types";
import { atom } from "jotai";

//Basic widget state atoms

export const screenAtom = atom<WidgetScreen>("error");

export const errorMessageAtom = atom<string | null>(null);