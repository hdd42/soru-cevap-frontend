import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {CategoryService} from "../services/category.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {QuestionService} from "../services/question.service";
import {Observable} from "rxjs";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  user : Observable<any>;
  isLoggedIn :Observable<boolean>

  questionForm: FormGroup;
  questionTitleCtrl: FormControl;
  questionCategoriesCtrl: FormControl;
  categoriesHiddenCtrl: FormControl;
  questionRawText = "";
  questionBody = "";

  catList = [];
  selectCatList = []

  constructor(private cs: CategoryService, private fb: FormBuilder , private qs:QuestionService , private auth : AuthService, private router:Router) {
    this.questionTitleCtrl = fb.control('', [Validators.required, Validators.minLength(15)])
    this.questionCategoriesCtrl = fb.control('')
    this.categoriesHiddenCtrl = fb.control('', [Validators.required])


    this.questionForm = fb.group({
      title: this.questionTitleCtrl,
      categories: this.questionCategoriesCtrl,
      categoriesHidden:this.categoriesHiddenCtrl
  })

  }
  ngOnInit() {
    this.isLoggedIn = this.auth.isLoggedIn();
    this.user = this.auth.getUser();

    this.questionCategoriesCtrl.valueChanges
      .debounceTime(250)
      .map(_val => {
        if (_val) {
          return _val
        }
        this.catList = [];
        return ""
      })
      .distinctUntilChanged()
      .filter(_val => _val != false)
      .map(_val => _val.trim())
      .flatMap(_val => this.cs.searchCategories(_val))
      .subscribe(_val => this.catList = _val.categories)
  }


  addCatgeory(cat) {
    console.log("cat : ", cat)
    let index = this.selectCatList.findIndex((item) => item.name.toLowerCase() == cat.name.toLowerCase())
    console.log("index ", index)
    if (index != -1) return

      this.selectCatList.push(cat)
      this.catList = [];
      this.categoriesHiddenCtrl.setValue(cat.name)
      this.questionCategoriesCtrl.setValue("")
  }


  removeCatgeory(cat) {
    this.selectCatList = this.selectCatList
      .filter(_c => _c.name != cat.name)
    if(this.selectCatList.length == 1){
      this.categoriesHiddenCtrl.setValue('')
    }
  }

  addQuestion() {
    let {title, question = this.questionBody, questionRawText = this.questionRawText} = this.questionForm.value;
    let categories = this.selectCatList.map(_c => _c._id)
    this.qs.addQuestions({title,question,questionRawText, categories})
      .subscribe(_res => {
        this.router.navigate([`/questions/${_res.message.slug}`])
      })

  }

   handleQuestionText($event) {
     this.questionBody =  $event.content;
     this.questionRawText = $event.contentRaw
  }
}
