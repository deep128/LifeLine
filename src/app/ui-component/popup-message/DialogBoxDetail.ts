export class DialogBoxDetail {
    showDialogBox = false;
    showOverlay = false;
    head:string;
    body:string;

    openDialogBox(header:string, body: string) {
        this.head = header;
        this.body = body;
        this.showOverlay = true;
        this.showDialogBox = true;
    }
}