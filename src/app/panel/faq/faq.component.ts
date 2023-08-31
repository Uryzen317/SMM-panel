import { Component } from "@angular/core";

@Component({
  selector: "app-faq",
  templateUrl: "./faq.component.html",
})
export class FaqComponent {
  isOpenState: boolean[] = [false, false, false, false, false];
  questions: { question: string; answer: string; state: boolean }[] = [
    { question: "question one ?", answer: "answer one.", state: false },
    { question: "question two ?", answer: "answer two.", state: false },
    { question: "question three ?", answer: "answer three.", state: false },
    { question: "question four ?", answer: "answer four.", state: false },
    { question: "question five ?", answer: "answer five.", state: false },
    {
      question: "question five ?",
      answer:
        "answer five. answer five.answer five.answer five.answer five.answer five.answer five.answer five.answer five.answer five.answer five.answer five.answer five.answer five.answer five.answer five.answer five.answer five.answer five.answer five.answer five.answer five.answer five.answer five.",
      state: false,
    },
  ];
}
