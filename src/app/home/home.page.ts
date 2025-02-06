import { Component, inject } from '@angular/core';
import { IonicModule } from '@ionic/angular';  
import { CommonModule } from '@angular/common';  
import { FormsModule } from '@angular/forms';  
import { MlApiService } from '../services/ml-api.service';  

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],  
  providers: [MlApiService]  
})
export class HomePage {
  // ✅ Feature names and their descriptions
  featuresList = [
    { name: "age", label: "Age", description: "Age of the patient (normalized)" },
    { name: "sex", label: "Sex", description: "Sex of the patient (normalized)(0: female, 1: male)" },
    { name: "bmi", label: "Body Mass Index", description: "BMI = weight in kg / height in m²" },
    { name: "bp", label: "Blood Pressure", description: "Average blood pressure (mm Hg)" },
    { name: "s1", label: "Total Serum Cholesterol", description: "Cholesterol level in blood" },
    { name: "s2", label: "Low-Density Lipoproteins (LDL)", description: "Bad cholesterol level" },
    { name: "s3", label: "High-Density Lipoproteins (HDL)", description: "Good cholesterol level" },
    { name: "s4", label: "TCH / HDL Ratio", description: "Total cholesterol to HDL ratio" },
    { name: "s5", label: "Serum Triglycerides", description: "Level of triglycerides in blood" },
    { name: "s6", label: "Blood Sugar Level", description: "Normalized glycated hemoglobin level" }
  ];

  // ✅ Initialize feature values with empty fields
  features: number[] = new Array(10).fill(0);
  prediction: any = null;
  isLoading = false;
  
  mlApi = inject(MlApiService);

  // ✅ Function to send user input to Flask API and get prediction
  predict() {
    this.isLoading = true;
    this.mlApi.getPrediction(this.features).subscribe(
      (response: any) => {
        this.prediction = response.prediction;
        this.isLoading = false;
      },
      (error: any) => {
        console.error('Error getting prediction:', error);
        this.isLoading = false;
      }
    );
  }
}
