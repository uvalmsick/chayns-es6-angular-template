class AppController {

    test = false;

    module = this;

    hello() {
        return "Hey I am the AppController! wow das ist gut s ";

        this.getDate();


    }

    getDate() {
        this.date = new Date();
    }
}
export default AppController;