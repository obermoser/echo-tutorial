import { WidgetScreen } from "@/modules/types";
import { atom } from "jotai";

//Basic widget state atoms

export const screenAtom = atom<WidgetScreen>("loading");

export const errorMessageAtom = atom<string | null>(null);
export const loadingMessageAtom = atom<string | null>(null);