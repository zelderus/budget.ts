

namespace Navigation {

    export class TabLine {
        tabIndex: number;
        title: string;
        navIndex: number;


        constructor (tabIndex: number, title: string, navIndex: number) {
            this.tabIndex = tabIndex;
            this.title = title;
            this.navIndex = navIndex;
        }
    }



    export class NavigationLine {
        navIndex: number;
        title: string;
        viewRef: any;
        cmdRef: any;

        constructor (navIndex: number, title: string, viewRef: any, cmdRef: any) {
            this.navIndex = navIndex;
            this.title = title;
            this.viewRef = viewRef;
            this.cmdRef = cmdRef;
        }
    }


}

export default Navigation;