interface GraphNode {
  ntype : string;
  data : {};
}

export class App {
  graph : GraphNode[];

  constructor (public appname) {
  }

  public get_name () {
    return this.appname;
  }

  public on_get_name = () => this.get_name();
}

(function make_an_app() {
  var app = new App("foo");
  console.log(app.appname);
  console.log(app.get_name());
  console.log(app.on_get_name());
})();
