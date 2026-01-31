import { HttpClient } from "@angular/common/http";
import { inject } from "@angular/core";

export class BaseHttp {
    protected http = inject(HttpClient)
}