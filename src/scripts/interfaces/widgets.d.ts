
//=====================================
//
//  Интерфейсы виджетов
//      виджеты служат для отображения своих компонентов
//      и, возможно, для отображения других виджетов
//      содержат в себе частичную логику
//
//=====================================


interface IWidget {
    /**
     * Отрисовка виджета.
     */
    draw():void;
}