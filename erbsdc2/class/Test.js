class Test {
    constructor() {
        document.querySelector('#target').innerHTML = 
            "<button onclick='" + this.print + "(data)'/>"
    }
    print(data) {
        alert(data);
    }
}