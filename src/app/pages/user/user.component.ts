import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'user-cmp',
    moduleId: module.id,
    templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit{

    userDetail: UserDetail;

    ngOnInit(){
        this.userDetail = new UserDetail();
        this.userDetail.country = "India";
        this.userDetail.userName = "Aaditya Pandilwar";
        this.userDetail.userEmail = "aaditya.pandilwar@db.com";
    }
}

class UserDetail {
    userName: string;
    userEmail: string;
    country: string;

    constructor() {}
}