import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';

@Component({
    selector: 'app-scripting-interaction',
    templateUrl: './scripting-interaction.component.html',
    styleUrls: ['./scripting-interaction.component.css'],
})
export class ScriptingInteractionComponent implements OnInit {
    interactionEventCode = ` // MyScript.cs
using UnityEngine;
using SideQuestSDK;
public class MyScript : MonoBehaviour {
  // Use this for initialization
  void Start () {
    var interactable = GetComponent<Interactable>();
    interactable.onSelectEnter.AddListener((interactor) => {
       // Do something when the object is picked up.
    });
    interactable.onSelectExit.AddListener((interactor) => {
       // Do something when the object is dropped.
    });
    interactable.onActivate.AddListener((interactor) => {
       // Do something when the object is clicked ( trigger pressed ).
    });
    interactable.onDeactivate.AddListener((interactor) => {
       // Do something when the object is unclicked ( trigger released ).
    });
    interactable.onHoverEnter.AddListener((interactor) => {
       // Do something when the object becomes selectable.
    });
    interactable.onHoverExit.AddListener((interactor) => {
       // Do something when the object is no longer selectable.
    });
  }
}`;
    constructor(public appService: AppService) {}

    ngOnInit() {}
}
