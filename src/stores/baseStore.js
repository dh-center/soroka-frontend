import { makeAutoObservable } from "mobx";
import { LOCALES } from "../lang/locales";

export default class BaseStore {
    uiLang = LOCALES.RUSSIAN;

    constructor() {
        makeAutoObservable(this);
    }

    setUiLang(payload) {
        this.uiLang = payload;
    }
}
