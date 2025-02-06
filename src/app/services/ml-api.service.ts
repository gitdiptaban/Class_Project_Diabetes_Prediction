import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MlApiService {
  private apiUrl = 'http://143.110.252.110:5000/predict';  // Flask API URL

  constructor(private http: HttpClient) {}

  // Function to send input data to Flask and receive prediction
  getPrediction(features: number[]): Observable<any> {
    return this.http.post(this.apiUrl, { features });
  }
}
