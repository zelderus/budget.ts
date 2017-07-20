

namespace Navigation {


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