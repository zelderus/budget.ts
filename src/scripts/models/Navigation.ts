

namespace Navigation {


    export class NavigationLine {
        navIndex: number;
        title: string;
        viewRef: any;

        constructor (navIndex: number, title: string, viewRef: any) {
            this.navIndex = navIndex;
            this.title = title;
            this.viewRef = viewRef;
        }
    }


}

export default Navigation;