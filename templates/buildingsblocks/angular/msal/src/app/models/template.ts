// template.model.ts
export class Template {

  id: string;
  business: string;
  name: string;
  process: string;
  status: boolean;
  template: string; 
  version: string;

  constructor( id:string,business: string, name: string, process: string, status: boolean, template: string, version: string) {
    this.id = '';
    this.business = business;
    this.name = name;
    this.process = process;
    this.status = status;
    this.template = template;
    this.version = version;
  }
}
