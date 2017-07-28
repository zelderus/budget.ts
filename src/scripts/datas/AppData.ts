
import StoreFlux from './../flux/store';
import Navigation from './../models/Navigation';

// активные вьюшки
import {TransactionActive} from "./../components/ActivePanels/TransactionActive";
import {AccountActive} from "./../components/ActivePanels/AccountActive";
import {TransactionEditActive} from "./../components/ActivePanels/TransactionEditActive";

// панели управлений
import {TransactionControls} from "./../components/ControlPanels/TransactionControls";
import {AccountControls} from "./../components/ControlPanels/AccountControls";
import {TransactionEditControls} from "./../components/ControlPanels/TransactionEditControls";

// сторы
import AppStore from './../stores/AppStore';
import TransactionStore from './../stores/TransactionStore';
import AccountStore from './../stores/AccountStore';
import CurrencyStore from './../stores/CurrencyStore';
import CategoryStore from './../stores/CategoryStore';



namespace AppData {


    /**
     * Индексы Активных панелей.
     */
    export enum Pages {
        TRANSACTIONS        = 1,
        ACCOUNTS            = 2,

        TRANSACTION_EDIT    = 51


        // TODO: edit category, currency
    }




    /**
     * Активные панели (Навигации | Страницы).
     * В конструктор третьим параметром передаем на нужный тип Вьюшки с реализацией.
     */
    export function getNavigations(): Navigation.NavigationLine[] {
        return [
            new Navigation.NavigationLine(Pages.TRANSACTIONS, "Транзакции", TransactionActive, TransactionControls),
            new Navigation.NavigationLine(Pages.ACCOUNTS, "Счета", AccountActive, AccountControls),

            new Navigation.NavigationLine(Pages.TRANSACTION_EDIT, "Редактирование транзакции", TransactionEditActive, TransactionEditControls)
        ];
    }


    /**
     * Вкладки и их связь с Активной панелью (Навигацией | Активной панелью | Страницей).
     */
    export function getTabs(): Navigation.TabLine[] {
        let ind = 1;
        return [
            new Navigation.TabLine(ind++, "Транзакции", Pages.TRANSACTIONS),
            new Navigation.TabLine(ind++, "Счета", Pages.ACCOUNTS)
        ];
    }


    

    /**
     * Список всех сторов (синглетонов).
     * Необходимо для Диспетчера.
     */
    export function getStores(): StoreFlux.IStore[] {
        return [AppStore, CurrencyStore, CategoryStore, AccountStore, TransactionStore];
    }



}

export default AppData;