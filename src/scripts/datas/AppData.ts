
import StoreFlux from './../flux/store';
import Navigation from './../models/Navigation';

// активные вьюшки
import {SpendActive} from "./../components/ActivePanels/SpendActive";
import {ProfitActive} from "./../components/ActivePanels/ProfitActive";

// сторы
import AppStore from './../stores/AppStore';




namespace AppData {


    /**
     * Пункты навигации и их связь с Вьюшками.
     * В конструктор третьим параметром передаем на нужный тип Вьюшки с реализацией.
     */
    export function getNavigations(): Navigation.NavigationLine[] {
        let ind = 1;
        return [
            new Navigation.NavigationLine(ind++, "Расходы", SpendActive),
            new Navigation.NavigationLine(ind++, "Доходы", ProfitActive)
        ];
    }
    

    /**
     * Список всех сторов (синглетонов).
     * Необходимо для Диспетчера.
     */
    export function getStores(): StoreFlux.IStore[] {
        return [AppStore];
    }



}

export default AppData;