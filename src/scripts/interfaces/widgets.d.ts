
//=====================================
//
//  Интерфейсы виджетов
//      виджеты служат для отображения своих компонентов
//      и, возможно, для отображения других виджетов
//      содержат в себе частичную логику
//      и предназначены разгрузить Вьюшки (оставив в них только рендер, например)
//
//=====================================


interface IWidget {
    /**
     * Отрисовка виджета.
     */
    draw():void;
}