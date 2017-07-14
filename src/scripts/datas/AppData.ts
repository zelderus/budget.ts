
import StoreFlux from './../flux/store';
import Navigation from './../models/Navigation';

// активные вьюшки
import {TransactionActive} from "./../components/ActivePanels/TransactionActive";
import {AccountActive} from "./../components/ActivePanels/AccountActive";

// сторы
import AppStore from './../stores/AppStore';
import TransactionStore from './../stores/TransactionStore';




namespace AppData {


    /**
     * Пункты навигации и их связь с Вьюшками.
     * В конструктор третьим параметром передаем на нужный тип Вьюшки с реализацией.
     */
    export function getNavigations(): Navigation.NavigationLine[] {
        let ind = 1;
        return [
            new Navigation.NavigationLine(ind++, "Транзакции", TransactionActive),
            new Navigation.NavigationLine(ind++, "Счета", AccountActive)
        ];
    }


    /**
     * Список всех сторов (синглетонов).
     * Необходимо для Диспетчера.
     */
    export function getStores(): StoreFlux.IStore[] {
        return [AppStore, TransactionStore];
    }



}

export default AppData;