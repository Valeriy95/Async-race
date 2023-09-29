export class NewElement {

    protected element: HTMLElement;
      constructor(tagName: string, nameClass: string) {
      this.element = document.createElement(tagName);
      this.element.className = nameClass;
    }
    
    public returnElement(): HTMLElement {
      return this.element;
    }
  
    public appendTo(parentElement: HTMLElement): void {
      parentElement.appendChild(this.element);
    }
  
    public addClass(className: string): void {
      this.element.classList.add(className);
    }
      
    public removeClass(className: string): void {
      this.element.classList.remove(className);
    }
      
    public hasClass(className: string): boolean {
      return this.element.classList.contains(className);
    }
      
    public toggleClass(className: string): void {
      this.element.classList.toggle(className);
    }
  
    public nameClass(): string {
      return this.element.className;
    }
  
    public removeСontent(): void {
      this.element.innerHTML = '';
    }
  
    public returnHTML(): string {
      return this.element.innerHTML;
    }

    public deleteChild(): void {
      this.element.innerHTML = '';
    }
  
    public changeWidth(num: string): void {
      this.element.style.width = `${num}`;
    }
  
}


export class NewElementInput extends NewElement  {
    constructor(tagName: keyof HTMLElementTagNameMap, nameClass: string, type: string) {
      super(tagName, nameClass);
      this.element.setAttribute('type', type);
    }
  
    public returnInput(): HTMLInputElement {
      return this.element as HTMLInputElement;
    }
  
    public getValue(): string {
      return (this.element as HTMLInputElement).value;
    }

    public deleteValue(): void {
      (this.element as HTMLInputElement).value = '';
    }

    public setValue(str: string): void {
      (this.element as HTMLInputElement).value = `${str}`;
    }
  
    public disabled(attr: string): void {
      this.element.setAttribute('disabled', attr);
    }
}


export class NewElementWithDataAttr extends NewElement  {
    constructor(tagName: keyof HTMLElementTagNameMap, nameClass: string, data: string) {
      super(tagName, nameClass);
      this.element.setAttribute('data-id', data);
    }
}

export class NewElementBtnStart extends NewElement  {
    constructor(tagName: keyof HTMLElementTagNameMap, nameClass: string, data: string) {
      super(tagName, nameClass);
      this.element.setAttribute('data-start', data);
    }
}

export class NewElementBtnStop extends NewElement  {
    constructor(tagName: keyof HTMLElementTagNameMap, nameClass: string, data: string) {
      super(tagName, nameClass);
      this.element.setAttribute('data-stop', data);
    }
}

export class NewElementWithDataWinAttr extends NewElement {
    constructor(tagName: keyof HTMLElementTagNameMap, nameClass: string, data: string) {
      super(tagName, nameClass);
      this.element.setAttribute('data-win', data);
    }
}