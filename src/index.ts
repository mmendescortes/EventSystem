/*
  Import the Express library
*/
import {Express} from 'express';

/*
  Import the Arguments utility
*/
import {Arguments} from './utils/arguments';

/*
  Import the Default utility
*/
import {default as Default} from './bootstrap/default';

/*
  Import the FileSystem utility
*/
import {FileSystem} from './utils/filesystem';

/*
  Import the String utility
*/
import {String} from './utils/string';

/*
  Import the Init utility
*/
import {default as Init} from "./bootstrap/init";

/*
  Import the Serve utility
*/
import {default as Serve} from "./bootstrap/serve";

const args : Array<string> = Arguments.get();
switch(args[0]) {
  case 'make:model':
    if(args[1]) {
      let dir : FileSystem = new FileSystem('../src/model/');
      let content : string = Default.modelDefault.replaceAll('MODEL_NAME', args[1].toLowerCase());
      content = content.replaceAll('MODEL__NAME_CAPITALIZED', String.capitalize(args[1].replaceAll("_", " ")).replaceAll(" ", ""));
      dir.create(args[1].toLowerCase() + '.ts', content, 'Model was created successfully!');
    } else {
      console.error('Lacking model name!');
    }
    break;
  case 'make:service':
    if(args[1]) {
      let dir : FileSystem = new FileSystem('../src/service/');
      let content : string = Default.serviceDefault.replaceAll('MODEL_NAME', args[1].toLowerCase());
      content = content.replaceAll('MODEL__NAME_CAPITALIZED', String.capitalize(args[1].replaceAll("_", " ")).replaceAll(" ", ""));
      dir.create(args[1].toLowerCase() + '.ts', content, 'Service was created successfully!');
    } else {
      console.error('Lacking service name!');
    }
    break;
  case 'make:controller':
    if(args[1]) {
      let dir : FileSystem = new FileSystem('../src/controller/');
      let content : string = Default.controllerDefault.replaceAll('MODEL_NAME', args[1].toLowerCase());
      content = content.replaceAll('MODEL__NAME_CAPITALIZED', String.capitalize(args[1].replaceAll("_", " ")).replaceAll(" ", ""));
      dir.create(args[1].toLowerCase() + '.ts', content, 'Controller was created successfully!');
    } else {
      console.error('Lacking controller name!');
    }
    break;
  case 'make:route':
    if(args[1]) {
      if(args[2]) {
        let dir : FileSystem = new FileSystem('../src/route/' + args[2].toLowerCase() + "/");
        if(args[3]) {
          let content : string = Default.routeDefault.replaceAll('ENDPOINT_NAME', args[3].toLowerCase());
          content = content.replaceAll('MODEL_NAME', args[1].toLowerCase());
          content = content.replaceAll('MODEL__NAME_CAPITALIZED', String.capitalize(args[1].replaceAll("_", " ")).replaceAll(" ", ""));
          dir.create(args[1].toLowerCase() + '.ts', content, 'Route was created successfully!');
        } else {
          console.error('Lacking endpoint path!');
        }
      } else {
        console.error('Lacking type of endpoint! Please select one of the allowed types: api, web.');
      }
    } else {
      console.error('Lacking route name!');
    }
    break;
  case "serve":
    let library : Express = Init();
    Serve(library);
    break;
  case "route:list":
    let web : FileSystem  = new FileSystem('../route/web');
    let api : FileSystem = new FileSystem('../route/api');
    let routes : any = {
      "post": [],
      "put": [],
      "get": [],
      "delete": []
    }, web_routes : boolean = false, api_routes : boolean = false;
    web.dir(async (file : string) : Promise<void> => {
      if(file.length){
        let routes_raw : Array<string> = web.read(web.get() + "/" + file).match(/(?<=router.)(.*)(?=',)/g);
        await routes_raw.map((route : string, index : number)=>{
          let route_arr : Array<string> = route.split("('");
          routes[route_arr[0]].push(route_arr[1]);
        });
      }
      web_routes = true;
    });
    api.dir(async (file : string) : Promise<void> => {
      if(file.length) {
        let routes_raw : Array<string> = api.read(api.get() + "/" + file).match(/(?<=router.)(.*)(?=',)/g);
        await routes_raw.map((route : string, index : number)=>{
          let route_arr : Array<string> = route.split("('");
          routes[route_arr[0]].push("/api/:api_version"+route_arr[1]);
        });
      }
      api_routes = true;
    });
    (function n() : void {
      if(api_routes && web_routes) {
        console.log(routes);
      } else {
        setTimeout(n, 1000);
      }
    })()
    break;
  default:
    console.info('Here goes the option list...');
    break;
}