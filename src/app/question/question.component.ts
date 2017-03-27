import {Component, OnInit, ChangeDetectorRef, AfterViewInit} from '@angular/core';
import {CategoryService} from "../services/category.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {QuestionService} from "../services/question.service";
import {Observable} from "rxjs";
import {AuthService} from "../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit , AfterViewInit {

  /**
   * Edit Questions
   * */
  isEdit = false;
  editQuestion;
  editQuestionText;

  /** Edit end*/

  user: Observable<any>;
  isLoggedIn: Observable<boolean>

  questionForm: FormGroup;
  questionTitleCtrl: FormControl;
  questionCategoriesCtrl: FormControl;
  categoriesHiddenCtrl: FormControl;
  questionRawText = "";
  questionBody = "";

  catList = [];
  selectCatList = []

  title = 'Yeni Soru'

  constructor(private cs: CategoryService, private fb: FormBuilder,
              private qs: QuestionService, private auth: AuthService, private router: Router,
              private route: ActivatedRoute , private ref : ChangeDetectorRef) {
    this.questionTitleCtrl = fb.control('', [Validators.required, Validators.minLength(15)])
    this.questionCategoriesCtrl = fb.control('')
    this.categoriesHiddenCtrl = fb.control('', [Validators.required])


    this.questionForm = fb.group({
      title: this.questionTitleCtrl,
      categories: this.questionCategoriesCtrl,
      categoriesHidden: this.categoriesHiddenCtrl
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

    this.route.data.subscribe(data => {
      if (data.question) {
        console.log("data : ", data)
        this.editQuestion = data.question
        this.editModeOn()
      }


    })
  }
  ngAfterViewInit() {

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
    if (this.selectCatList.length == 1) {
      this.categoriesHiddenCtrl.setValue('')
    }
  }

  addQuestion() {
    let {title, question = this.questionBody, questionRawText = this.questionRawText} = this.questionForm.value;
    let categories = this.selectCatList.map(_c => _c._id)
    if(!this.isEdit){
      this.qs.addQuestions({title, question, questionRawText, categories})
        .subscribe(_res => {
          this.router.navigate([`/questions/${_res.message.slug}`])
        })
    }

    else{
      this.qs.updateQuestions({title, question, questionRawText, categories}, this.editQuestion._id)
        .subscribe(_res => {
          this.router.navigate([`/questions/${this.editQuestion.slug}`])
        })
    }
  }

  handleQuestionText($event) {
    console.log("Event : ", $event)
    this.questionBody = $event.content;
    this.questionRawText = $event.contentRaw
  }

  editModeOn() {
    this.isEdit = true;
    let title = this.editQuestion.title
    let questionText = this.editQuestion.question
    // console.log(questionText)
    let categories = this.editQuestion.categories;

    //set values
    this.selectCatList = categories;
    this.questionTitleCtrl.setValue(title)
    this.title = `Duzenleniyor : ${title}`
    this.editQuestionText = this.editQuestion.question
    this.categoriesHiddenCtrl.setValue(categories)

  }

}
